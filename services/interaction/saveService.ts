import { Timestamp } from 'firebase/firestore';
import { Interaction, ItemType, InteractionType } from '@/models/Interaction';
import { InteractionServicePost, addInteraction, getInteraction } from '@/services/interaction/interactionService';

const type: InteractionType = 'save';
export interface SaveServiceProps {
  userId: string;
  itemId: string;
  itemType: ItemType;
}

export async function saveItem(saveServiceProps: SaveServiceProps): Promise<Interaction | null> {
  const save: InteractionServicePost = {
    ...saveServiceProps,
    actionType: type,
    timestamp: Timestamp.now(),
  }
  return addInteraction(save);
}

export async function getSave(saveServiceProps: SaveServiceProps): Promise<Interaction | null> {
  const { userId, itemType, itemId } = saveServiceProps;
  return getInteraction(userId, itemType, itemId, type);
}