import React from 'react';
import styled from 'styled-components/native';

import Colors from '../../theme/Colors';

const Text = styled.Text`
  font-size: 17px;
  font-weight: 600;
  color: ${Colors.SECONDARY.DARK_GRAY};
`;

type Props = {
  text: string,
  style?: Object,
};

const ScreenSubtitle = ({ text, style }: Props) => (
  <Text style={style}>{text}</Text>
);

ScreenSubtitle.defaultProps = {
  style: {},
};

export default ScreenSubtitle;
