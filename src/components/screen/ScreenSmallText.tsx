import React from 'react';
import styled from 'styled-components/native';

import Colors from '../../theme/Colors';

const Text = styled.Text`
  font-size: 13px;
  color: ${Colors.SECONDARY.DARK_GRAY};
`;

type Props = {
  text: string,
  style?: Object,
};

const ScreenSmallText = ({ text, style }: Props) => (
  <Text style={style}>{text}</Text>
);

ScreenSmallText.defaultProps = {
  style: {},
};

export default ScreenSmallText;
