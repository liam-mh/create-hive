import React from 'react';
import BaseButton from '@/components/buttons/BaseButton';
import { ItemType } from '@/models/Interaction';
import { useSaveButtonViewModel } from '@/viewModels/SaveButtonViewModel';

export interface SaveButtonProps {
  itemId: string;
  itemType: ItemType;
  isIconButton?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = (props) => {
  const {
    state,
    handlers
  } = useSaveButtonViewModel(props);

  return (
    <BaseButton
      isIconButton={props.isIconButton}
      state={state}
      variant='primary'
      states={{
        default: {
          text: 'save',
          icon: 'bookmark',
          onPress: handlers.default,
        },
        pending: {
          text: 'pending',
          icon: 'bookmark',
          onPress: handlers.pending,
        },
        active: {
          text: 'saved',
          icon: 'bookmarkFill',
          onPress: handlers.active,
        },
      }}
    />
  );
};

export default SaveButton;