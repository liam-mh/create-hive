import React from 'react';
import BaseButton from '@/components/buttons/BaseButton';
import { useRouter } from 'expo-router';
import { messageParams } from '@/app/(tabs)/message';

interface MessageButtonProps {
  params: messageParams
}

const MessageButton: React.FC<MessageButtonProps> = ( props ) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/message',
      params: {
        primaryUserId: props.params.primaryUserId,
        primaryUserName: props.params.primaryUserName,
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