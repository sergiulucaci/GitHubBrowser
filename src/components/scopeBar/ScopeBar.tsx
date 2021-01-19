import React from 'react';
import styled from 'styled-components/native';

import Colors from '../../theme/Colors';
import { SmallText } from '../index';

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  height: 32px;
  background-color: ${Colors.SECONDARY.LIGHT_GRAY};
  border-radius: 10px;
  padding: 2px;
  margin-top: 8px;
`;

type ButtonProps = {
  active: boolean;
};

const Button = styled.TouchableOpacity<ButtonProps>`
  background-color: ${Colors.BACKGROUND.WHITE};
  border-radius: 8px;
  flex: 0.5;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${({ active }) => (active ? Colors.BACKGROUND.WHITE : Colors.SECONDARY.LIGHT_GRAY)};
`;

const Text = styled(SmallText)`
  font-weight: 500;
`;

type Props = {
  firstText: string,
  onFirstClick: Function,
  secondText: string,
  onSecondClick: Function,
  firstIsActive: boolean,
};

const ScopeBar = ({
  firstText,
  onFirstClick,
  secondText,
  onSecondClick,
  firstIsActive,
}: Props) => {
  const handleOnFirstButtonPress = () => {
    if (!firstIsActive) {
      onFirstClick();
    }
  };

  const handleOnSecondButtonPress = () => {
    if (firstIsActive) {
      onSecondClick();
    }
  };

  return (
    <Wrapper>
      <Button
        activeOpacity={1}
        active={firstIsActive}
        onPress={handleOnFirstButtonPress}
      >
        <Text text={firstText} />
      </Button>
      <Button
        activeOpacity={1}
        active={!firstIsActive}
        onPress={handleOnSecondButtonPress}
      >
        <Text text={secondText} />
      </Button>
    </Wrapper>
  );
};

export default ScopeBar;
