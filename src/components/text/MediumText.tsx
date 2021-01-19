import React from 'react';
import styled from 'styled-components/native';
import { TFunctionResult } from 'i18next';

import Typography from '../../theme/Typography';

const Text = styled.Text`
  font-size: ${Typography.MEDIUM.FONT_SIZE};
  color: ${Typography.MEDIUM.COLOR};
`;

type Props = {
  text: string | number | TFunctionResult,
  style?: Object,
};

const MediumText = ({ text, style }: Props) => (
  <Text style={style}>{text}</Text>
);

MediumText.defaultProps = {
  style: {},
};

export default MediumText;
