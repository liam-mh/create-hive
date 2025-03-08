import { Interaction, InteractionType, ItemType, mapInteractionFirestore } from '@/models/Interaction';
import { BaseService } from '@/services/baseService';
import { where } from 'firebase/firestore';

const collectionName = 'interaction';
export type InteractionServicePost = Omit<Interaction, 'id'>; 

export function createService(userId: string, itemType: ItemType)  {
  return new BaseService<Interaction>(collectionName, mapInteractionFirestore, userId, itemType);
}

export async function addInteraction(interaction: InteractionServicePost): Promise<Interaction | null> {
  const service = createService(interaction.userId, interaction.itemType);
  return service.create(interaction);
}

export async function getInteraction(
  userId: string, itemType: ItemType, itemId: string, interactionType: InteractionType 
): Promise<Interaction[]> {
  const service = createService(userId, itemType);
  return service.get([where('itemId', '==', itemId), where('actionType', '==', interactionType)]);
} 