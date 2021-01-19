import React from 'react';
import styled from 'styled-components/native';
import { TFunctionResult } from 'i18next';

import Typography from '../../theme/Typography';

const Text = styled.Text`
  font-size: ${Typography.SMALL.FONT_SIZE};
  color: ${Typography.SMALL.COLOR};
`;

type Props = {
  text: string | number | TFunctionResult,
  style?: Object,
};

const SmallText = ({ text, style }: Props) => (
  <Text style={style}>{text}</Text>
);

SmallText.defaultProps = {
  style: {},
};

export default SmallText;
