import React from 'react';
import BaseButton from '@/components/buttons/BaseButton';
import { useFollowButtonViewModel } from '@/viewModels/FollowButtonViewModel';

interface FollowButtonProps {
  userToFollowId: string;
  isIconButton?: boolean;
}

const FollowButton: React.FC<FollowButtonProps> = (props) => {
  const {
    state,
    handlers
  } = useFollowButtonViewModel(props);

  return (
    <BaseButton
      isIconButton={props.isIconButton}
      state={state}
      variant='primary'
      states={{
        default: {
          text: 'follow',
          icon: 'personAdd',
          onPress: handlers.default,
        },
        pending: {
          text: 'pending',
          icon: 'personAdd',
          onPress: handlers.pending,
        },
        active: {
          text: 'following',
          icon: 'personFillCheck',
          onPress: handlers.active,
        },
      }}
    />
  );
};

export default FollowButton;