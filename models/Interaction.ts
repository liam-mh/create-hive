import { DocumentData, Timestamp } from "firebase/firestore";

export type ItemType = "event" | "artwork" | "comment" | "user";
export type InteractionType = "like" | "save" | "follow" | "register" | "comment";

// event - save, register
// artwork - like, save, comment
// comment - like, comment
// user - follow

export interface Interaction {
  id: string
  userId: string;
  itemId: string;
  itemType: ItemType;
  actionType: InteractionType;
  content?: string | null;
  timestamp: Timestamp;
}

export const mapInteractionFirestore = (data: DocumentData | undefined): Interaction | null => { 
  if (!data) return null; 

  return {
    id: data.id, 
    userId: data.userId ?? '',
    itemId: data.itemId ?? '',
    itemType: data.itemType ?? '',
    actionType: data.actionType ?? '',
    content: data.content ?? '',
    timestamp: data.timestamp instanceof Timestamp ? data.timestamp : new Timestamp(0, 0),
  };
};