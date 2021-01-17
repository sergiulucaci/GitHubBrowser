type ColorsType = {
  PRIMARY: {
    BLUE: string,
    DARK_BLUE: string,
    ERROR: string,
    GREEN: string,
    PINK: string,
  },
  SECONDARY: {
    GRAY: string,
    DARK_GRAY: string,
    LIGHT_GRAY: string,
    TRANSPARENT: string,
  },
  BACKGROUND: {
    WHITE: string,
    BLACK: string,
    LIGHT_BLACK: string,
    SUNSET_YELLOW: string,
  },
};

const Colors: ColorsType = Object.freeze({
  PRIMARY: {
    BLUE: '#2699FB',
    DARK_BLUE: '#2E449D',
    ERROR: '#E9458E',
    GREEN: '#56d364',
    PINK: '#EF4B84',
  },
  SECONDARY: {
    LIGHT_GRAY: '#eeeeef',
    GRAY: '#919191',
    DARK_GRAY: '#1d1d1f',
    TRANSPARENT: 'rgba(0, 0, 0, 0)',
  },
  BACKGROUND: {
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    LIGHT_BLACK: '#222222',
    SUNSET_YELLOW: '#FCE093',
  },
});

export default Colors;
