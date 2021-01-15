import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { isIos } from '../../utils/DeviceInfo';

const Base = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${isIos ? 0 : 56}px;
`;

type Props = {
  children: any;
};

const ScreenContainer = ({ children }: Props) => (
  <Base edges={['right', 'top', 'left']}>{children}</Base>
);

export default ScreenContainer;
