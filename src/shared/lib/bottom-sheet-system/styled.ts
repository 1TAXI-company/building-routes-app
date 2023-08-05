import styled from 'styled-components/native';
import {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

export const BottomSheetContainer = styled(BottomSheetView)`
  padding: 25px 12px;
  background: white;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  flex: 1;
`;

export const BottomSheetScrollContainer = styled(BottomSheetScrollView).attrs({
  keyboardShouldPersistTaps: 'always',
  keyboardDismissMode: 'on-drag',
  bounces: false,
  showsVerticalScrollIndicator: false,
})``;

export const DefaultModalBackdrop = styled(BottomSheetBackdrop).attrs({
  disappearsOnIndex: -1,
  appearsOnIndex: 0,
  enableTouchThrough: false,
  pressBehavior: 'close',
})`
  background-color: rgba(26, 26, 24, 0.4);
`;
