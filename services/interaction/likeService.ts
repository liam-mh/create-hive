import { Timestamp } from 'firebase/firestore';
import { Interaction, ItemType, InteractionType } from '@/models/Interaction';
import { InteractionServicePost, addInteraction, getInteraction } from '@/services/interaction/interactionService';

const type: InteractionType = 'like';

export async function likeItem(userId: string, itemId: string, itemType: ItemType): Promise<Interaction | null> {
  const like: InteractionServicePost = {
    userId: userId,
    itemId: itemId,
    itemType: itemType,
    actionType: type,
    timestamp: Timestamp.now(),
  }
  return addInteraction(like);
}

export async function getLike(userId: string, itemId: string, itemType: ItemType) {
  return getInteraction(userId, itemType, itemId, type);
}