import { StyleSheet, View, Text } from 'react-native';

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