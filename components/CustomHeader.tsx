import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { COLOURS, SIZES, UNIT } from '@/styles';
import { getIcon } from '@/utils/iconUtils';

interface CustomHeaderProps {
  children?: React.ReactNode;
  showSettingsIcon?: boolean;
  hideBackButton?: boolean;
  showLogo?: boolean
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ children, showSettingsIcon = false, hideBackButton = false, showLogo = false }) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    router.back();
  };

  const handleSettings = () => {
    router.push('/(tabs)/settings');
  };

  const icon = getIcon('chevronLeft', SIZES.l, COLOURS.primary);
  const iconList = getIcon('list', SIZES.l, COLOURS.primary);
  const logo = require('@/assets/images/create-hive-logo.png');

  return (
    <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
      {showLogo ? (
        <View style={styles.logoWrapper}>
          <Image source={logo} style={styles.logo} />
        </View>
      ) : (
        <>
          {!hideBackButton && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              {icon}
            </TouchableOpacity>
          )}
          <View style={styles.contentContainer}>
            {children}
          </View>
          {showSettingsIcon && (
            <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
              {iconList}
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: UNIT,
    paddingBottom: UNIT / 2,
    backgroundColor: COLOURS.white,
    borderColor: COLOURS.primary,
    borderBottomWidth: 1,
  },
  backButton: {
    paddingRight: UNIT,
  },
  contentContainer: {
    flex: 1,
  },
  settingsButton: {
    paddingLeft: UNIT,
  },
  logoWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: UNIT / 3,
    paddingTop: UNIT / 4
  },
  logo: {
    height: UNIT * 1.8,
    width: UNIT * 10.5, 
    resizeMode: 'contain',
  }
});

export default CustomHeader;