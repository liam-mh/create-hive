import { DocumentData } from "firebase/firestore";
import { readCollection } from "../hooks/useFirestore";
import { User, mapUserFirestore } from "../models/User";

export async function getUser(): Promise<User[]> {
    try {
        const usersData = await readCollection<DocumentData>('user');
        return usersData.map(data => mapUserFirestore(data)).filter(user => user !== null) as User[]; 
    } catch (error) {
        console.error("Error getting users:", error);
        throw error;
    }
}