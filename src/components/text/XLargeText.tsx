import React from 'react';
import styled from 'styled-components/native';
import { TFunctionResult } from 'i18next';

import Typography from '../../theme/Typography';

const Text = styled.Text`
  font-size: ${Typography.X_LARGE.FONT_SIZE};
  font-weight: ${Typography.X_LARGE.FONT_WEIGHT};
  color: ${Typography.X_LARGE.COLOR};
`;

type Props = {
  text: string | number | TFunctionResult;
  style?: Object;
};

const XLargeText = ({ text, style }: Props) => (
  <Text style={style}>{text}</Text>
);

XLargeText.defaultProps = {
  style: {},
};

export default XLargeText;
