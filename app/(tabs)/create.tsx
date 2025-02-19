import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Create() {
  return (
    <View style={styles.container}>
      <Text>Create</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});