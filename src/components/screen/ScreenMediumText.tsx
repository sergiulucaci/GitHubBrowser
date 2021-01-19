import React from 'react';
import styled from 'styled-components/native';

import Colors from '../../theme/Colors';

const Text = styled.Text`
  font-size: 15px;
  color: ${Colors.SECONDARY.DARK_GRAY};
`;

type Props = {
  text: string | number,
  style?: Object,
};

const ScreenMediumText = ({ text, style }: Props) => (
  <Text style={style}>{text}</Text>
);

ScreenMediumText.defaultProps = {
  style: {},
};

export default ScreenMediumText;
