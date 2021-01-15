import React, { useState } from 'react';
import styled from 'styled-components/native';

import Colors from '../../theme/Colors';

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
  background-color: ${({ active }) =>
    active ? Colors.BACKGROUND.WHITE : Colors.SECONDARY.LIGHT_GRAY};
`;

const Text = styled.Text`
  font-size: 13px;
`;

type Props = {
  firstText: string;
  onFirstClick: Function;
  secondText: string;
  onSecondClick: Function;
};

const ScopeBar = ({
  firstText,
  onFirstClick,
  secondText,
  onSecondClick,
}: Props) => {
  const [firstIsActive, setFirstIsActive] = useState(true);

  const handleOnFirstButtonPress = () => {
    if (!firstIsActive) {
      setFirstIsActive(true);
      onFirstClick();
    }
  };

  const handleOnSecondButtonPress = () => {
    if (firstIsActive) {
      setFirstIsActive(false);
      onSecondClick();
    }
  };

  return (
    <Wrapper>
      <Button
        activeOpacity={1}
        active={firstIsActive}
        onPress={handleOnFirstButtonPress}>
        <Text>{firstText}</Text>
      </Button>
      <Button
        activeOpacity={1}
        active={!firstIsActive}
        onPress={handleOnSecondButtonPress}>
        <Text>{secondText}</Text>
      </Button>
    </Wrapper>
  );
};

export default ScopeBar;
