import React, { useState } from 'react';
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
      text='login'
      icon='checkCircle'
      iconFill='infoSquareFill'
      pending={false}
      onPress={handlePress}
      isSelected={false}
      isIconButton={false}
    />
  );
};

export default LoginButton;