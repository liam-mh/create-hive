import MarkerDetailsSheet from '@/components/MarkerDetailsSheet';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Search() {
  return (
    <View style={styles.container}>
      <Text>Search</Text>
      <MarkerDetailsSheet />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});