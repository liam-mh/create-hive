import { Timestamp, where } from 'firebase/firestore';
import { InteractionType, Interaction, ItemType, mapInteractionFirestore } from '@/models/Interaction';
import { BaseService } from '../baseService';

const collectionName = 'interaction';

export async function addInteraction(
  userId: string,
  itemId: string,
  itemType: ItemType,
  actionType: InteractionType,
  content: string | null = null
): Promise<Interaction | null> {
  try {
    const interaction: Omit<Interaction, 'id'> = {
      userId,
      itemId,
      itemType,
      actionType,
      content,
      timestamp: Timestamp.now(),
    };

    const userService = new BaseService<Interaction>(collectionName, mapInteractionFirestore, userId);
    const itemTypeService = userService.getSubcollectionService<Interaction>(itemType, mapInteractionFirestore);

    return itemTypeService.create(interaction);
  } catch (error) {
    console.error(
      `Error adding interaction for userId ${userId}, itemId ${itemId}, itemType ${itemType}, actionType ${actionType}:`,
      error
    );
    return null;
  }
}

export async function getInteractionsByUserAndType(userId: string, itemType: ItemType): Promise<Interaction[]> {
  const userService = new BaseService<Interaction>(collectionName, mapInteractionFirestore, userId);
  const itemTypeService = userService.getSubcollectionService<Interaction>(itemType, mapInteractionFirestore);
  return itemTypeService.get();
}

export async function getInteractionsByUserAndItem(
  userId: string,
  itemType: ItemType,
  itemId: string
): Promise<Interaction[]> {
  const userService = new BaseService<Interaction>(collectionName, mapInteractionFirestore, userId);
  const itemTypeService = userService.getSubcollectionService<Interaction>(itemType, mapInteractionFirestore);
  return itemTypeService.get([where('itemId', '==', itemId)]);
}

export async function getAllInteractionsByUser(userId: string): Promise<Interaction[]> {
  const interactionTypes: ItemType[] = ['event', 'artwork', 'comment', 'user'];
  let allInteractions: Interaction[] = [];

  for (const itemType of interactionTypes) {
    const interactions = await getInteractionsByUserAndType(userId, itemType);
    allInteractions = allInteractions.concat(interactions);
  }

  return allInteractions;
}

export async function getAllInteractionsByUserAndItemId(userId: string, itemId: string): Promise<Interaction[]> {
  const interactionTypes: ItemType[] = ['event', 'artwork', 'comment', 'user'];
  let allInteractions: Interaction[] = [];

  for (const itemType of interactionTypes) {
    const interactions = await getInteractionsByUserAndItem(userId, itemType, itemId);
    allInteractions = allInteractions.concat(interactions);
  }

  return allInteractions;
}