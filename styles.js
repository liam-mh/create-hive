import { StyleSheet } from 'react-native';

export const UNIT = 16;

export const COLOURS = {
  primary: '#00626B', 
  secondary: '#83C5BE',
  offwhite: '#DDE8ED',  
  darkgrey: '#505050', 
  background: '#f0f0f0',        
  white: '#FFFFFF',
  black: '#000000',
  offblack: '#001C1F'
};

const FONTS = {
    regular: 'Rubik_400Regular',  
    bold: 'Rubik_700Bold',      
};
  
export const SIZES = {
    xs: UNIT / 2,
    s: UNIT * 0.75,
    m: UNIT,
    l: UNIT * 1.5,
    xl: UNIT * 2
};

const SPACING = {
    reduced: -2
};

export const SHADOWS = {
  containerShadow: {
    shadowColor: COLOURS.offblack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
};

export const DIVS = {
  offwhite: {
    height: 1,
    backgroundColor: COLOURS.offwhite,
  },
  primary: {
    height: 1,
    backgroundColor: COLOURS.primary,
  },
}

export const CORNERS = {
  default: 5
}

export const TEXT = StyleSheet.create({
    small: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.s,
        color: COLOURS.black,
    },
    smallGrey: {
      fontFamily: FONTS.regular,
      fontSize: SIZES.s,
      color: COLOURS.primary,
    },
    smallPrimary: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.s,
        color: COLOURS.primary,
    },
    regular: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.m,
        color: COLOURS.black,
    },
    regularWhite: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.m,
        color: COLOURS.white,
    },
    regularGrey: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.m,
        color: COLOURS.darkgrey,
    },
    regularPrimary: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.m,
        color: COLOURS.primary,
    },
    bold: {
        fontFamily: FONTS.bold,
        fontSize: SIZES.m,
        color: COLOURS.black,
    },
    boldPrimary: {
        fontFamily: FONTS.bold,
        fontSize: SIZES.m,
        color: COLOURS.primary,
    },
    h1: {
        fontFamily: FONTS.bold,
        fontSize: SIZES.xl,
        color: COLOURS.primary,
        letterSpacing: SPACING.reduced,
    },
    h2: {
        fontFamily: FONTS.bold,
        fontSize: SIZES.m,
        color: COLOURS.primary,
    },
});

export default TEXT;