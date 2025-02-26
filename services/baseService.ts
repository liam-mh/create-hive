import { db } from '@/config/firebase';
import { collection, getDocs, doc, getDoc, DocumentData, QueryConstraint, query } from 'firebase/firestore';

export class BaseService<T> {
  private collectionName: string;
  private mapFunction: (data: DocumentData | undefined) => T | null;

  constructor(collectionName: string, mapFunction: (data: DocumentData | undefined) => T | null) {
    this.collectionName = collectionName;
    this.mapFunction = mapFunction;
  }

  async get(queryConstraints?: QueryConstraint[]): Promise<T[]> {
    try {
      let querySnapshot;
      if (queryConstraints && queryConstraints.length > 0) {
        const collectionRef = collection(db, this.collectionName);
        const q = query(collectionRef, ...queryConstraints);
        querySnapshot = await getDocs(q);
      } else {
        querySnapshot = await getDocs(collection(db, this.collectionName));
      }

      return querySnapshot.docs
        .map((doc) => this.mapFunction({ id: doc.id, ...doc.data() }))
        .filter((item) => item !== null) as T[];
    } catch (error) {
      console.error(`Error getting ${this.collectionName}:`, error);
      throw error;
    }
  }

  async getById(id: string): Promise<T | null> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return this.mapFunction({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.warn(`Document with id ${id} not found in ${this.collectionName}`);
        return null;
      }
    } catch (error) {
      console.error(`Error getting document with id ${id} from ${this.collectionName}:`, error);
      throw error;
    }
  }
}