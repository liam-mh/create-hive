import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { COLOURS, SIZES, UNIT } from '@/styles'; 
import { getIcon } from '@/utils/iconUtils';

interface CustomHeaderProps {
  children: React.ReactNode;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ children }) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    router.back();
  };

  const icon = getIcon('chevronLeft', SIZES.l, COLOURS.primary);

  return (
    <View style={[styles.headerContainer, {paddingTop: insets.top}]}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        {icon}
      </TouchableOpacity>
      <View style={styles.contentContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: UNIT,
    paddingBottom: UNIT/2,
    backgroundColor: COLOURS.white,
    borderColor: COLOURS.primary,
    borderBottomWidth: 1
  },
  backButton: {
    paddingRight: UNIT,
  },
  contentContainer: {
    flex: 1, 
  },
});

export default CustomHeader;