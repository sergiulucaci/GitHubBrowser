import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { ScreenMediumText } from '../../components';
import Colors from '../../theme/Colors';

const RadioSection = styled.View`
  background-color: ${Colors.BACKGROUND.WHITE};
  border-top-width: 0.5px;
  border-bottom-width: 0.5px;
  border-color: ${Colors.SECONDARY.LIGHT_GRAY};
  margin-top: 4px;
`;

const RadioItem = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;

const IconWrapper = styled.View`
  width: 50px;
  align-items: center;
  justify-content: center;
`;

const RadioItemTextWrapper = styled.View`
  flex: 1;
  border-bottom-width: 0.5px;
  padding-vertical: 8px;
  border-color: ${Colors.SECONDARY.LIGHT_GRAY};
`;

const RadioItemText = styled(ScreenMediumText)``;

type RadioItemProps = {
  key: string;
  title: string;
};

type RadioListProps = {
  activeKey: string;
  onItemPress: Function;
  items: Array<RadioItemProps>;
};

const RadioList = ({ activeKey, items, onItemPress }: RadioListProps) => (
  <RadioSection>
    {items.map((item: RadioItemProps) => (
      <RadioItem onPress={() => onItemPress(item.key)} key={item.key}>
        <IconWrapper>
          {item.key === activeKey && (
            <Icon
              name="checkmark-sharp"
              size={18}
              color={Colors.PRIMARY.BLUE}
            />
          )}
        </IconWrapper>
        <RadioItemTextWrapper>
          <RadioItemText text={item.title} />
        </RadioItemTextWrapper>
      </RadioItem>
    ))}
  </RadioSection>
);

export default RadioList;
