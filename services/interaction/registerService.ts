import { Interaction, ItemType, InteractionType } from '@/models/Interaction';
import { addInteraction } from './interactionService';

const type: InteractionType = 'register';
const itemType: ItemType = 'event';

export async function registerUserForEvent(userId: string, itemId: string ): Promise<Interaction | null> {
  return addInteraction(userId, itemId, itemType, type);
}