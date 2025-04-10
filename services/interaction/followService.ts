import { Timestamp } from 'firebase/firestore';
import { Interaction, ItemType, InteractionType } from '@/models/Interaction';
import { InteractionServicePost, addInteraction, getInteraction } from '@/services/interaction/interactionService';

const type: InteractionType = 'follow';
const itemType: ItemType = 'user'
export interface FollowServiceProps {
  userId: string;
  userToFollowId: string;
}

export async function followUser( props: FollowServiceProps ): Promise<Interaction | null> {
  const follow: InteractionServicePost = {
    userId: props.userId,
    itemId: props.userToFollowId,
    itemType: itemType,
    actionType: type,
    timestamp: Timestamp.now()
  }
  return addInteraction(follow);
}

export async function getFollow( props: FollowServiceProps ): Promise<Interaction | null> {
  const { userId, userToFollowId } = props;
  return getInteraction(userId, itemType, userToFollowId, type);
}