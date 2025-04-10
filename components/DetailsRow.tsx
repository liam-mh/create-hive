import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLOURS, SIZES, TEXT, UNIT } from '@/styles';
import { getIcon, IconNameType } from '@/utils/iconUtils';
import { useRouter } from 'expo-router';

interface DetailsRowProps {
  iconName: IconNameType;
  text: string;
  primaryText?: boolean;
  verificationTick?: boolean;
  profileLink?: string;
}

const DetailsRow: React.FC<DetailsRowProps> = ( props ) => {
  const icon = getIcon(props.iconName);
  const textStyle = !props.primaryText 
    ? TEXT.regular
    : TEXT.boldPrimary
  const iconVerification = getIcon('checkCircle', undefined, COLOURS.primary);
  const iconChevronRight = getIcon('chevronRight', SIZES.s, COLOURS.primary);

  const router = useRouter();
  
    const handleProfilePress = () => {
      router.push({
        pathname: '/(tabs)/userProfile',
        params: {
          userId: props.profileLink
        }
      });
    };

  return (
    <View style={styles.row}>
      {icon}
      {props.profileLink ? (
        <TouchableOpacity style={styles.row} onPress={handleProfilePress}>
          <Text style={TEXT.regularPrimary}>{props.text}</Text> 
          {iconChevronRight}
        </TouchableOpacity>
      ) : (
        <Text style={textStyle}>{props.text}</Text> 
      )}
      {props.verificationTick &&
        iconVerification
      }
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: UNIT,
  },
});

export default DetailsRow;