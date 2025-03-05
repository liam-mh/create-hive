import { Interaction, ItemType, InteractionType } from '@/models/Interaction';
import { addInteraction } from '@/services/interaction/interactionService';

const type: InteractionType = 'save';

export async function saveItem(userId: string, itemId: string, itemType: ItemType): Promise<Interaction | null> {
  return addInteraction(userId, itemId, itemType, type);
}