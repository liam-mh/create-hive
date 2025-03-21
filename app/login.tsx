import LoginCard from '@/components/LoginCard';
import { StyleSheet, View, Text } from 'react-native';

export default function LoginPage() {
  return (
    <View style={styles.container}>
      <Text>LOGIN PAGE</Text>
      <LoginCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});