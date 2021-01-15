import React from 'react';
import styled from 'styled-components/native';

import Colors from '../../theme/Colors';

const Text = styled.Text`
  font-size: 34px;
  font-weight: bold;
  color: ${Colors.SECONDARY.DARK_GRAY};
`;

type Props = {
  text: string,
};

const ScreenContainer = ({ text }: Props) => (
  <Text>{text}</Text>
);

export default ScreenContainer;
