import { Interaction, ItemType, InteractionType } from '@/models/Interaction';
import { addInteraction, InteractionServicePost } from './interactionService';
import { Timestamp } from 'firebase/firestore';

const type: InteractionType = 'register';
const itemType: ItemType = 'event';
export interface RegisterServiceProps {
  userId: string;
  itemId: string;
}

export async function registerUserForEvent(props: RegisterServiceProps): Promise<Interaction | null> {
  const register: InteractionServicePost = {
    ...props,
    itemType: itemType,
    actionType: type,
    timestamp: Timestamp.now(),
  }
  return addInteraction(register);
}