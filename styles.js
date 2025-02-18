import { StyleSheet } from 'react-native';

const unit = 16;

export const COLOURS = {
    primary: '#00626B', 
    secondary: '#83C5BE',
    offwhite: '#DDE8ED',  
    darkgrey: '#505050', 
    background: '#f0f0f0',        
    white: '#FFFFFF',
    black: '#000000',
};

const FONTS = {
    regular: 'Rubik_400Regular',  
    bold: 'Rubik_700Bold',      
};
  
export const SIZES = {
    xs: unit / 2,
    s: unit * 0.75,
    m: unit,
    l: unit * 1.5,
    xl: unit * 2
};

const SPACING = {
    reduced: -2
};

export const SHADOWS = {
    containerShadow: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 4,
    },
};

export const TEXT = StyleSheet.create({
    small: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.xs,
        color: COLOURS.black,
    },
    smallPrimary: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.xs,
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