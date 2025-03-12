import ProfileCard from '@/components/ProfileCard';
import { UNIT } from '@/styles';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function More() {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <ProfileCard userId='FghLfeUlFYO0RMZYjzI3' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: UNIT
  },
  profile: {
    marginBottom: UNIT
  }
});