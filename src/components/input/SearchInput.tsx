import React, { useRef } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../theme/Colors';

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  height: 32px;
  background-color: ${Colors.SECONDARY.LIGHT_GRAY};
  border-radius: 10px;
  padding-horizontal: 8px;
  margin-top: 6px;
`;

const Input = styled.TextInput`
  padding-horizontal: 4px;
  padding-top: 0;
  padding-bottom: 0;
  height: 32px;
  font-size: 17px;
  flex: 1;
`;

const IconWrapper = styled(Icon)``;

type Props = {
  onChangeText: Function;
  value: string;
  placeholder?: string;
};

const SearchInput = ({ onChangeText, value, placeholder }: Props) => {
  const inputRef: any = useRef({});

  const onSearchIconPress = () => {
    inputRef.current.focus();
  };

  const onClearPress = () => {
    onChangeText('');
    inputRef.current.blur();
  };

  return (
    <Wrapper>
      <IconWrapper
        onPress={onSearchIconPress}
        name="search-outline"
        size={18}
        color={Colors.SECONDARY.GRAY}
      />
      <Input
        ref={inputRef}
        placeholder={placeholder}
        placeholderTextColor={Colors.SECONDARY.GRAY}
        onChangeText={(text) => onChangeText(text)}
        value={value}
      />
      {!!value && (
        <IconWrapper
          onPress={onClearPress}
          name="close-circle"
          size={18}
          color={Colors.SECONDARY.GRAY}
        />
      )}
    </Wrapper>
  );
};

SearchInput.defaultProps = {
  placeholder: 'Search',
};

export default SearchInput;
