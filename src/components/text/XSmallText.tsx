import React from 'react';
import styled from 'styled-components/native';
import { TFunctionResult } from 'i18next';

import Typography from '../../theme/Typography';

const Text = styled.Text`
  font-size: ${Typography.X_SMALL.FONT_SIZE};
  color: ${Typography.X_SMALL.COLOR};
`;

type Props = {
  text: string | number | TFunctionResult;
  style?: Object;
};

const XSmallText = ({ text, style }: Props) => (
  <Text style={style}>{text}</Text>
);

XSmallText.defaultProps = {
  style: {},
};

export default XSmallText;
