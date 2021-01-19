import React from 'react';
import styled from 'styled-components/native';
import { TFunctionResult } from 'i18next';

import Typography from '../../theme/Typography';

const Text = styled.Text`
  font-size: ${Typography.LARGE.FONT_SIZE};
  color: ${Typography.LARGE.COLOR};
  font-weight: ${Typography.LARGE.FONT_WEIGHT};
`;

type Props = {
  text: string | number | TFunctionResult,
  style?: Object,
};

const LargeText = ({ text, style }: Props) => <Text style={style}>{text}</Text>;

LargeText.defaultProps = {
  style: {},
};

export default LargeText;
