import styled from 'styled-components/native';
import { Input } from 'shared/ui';
import { Platform } from 'react-native';
import { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';

export const Container = styled.View`
  padding: 0;
`;

export const HeaderContainer = styled.View`
  padding-bottom: 10px;
`;

export const TextContainer = styled.TouchableOpacity`
  position: absolute;
  top: ${Platform.OS === 'android' ? '35%' : '30%'};
  right: 12px;
  border-left-width: 1px;
  padding-left: 8px;
  border-left-color: gray;
`;

export const Wrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;
`;

export const Circle = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background: whitesmoke;
`;

export const AddressesContainer = styled(BottomSheetScrollView)``;

export const SelectAddress = styled(Input)``;

export const IconSearch = styled.Image.attrs({
  resizeMode: 'contain',
})`
  position: absolute;
  left: 12px;
  top: ${Platform.OS === 'android' ? '40%' : '18px'};
  z-index: 1;
  width: 16px;
  height: 16px;
`;

export const IconInput = styled.Image.attrs({
  resizeMode: 'contain',
})`
  position: absolute;
  top: ${Platform.OS === 'android' ? '28%' : '22%'};
  left: 8px;
  z-index: 1;
`;

export const IconWrapper = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  right: 12px;
  z-index: 1;
`;
export const CleanIconWrapper = styled.TouchableOpacity`
  position: absolute;
  right: ${Platform.OS === 'android' ? '80px' : '66px'};
  top: ${Platform.OS === 'android' ? '35%' : '28%'};
  z-index: 1;
`;
