import { Timestamp } from "firebase/firestore";

export type InteractionType = "event" | "artwork" | "comment" | "user";
export type ActionType = "like" | "save" | "follow";
interface Interaction {
    userId: string;
    itemId: string;
    itemType: InteractionType;
    actionType: ActionType;
    timestamp: Timestamp;
}

export interface Like extends Interaction {
} 

export interface Save extends Interaction {
} 

export interface Follow extends Interaction {
} 

export interface Comment extends Interaction {
    content: string;
} 