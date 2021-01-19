import Colors from './Colors';

type TypographyPropsType = {
  FONT_SIZE: string;
  COLOR: string;
  FONT_WEIGHT?: number;
};

type TypographyType = {
  X_LARGE: TypographyPropsType;
  LARGE: TypographyPropsType;
  MEDIUM: TypographyPropsType;
  SMALL: TypographyPropsType;
  X_SMALL: TypographyPropsType;
};

const Typography: TypographyType = Object.freeze({
  X_LARGE: {
    FONT_SIZE: '28PX',
    COLOR: Colors.SECONDARY.DARK_GRAY,
    FONT_WEIGHT: 600,
  },
  LARGE: {
    FONT_SIZE: '17PX',
    COLOR: Colors.SECONDARY.DARK_GRAY,
    FONT_WEIGHT: 500,
  },
  MEDIUM: {
    FONT_SIZE: '15PX',
    COLOR: Colors.SECONDARY.DARK_GRAY,
  },
  SMALL: {
    FONT_SIZE: '13PX',
    COLOR: Colors.SECONDARY.DARK_GRAY,
  },
  X_SMALL: {
    FONT_SIZE: '11PX',
    COLOR: Colors.SECONDARY.DARK_GRAY,
  },
});

export default Typography;
