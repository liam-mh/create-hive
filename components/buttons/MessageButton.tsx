import React from 'react';
import BaseButton from '@/components/buttons/BaseButton';
import { useRouter } from 'expo-router';
import { messageParams } from '@/app/(tabs)/message';
import { useAuth } from '@/context/authContext';

interface MessageButtonProps {
  params: Omit<messageParams, 'primaryUserId'>
}

const MessageButton: React.FC<MessageButtonProps> = ( props ) => {
  const router = useRouter();
  const sessionUserId = useAuth().user!.userId;

  const handlePress = () => {
    router.push({
      pathname: '/message',
      params: {
        primaryUserId: sessionUserId,
        secondaryUserId: props.params.secondaryUserId,
        secondaryUserName: props.params.secondaryUserName,
      }
    });
  };

  return (
    <BaseButton
      text='message'
      icon='chat'
      iconFill='chatFill'
      pending={false}
      onPress={handlePress}
      isSelected={false}
      isIconButton={false}
    />
  );
};

export default MessageButton;