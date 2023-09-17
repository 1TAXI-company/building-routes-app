import React, { FC, useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import { Suggest } from 'react-native-yamap';
import { useDebounce } from './use-debounce';
import { Zord } from 'shared/lib/zord';
import { Address } from 'features/home/lib/modals/make-order-modal/organisms';

export const useSearchSuggest = (
  query: string,
  onAddressSelected: (
    address: any,
    additionalType?: 'where' | 'add_stop',
    positionInRoute?: number,
  ) => void,
  isWithoutNewAddresses?: boolean,
  additionalType?: 'where' | 'from',
  positionInRoute?: number,
) => {
  const [suggests, setSuggests] = useState<any[]>([]);

  const debouncedQuery = useDebounce(query, 1000);

  const onSearchSuggests = async () => {
    try {
      const suggestions = await Suggest.suggestWithCoords(debouncedQuery, {
        userPosition: { lat: 45.039268, lon: 38.987221 },
      });

      setSuggests(suggestions);

      Suggest.reset();
    } catch (e) {}
  };

  useEffect(() => {
    onSearchSuggests();
  }, [debouncedQuery]);

  const Addresses: FC = () => {
    return suggests.map(suggest => (
      <Zord marginZord={[4, 0, 4]} key={uuid.v4()}>
        <Address
          onPress={address =>
            onAddressSelected(address, additionalType, positionInRoute)
          }
          address={suggest}
          searchQuery={query.trim()}
          type={suggest.type}
        />
      </Zord>
    ));
  };

  return { Addresses };
};
