import ProfileCard from '@/components/ProfileCard';
import ProfileTabSelector from '@/components/ProfileTabSelector';
import { COLOURS, DIVS, UNIT } from '@/styles';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function More() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.sectionContainer}>
          <ProfileCard userId='FghLfeUlFYO0RMZYjzI3' />
        </View>
        <View style={DIVS.offwhite} />
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
});