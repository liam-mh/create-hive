import { db } from '../config/firebase';
import { collection, getDocs, DocumentData, DocumentSnapshot } from 'firebase/firestore';

export async function readCollection<T>(collectionName: string): Promise<T[]> {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as T); 
    } catch (error) {
        console.error(`Error reading collection ${collectionName}:`, error);
        throw error; 
    }
}