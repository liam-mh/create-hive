import { db } from '@/config/firebase';
import { collection, getDocs, doc, getDoc, DocumentData, QueryConstraint, query } from 'firebase/firestore';

export class BaseService<T> {
  private collectionName: string;
  private mapFunction: (data: DocumentData | undefined) => T | null;
  private parentId?: string;

  constructor(collectionName: string, mapFunction: (data: DocumentData | undefined) => T | null, parentId?: string) {
    this.collectionName = collectionName;
    this.mapFunction = mapFunction;
    this.parentId = parentId;
  }

  getSubcollectionService<U>(subcollectionName: string, mapFunction: (data: DocumentData | undefined) => U | null): BaseService<U> {
    if (!this.parentId) {
      throw new Error("Parent ID is required for subcollection service.");
    }
    return new BaseService<U>(subcollectionName, mapFunction, this.parentId);
  }

  async get(queryConstraints?: QueryConstraint[]): Promise<T[]> {
    try {
      let querySnapshot;
      let collectionRef;

      if (this.parentId) {
        collectionRef = collection(db, this.collectionName, this.parentId, this.collectionName); 
      } else {
        collectionRef = collection(db, this.collectionName); 
      }

      if (queryConstraints && queryConstraints.length > 0) {
        const q = query(collectionRef, ...queryConstraints);
        querySnapshot = await getDocs(q);
      } else {
        querySnapshot = await getDocs(collectionRef);
      }

      return querySnapshot.docs
        .map((doc) => this.mapFunction({ id: doc.id, ...doc.data() }))
        .filter((item) => item !== null) as T[];
    } catch (error) {
      const parentInfo = this.parentId ? ` from parent ${this.parentId}` : '';
      console.error(`Error getting ${this.collectionName}${parentInfo}:`, error);
      throw error;
    }
  }

  async getById(id: string): Promise<T | null> {
    try {
      let docRef;

      if (this.parentId) {
        docRef = doc(db, this.collectionName, this.parentId, this.collectionName, id); 
      } else {
        docRef = doc(db, this.collectionName, id); 
      }

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return this.mapFunction({ id: docSnap.id, ...docSnap.data() });
      } else {
        const parentInfo = this.parentId ? ` from parent ${this.parentId}` : '';
        console.warn(`Document with id ${id} not found in ${this.collectionName}${parentInfo}`);
        return null;
      }
    } catch (error) {
      const parentInfo = this.parentId ? ` from parent ${this.parentId}` : '';
      console.error(`Error getting document with id ${id} from ${this.collectionName}${parentInfo}:`, error);
      throw error;
    }
  }
}