import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { Easing } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet, {
  useBottomSheetDynamicSnapPoints,
  BottomSheetProps,
  BottomSheetView,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { hideBottomSheet } from 'features/common';
import { initialStack } from './constants';
import { DefaultModalBackdrop } from './styled';
import { RootState } from '../../types/store';
import { IBottomSheet } from '../../types/common';

const DELAY_BOTTOM_SHEET = 300;

export const BottomSheetSystem: FC = () => {
  const dispatch = useDispatch();

  const bottomSheet = useSelector<RootState, IBottomSheet>(
    state => state.common.bottomSheet,
  );

  const bottomSheetRef = useRef<BottomSheet | null>(null);

  const { stack, isVisible, currentStackId } = bottomSheet;

  const {
    component: Component,
    props,
    options,
  } = stack[currentStackId] || initialStack;

  const { isBackdropHidden } = props;

  const [isClosed, setClosed] = useState(false);

  const onClose = (closeType = 'static') => {
    if (!bottomSheetRef.current || !stack.length || isClosed) {
      return;
    }

    Keyboard.dismiss();

    bottomSheetRef.current.close();

    setClosed(true);

    setTimeout(() => {
      dispatch(hideBottomSheet(closeType));

      if (stack.length - 1 === 0) {
        return;
      }

      handlePresent();
    }, DELAY_BOTTOM_SHEET);
  };

  const handlePresent = () => {
    if (!bottomSheetRef.current) {
      return;
    }

    bottomSheetRef.current?.snapToIndex(0);
  };

  const handleBackPress = () => {
    if (options.enablePanDownToClose === false) {
      return true;
    }

    if (stack.length) {
      onClose();

      return true;
    }

    return false;
  };

  const renderBackdropComponent = useCallback(
    (backdropProps: BottomSheetBackdropProps) => {
      if (isBackdropHidden || !isVisible) {
        return null;
      }

      return (
        <DefaultModalBackdrop {...backdropProps} enableTouchThrough={false} />
      );
    },
    [isBackdropHidden, isVisible],
  );

  useEffect(() => {
    setTimeout(() => {
      handlePresent();
    }, 250);
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [stack, options]);

  return (
    <Container
      ref={bottomSheetRef}
      backdropComponent={renderBackdropComponent}
      snapPoints={['20%', '80%']}
      contentHeight={1}
      onClose={onClose}
      {...options}>
      <Wrapper>
        {Component ? <Component onClose={onClose} {...props} /> : null}
      </Wrapper>
    </Container>
  );
};

const Wrapper = styled(BottomSheetView)`
  flex: 1;
`;

const Container = styled(BottomSheet).attrs<BottomSheetProps>(props => ({
  enablePanDownToClose: true,
  enableOverDrag: false,
  keyboardBlurBehavior: 'restore',
  index: -1,
  animationConfigs: { easing: Easing.linear },
  detached: true,
  handleIndicatorStyle: { backgroundColor: 'rgba(255, 255, 255, 0.8)' },
  backgroundStyle: {
    backgroundColor: 'transparent',
  },
  backgroundComponent: null,
  ...props,
}))``;
