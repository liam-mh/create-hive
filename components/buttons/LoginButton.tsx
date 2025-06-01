import React from 'react';
import BaseButton from '@/components/buttons/BaseButton';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'expo-router';

interface LoginButtonProps {
  userAt: string;
  onLoginResult: (error: string | null) => void;
}

const LoginButton: React.FC<LoginButtonProps> = ( props ) => {
  const { signIn } = useAuth();
  const router = useRouter();

  const handlePress = async () => {
    const user = await signIn(props.userAt);
    if (!user) {
      props.onLoginResult('login failed. please check your credentials');
    } else {
      props.onLoginResult(null);
      router.push('/(tabs)');
    }
  };

  return (
    <BaseButton
      state='default'
      variant='primary'
      states={{
        default: {
          text: 'login',
          icon: 'checkCircle',
          onPress: handlePress,
        },
      }}
    />
  );
};

export default LoginButton;