import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

export default function Search() {
  const { tag } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text>{tag ? tag : 'no search term'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});