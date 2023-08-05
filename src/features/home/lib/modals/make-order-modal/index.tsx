import React, { useEffect, useRef, useState } from 'react';
import { Platform, View } from 'react-native';
import { Zord } from 'shared/lib/zord';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchSuggest } from 'shared/lib/hooks';
import { loadSelectedAddress, showBottomSheet } from 'features/common';
import {
  AddressesContainer,
  Container,
  HeaderContainer,
  SelectAddress,
} from './styled';
import { BottomSheetContainer } from '../../../../../shared/lib/bottom-sheet-system';
import { RootState } from '../../../../../shared/types/store';

export const MakeOrder: React.FC = () => {
  const dispatch = useDispatch();

  const { where, from } = useSelector((state: RootState) => state.common);

  const [sourceText, setSourceText] = useState(from?.title || '');

  const [targetText, setTargetText] = useState(where?.title || '');

  const [, setTargetFocus] = useState(false);

  const [isSourceFocused, setSourceFocused] = useState(true);

  const handleTargetFocus = () => {
    setSourceFocused(false);

    setTargetFocus(true);
  };

  const handleSourceFocused = () => {
    setSourceFocused(true);

    setSourceText('');
  };

  const handlePress = async (address: any, type) => {
    dispatch(
      loadSelectedAddress({
        type: isSourceFocused ? 'from' : 'where',
        address,
      }),
    );
    // dispatch(
    //   showBottomSheet({
    //     component: OrderForm,
    //     props: { isBackdropHidden: true, hasBackArrow: true },
    //     options: { enablePanDownToClose: false },
    //   }),
    // );
  };

  const { Addresses } = useSearchSuggest(
    isSourceFocused ? sourceText : targetText,
    handlePress,
  );

  useEffect(() => {
    setSourceText(from.title);
  }, [from]);

  useEffect(() => {
    setTargetText(where.title);
  }, [where]);

  return (
    <BottomSheetContainer>
      <HeaderContainer>
        <SelectAddress
          placeholder="Откуда"
          value={sourceText}
          autoFocus={isSourceFocused}
          onFocus={handleSourceFocused}
          onChangeText={setSourceText}
        />
        <Zord marginZord={[12, 0, 0]}>
          <SelectAddress
            placeholder="Куда"
            autoFocus={!isSourceFocused}
            value={targetText}
            onFocus={handleTargetFocus}
            onChangeText={setTargetText}
          />
        </Zord>
      </HeaderContainer>
      <AddressesContainer
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag">
        <Addresses />
      </AddressesContainer>
    </BottomSheetContainer>
  );
};
