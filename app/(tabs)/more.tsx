import ProfileCard from '@/components/ProfileCard';
import ProfileTabSelector from '@/components/ProfileTabSelector';
import { COLOURS, UNIT } from '@/styles';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function More() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.sectionContainer}>
          <ProfileCard userId='FghLfeUlFYO0RMZYjzI3' />
        </View>
        <View style={styles.div} />
        <ProfileTabSelector />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOURS.white,
  },
  content: {
    gap: UNIT,
    flexGrow: 1,
  },
  sectionContainer: {
    paddingInline: UNIT,
  },
  div: {
    height: 1,
    backgroundColor: COLOURS.offwhite,
  },
});