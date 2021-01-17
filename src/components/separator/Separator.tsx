import React from 'react';
import styled from 'styled-components/native';

import Colors from '../../theme/Colors';

type SeparatorProps = {
  withMarginVertical?: boolean;
};

const SeparatorComponent = styled.View<SeparatorProps>`
  border-bottom-width: 0.5px;
  border-color: ${Colors.SECONDARY.LIGHT_GRAY};
  margin-vertical: ${(props) => (props.withMarginVertical ? 12 : 0)}px;
`;

const Separator = ({ withMarginVertical }: SeparatorProps) => (
  <SeparatorComponent withMarginVertical={withMarginVertical} />
);

Separator.defaultProps = {
  withMarginVertical: false,
};

export default Separator;
