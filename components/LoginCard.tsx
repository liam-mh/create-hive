import { useAuth } from '@/context/authContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

const LoginCard = () => {
  const { signIn, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  console.log('login card')

  const handleLogin = async () => {
    const user = await signIn(username);
    if (!user) {
      setLoginError('Login failed. Please check your credentials.');
    } else {
      setLoginError(null);
      router.push('/(tabs)');
    }
  };

  if (isLoading) {
    return <View><Text>Loading...</Text></View>
  }

  return (
    <View>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
      <Button title="Login" onPress={handleLogin} />
      {loginError && <Text style={{ color: 'red' }}>{loginError}</Text>}
    </View>
  );
}

export default LoginCard;