import React from 'react';
import styled from 'styled-components/native';

const Base = styled.SafeAreaView`
  margin: 16px;
`;

type Props = {
  children: any,
};

const ScreenContainer = ({ children }: Props) => (
  <Base>
    {children}
  </Base>
);

export default ScreenContainer;
