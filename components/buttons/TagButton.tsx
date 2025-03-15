import React, { useState } from 'react';
import BaseButton from '@/components/buttons/BaseButton';
import { useRouter } from 'expo-router';

interface TagButtonProps {
  tag: string;
}

const TagButton: React.FC<TagButtonProps> = ( props ) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/search',
      params: {
        tag: props.tag,
      }
    });
  };

  return (
    <BaseButton
      text={props.tag}
      icon='tag'
      iconFill='tagFill'
      pending={false}
      onPress={handlePress}
      isSelected={false}
      isIconButton={false}
    />
  );
};

export default TagButton;