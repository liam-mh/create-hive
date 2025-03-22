import { StyleSheet, View, Text } from 'react-native';

export default function Report() {
  return (
    <View style={styles.container}>
      <Text>Report user</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});