import { Timestamp } from 'firebase/firestore';
import { Interaction, ItemType, InteractionType } from '@/models/Interaction';
import { InteractionServicePost, addInteraction, getInteraction } from '@/services/interaction/interactionService';

const type: InteractionType = 'like';
export interface LikeServiceProps {
  userId: string;
  itemId: string;
  itemType: ItemType;
}

export async function likeItem(likeServiceProps: LikeServiceProps): Promise<Interaction | null> {
  const like: InteractionServicePost = {
    ...likeServiceProps,
    actionType: type,
    timestamp: Timestamp.now(),
  }
  return addInteraction(like);
}

export async function getLike(likeServiceProps: LikeServiceProps) {
  const { userId, itemType, itemId } = likeServiceProps;
  return getInteraction(userId, itemType, itemId, type);
}