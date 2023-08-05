import styled, { css } from 'styled-components/native';
import { ifProp } from 'styled-tools';

type ZordValue = number | number[];

type ZordProps = {
  marginZord?: ZordValue;
  paddingZord?: ZordValue;
};

const getSizeValue = (size: number | string) =>
  typeof size === 'number' ? `${size}px` : size;

const getZordCssValue = (size: ZordValue = 0) =>
  Array.isArray(size) ? size.map(getSizeValue).join(' ') : getSizeValue(size);

export const Zord = styled.View<ZordProps>`
  ${ifProp(
    'marginZord',
    css`
      margin: ${({ marginZord }: ZordProps) => getZordCssValue(marginZord)};
    `,
  )}

  ${ifProp(
    'paddingZord',
    css`
      margin: ${({ paddingZord }: ZordProps) => getZordCssValue(paddingZord)};
    `,
  )}
`;
