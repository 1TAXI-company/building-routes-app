import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-native-uuid';
import { showBottomSheet } from '../../common';
import { MakeOrder } from '../lib/modals';
import { BottomSheetSystem } from 'shared/lib/bottom-sheet-system';
import { Marker, Polyline, YaMap } from 'react-native-yamap';
import styled from 'styled-components/native';

export const HomePage = () => {
  const dispatch = useDispatch();

  const mapRef = useRef<YaMap>();

  const [maneuvers, setManeuvers] = useState<any[]>([]);
  const [lastPoint, setLastPoint] = useState(null);

  const { where, from } = useSelector(state => state.common);

  const handleFindRoutes = routes => {
    const temp = routes.routes[0];
    if (!temp || !temp.jams) {
      return;
    }
    const tempJams = temp.jams;
    const flatPoints = temp.sections
      .map(section => {
        if (section.beginPointIndex) {
          tempJams.splice(
            section.beginPointIndex,
            0,
            tempJams[section.beginPointIndex],
          );
        }
        return section.points;
      })
      .flat();
    setLastPoint(flatPoints[flatPoints.length - 1]);
    let tempJamType = tempJams[0];
    let newSection = [];
    let result = [];
    tempJams.map((jamType, index) => {
      if (!index) {
        newSection.push(flatPoints[0]);
        newSection.push(flatPoints[1]);
      }
      if (jamType === tempJamType && index !== tempJams.length - 1) {
        newSection.push(flatPoints[index + 1]);
      } else {
        result = [
          ...result,
          {
            section:
              newSection.length === 0
                ? [flatPoints[index + 1], flatPoints[index + 2]]
                : [
                    ...newSection,
                    flatPoints[index + 2] || flatPoints[index + 1],
                  ],
            jamType: tempJamType,
          },
        ];
        tempJamType = jamType;
        newSection = [];
      }
    });
    setManeuvers(result);
  };

  const TRAFFIC_COLORS = {
    UNKNOWN: '#999999',
    FREE: '#5ece4c',
    LIGHT: '#ffbd3c',
    HARD: '#e65a46',
    VERY_HARD: '#8f351e',
    BLOCKED: '#3f3734',
  };

  const TRAFFIC_STYLES = {
    outlineWidth: 0,
    strokeWidth: 3.5,
  };

  const renderManeuvers = useMemo(() => {
    if (!maneuvers.length) {
      return;
    }

    return maneuvers.map(route => (
      <Polyline
        key={uuid.v4()}
        points={route.section}
        strokeColor={TRAFFIC_COLORS[route.jamType]}
        {...TRAFFIC_STYLES}
      />
    ));
  }, [maneuvers]);

  const renderStartDashline = () => {
    if (!where || !lastPoint) {
      return;
    }

    return (
      <Polyline
        points={[
          {
            lat: where.lat,
            lon: where.lon,
          },
          {
            lat: lastPoint.lat,
            lon: lastPoint.lon,
          },
        ]}
        strokeColor={TRAFFIC_COLORS.BLOCKED}
        dashLength={10}
        gapLength={5}
        {...TRAFFIC_STYLES}
      />
    );
  };

  const renderDashLine = () => {
    if (!Array.isArray(maneuvers) || maneuvers.length === 0) {
      return;
    }

    return (
      <>
        <Polyline
          points={[
            {
              lat: from.lat,
              lon: from.lon,
            },
            {
              lat: maneuvers[0].section[0].lat,
              lon: maneuvers[0].section[0].lon,
            },
          ]}
          strokeColor={TRAFFIC_COLORS.BLOCKED}
          dashLength={10}
          gapLength={5}
          {...TRAFFIC_STYLES}
        />
      </>
    );
  };

  useEffect(() => {
    setLastPoint(null);
    if (!mapRef.current || (!from.title.length && !where.title.length)) {
      return;
    }
    mapRef.current.findRoutes(
      [
        { lon: from.lon, lat: from.lat },
        {
          lon: where.lon,
          lat: where.lat,
        },
      ],
      ['car'],
      true,
      handleFindRoutes,
    );
  }, [from, where]);

  useEffect(() => {
    dispatch(
      showBottomSheet({
        component: MakeOrder,
        options: {
          enablePanDownToClose: false,
        },
        props: {
          isBackdropHidden: true,
        },
      }),
    );
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    if (maneuvers.length) {
      mapRef.current.fitAllMarkers();
    }
  }, [maneuvers]);

  return (
    <View style={{ flex: 1 }}>
      <YaMapView
        ref={mapRef}
        userLocationIcon={require('../static/user-point.png')}
        userLocationIconScale={1}
        initialRegion={{
          lat: 45.039268,
          lon: 38.987221,
          zoom: 17,
          azimuth: 0,
          tilt: 0,
        }}
        userLocationAccuracyFillColor="#FF511A15"
        tiltGesturesEnabled={false}
        rotateGesturesEnabled={false}
        mapStyle={JSON.stringify([
          {
            tags: {
              any: ['road'],
            },
            types: ['polyline'],
            stylers: {
              saturation: -1,
              lightness: 0.5,
            },
          },
        ])}>
        <Marker
          zIndex={100}
          anchor={{
            x: 0.5,
            y: 1.27,
          }}
          visible
          scale={1}
          point={{ lat: from?.lat ?? 45.039268, lon: from?.lon ?? 38.987221 }}
          source={require('../static/feed-point.png')}
        />
        <Marker
          anchor={{
            x: 0.5,
            y: 0.5,
          }}
          scale={1}
          visible={!!(where?.lon && where?.lat)}
          point={{
            lat: where?.lat || 0,
            lon: where?.lon || 0,
          }}
          source={require('../static/destination-point.png')}
        />
        {renderDashLine()}
        {renderStartDashline()}
        {renderManeuvers}
      </YaMapView>
      <BottomSheetSystem />
    </View>
  );
};

const YaMapView = styled(YaMap)`
  flex: 1;
`;
