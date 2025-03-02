import { Interaction, ItemType, InteractionType } from '@/models/Interaction';
import { addInteraction } from './interactionService';

const type: InteractionType = 'like';

export async function likeItem(userId: string, itemId: string, itemType: ItemType): Promise<Interaction | null> {
  return addInteraction(userId, itemId, itemType, type);
}