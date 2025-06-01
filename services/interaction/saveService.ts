import { Timestamp } from 'firebase/firestore';
import { Interaction, ItemType, InteractionType } from '@/models/Interaction';
import { InteractionServicePost, addInteraction, deleteInteraction, getInteraction } from '@/services/interaction/interactionService';

const type: InteractionType = 'save';
export interface SaveServiceProps {
  userId: string;
  itemId: string;
  itemType: ItemType;
}

export async function saveItem( props: SaveServiceProps ): Promise<Interaction | null> {
  const save: InteractionServicePost = {
    ...props,
    actionType: type,
    timestamp: Timestamp.now(),
  }
  return addInteraction(save);
}

export async function unsaveItem( props: SaveServiceProps ): Promise<boolean> {
  const isSaved = await getSave(props);
  if (isSaved) {
    await deleteInteraction(props.userId, props.itemType, isSaved.id);
    return true;
  }
  return false;
}

export async function getSave( props: SaveServiceProps ): Promise<Interaction | null> {
  const { userId, itemType, itemId } = props;
  return getInteraction(userId, itemType, itemId, type);
}