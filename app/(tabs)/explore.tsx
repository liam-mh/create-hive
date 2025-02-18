import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Map from '@/components/Map';

export default function Explore() {
  return (
    <View style={styles.container}>
      <Map />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});