import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInputProps,
  TextInputFocusEventData,
  Platform,
} from 'react-native';
import styled, { css } from 'styled-components/native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

export const inputStyle = css`
  background: white;
  padding: 12px 8px;
  border-radius: 8px;
  border-width: 1px;
  border-color: rebeccapurple;
  color: black;
`;

export const Input: React.FC<Omit<TextInputProps, 'children'>> = ({
  ...props
}) => {
  const [isFocused, setFocused] = useState(false);

  const onFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(true);

    if (props.onFocus) {
      props.onFocus(event);
    }
  };

  const onBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(false);

    if (props.onBlur) {
      props.onBlur(event);
    }
  };

  return (
    <TextInput
      {...props}
      isFocused={isFocused}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

const TextInput = styled.TextInput.attrs({})`
  ${inputStyle};
`;
