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
  style?: Object;
};

const ScreenContainer = ({ children, style }: Props) => (
  <Base style={style} edges={['right', 'top', 'left']}>{children}</Base>
);

ScreenContainer.defaultProps = {
  style: {},
};

export default ScreenContainer;
