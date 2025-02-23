import { db } from '../config/firebase';
import { collection, getDocs, doc, getDoc, QueryConstraint, query } from 'firebase/firestore';

export async function readCollection<T>(collectionName: string): Promise<T[]> {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as T);
  } catch (error) {
    console.error(`Error reading collection ${collectionName}:`, error);
    throw error;
  }
}

export async function readDocument<T>(collectionName: string, documentId: string): Promise<T | null> {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const data = { id: docSnapshot.id, ...docSnapshot.data() } as T;
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error reading document ${documentId} from collection ${collectionName}:`, error);
    throw error;
  }
}

export async function queryCollection<T>(
  collectionName: string,
  queryConstraints: QueryConstraint[]
): Promise<T[]> {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, ...queryConstraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as T);
  } catch (error) {
    console.error(`Error querying collection ${collectionName}:`, error);
    throw error;
  }
}