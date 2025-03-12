import ProfileCard from '@/components/ProfileCard';
import ProfileTabSelector from '@/components/ProfileTabSelector';
import { COLOURS, UNIT } from '@/styles';
import { StyleSheet, View } from 'react-native';

export default function More() {
  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <ProfileCard userId='FghLfeUlFYO0RMZYjzI3' />
      </View>
      <View style={styles.div}/>
      <ProfileTabSelector />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOURS.white,
    gap: UNIT
  },
  sectionContainer: {
    paddingInline: UNIT
  },
  div: {
    height: 1,
    backgroundColor: COLOURS.offwhite
  },
});