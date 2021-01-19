type ColorsType = {
  PRIMARY: {
    BLUE: string,
    RED: string,
    GREEN: string,
  },
  SECONDARY: {
    GRAY: string,
    DARK_GRAY: string,
    LIGHT_GRAY: string,
    LIGHT_GREEN: string,
    LIGHT_RED: string,
  },
  BACKGROUND: {
    WHITE: string,
    LIGHT_GRAY: string,
  },
};

const Colors: ColorsType = Object.freeze({
  PRIMARY: {
    BLUE: '#2997ff',
    RED: '#E9458E',
    GREEN: '#56d364',
  },
  SECONDARY: {
    GRAY: '#919191',
    DARK_GRAY: '#1d1d1f',
    LIGHT_GRAY: '#eeeeef',
    LIGHT_GREEN: '#e2fce4',
    LIGHT_RED: '#faa4cd',
  },
  BACKGROUND: {
    WHITE: '#FFFFFF',
    LIGHT_GRAY: '#f3f3f3',
  },
});

export default Colors;
