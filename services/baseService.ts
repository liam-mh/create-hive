import { db } from '@/config/firebase';
import { collection, getDocs, doc, getDoc, DocumentData, QueryConstraint, query, addDoc, deleteDoc, setDoc, updateDoc, QueryDocumentSnapshot, limit, orderBy, startAfter } from 'firebase/firestore';

export class BaseService<T> {
  private collectionName: string;
  private subCollectionName?: string; 
  private mapFunction: (data: DocumentData | undefined) => T | null;
  private parentId?: string;

  constructor(collectionName: string, mapFunction: (data: DocumentData | undefined) => T | null, parentId?: string, subCollectionName?: string) { 
    this.collectionName = collectionName;
    this.subCollectionName = subCollectionName;
    this.mapFunction = mapFunction;
    this.parentId = parentId;
  }

  getSubcollectionService<U>(subcollectionName: string, mapFunction: (data: DocumentData | undefined) => U | null): BaseService<U> {
    if (!this.parentId) {
      throw new Error("Parent ID is required for subcollection service.");
    }
    return new BaseService<U>(this.collectionName, mapFunction, this.parentId, subcollectionName);
  }

  // CRUD

  async create<ID extends keyof T>(data: Omit<T, ID>): Promise<T | null> {
    try {
      let collectionRef;
      let fullPath: string;
  
      if (this.parentId && this.subCollectionName) {
        collectionRef = collection(db, this.collectionName, this.parentId, this.subCollectionName);
        fullPath = `/${this.collectionName}/${this.parentId}/${this.subCollectionName}`;
        console.log(`Creating document in subcollection: ${this.subCollectionName} within parent: ${this.parentId} in collection ${this.collectionName}`);
      } else if (this.parentId) {
        collectionRef = collection(db, this.collectionName, this.parentId);
        fullPath = `/${this.collectionName}/${this.parentId}`;
        console.log(`Creating document in collection: ${this.collectionName} within parent: ${this.parentId}`);
      } else {
        collectionRef = collection(db, this.collectionName);
        fullPath = `/${this.collectionName}`;
        console.log(`Creating document in collection: ${this.collectionName}`);
      }
  
      console.log('Full path:', fullPath);
      console.log('Data to be saved:', data);
  
      const docRef = await addDoc(collectionRef, data as any);
  
      console.log(`Document created with ID: ${docRef.id}`);
  
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const mappedData = this.mapFunction({ id: docSnap.id, ...docSnap.data() });
        console.log('Mapped data:', mappedData);
        return mappedData;
      } else {
        console.log('Document snapshot does not exist.');
        return null;
      }
    } catch (error) {
      const parentInfo = this.parentId ? ` from parent ${this.parentId}` : '';
      console.error(`Error creating document in ${this.collectionName}${parentInfo}:`, error);
      throw error;
    }
  }

  async createById(id: string, data: T): Promise<T | null> {
    try {
      let docRef;
      let fullPath: string;

      if (this.parentId && this.subCollectionName) {
        docRef = doc(db, this.collectionName, this.parentId, this.subCollectionName, id);
        fullPath = `/${this.collectionName}/${this.parentId}/${this.subCollectionName}/${id}`;
        console.log(`Creating document with ID: ${id} in subcollection: ${this.subCollectionName} within parent: ${this.parentId} in collection ${this.collectionName}`);
      } else if (this.parentId) {
        docRef = doc(db, this.collectionName, this.parentId, id);
        fullPath = `/${this.collectionName}/${this.parentId}/${id}`;
        console.log(`Creating document with ID: ${id} in collection: ${this.collectionName} within parent: ${this.parentId}`);
      } else {
        docRef = doc(db, this.collectionName, id);
        fullPath = `/${this.collectionName}/${id}`;
        console.log(`Creating document with ID: ${id} in collection: ${this.collectionName}`);
      }

      console.log('Full path:', fullPath);
      console.log('Data to be saved:', data);

      await setDoc(docRef, data as any);

      console.log(`Document created with ID: ${id}`);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const mappedData = this.mapFunction({ id: docSnap.id, ...docSnap.data() });
        console.log('Mapped data:', mappedData);
        return mappedData;
      } else {
        console.log('Document snapshot does not exist.');
        return null;
      }
    } catch (error) {
      const parentInfo = this.parentId ? ` from parent ${this.parentId}` : '';
      console.error(`Error creating document with ID: ${id} in ${this.collectionName}${parentInfo}:`, error);
      throw error;
    }
  }

  async update(id: string, data: Partial<Omit<T, 'id'>>): Promise<T | null> {
    try {
      let docRef;
      if (this.parentId) {
        docRef = doc(db, this.collectionName, this.parentId, this.collectionName, id);
      } else {
        docRef = doc(db, this.collectionName, id);
      }

      await updateDoc(docRef, data);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return this.mapFunction({ id: docSnap.id, ...docSnap.data() });
      } else {
        return null;
      }
    } catch (error) {
      const parentInfo = this.parentId ? ` from parent ${this.parentId}` : '';
      console.error(`Error updating document ${id} in ${this.collectionName}${parentInfo}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      let docRef;
      let fullPath: string;

      if (this.parentId && this.subCollectionName) {
        docRef = doc(db, this.collectionName, this.parentId, this.subCollectionName, id);
        fullPath = `/${this.collectionName}/${this.parentId}/${this.subCollectionName}/${id}`;
        console.log(`Deleting document with ID: ${id} in subcollection: ${this.subCollectionName} within parent: ${this.parentId} in collection ${this.collectionName}`);
      } else if (this.parentId) {
        docRef = doc(db, this.collectionName, this.parentId, id);
        fullPath = `/${this.collectionName}/${this.parentId}/${id}`;
        console.log(`Deleting document with ID: ${id} in collection: ${this.collectionName} within parent: ${this.parentId}`);
      } else {
        docRef = doc(db, this.collectionName, id);
        fullPath = `/${this.collectionName}/${id}`;
        console.log(`Deleting document with ID: ${id} in collection: ${this.collectionName}`);
      }

      console.log('Full path:', fullPath);

      await deleteDoc(docRef);
    } catch (error) {
      const parentInfo = this.parentId ? ` from parent ${this.parentId}` : '';
      console.error(`Error deleting document ${id} in ${this.collectionName}${parentInfo}:`, error);
      throw error;
    }
  }

  async set(id: string, data: Omit<T, 'id'>): Promise<T | null> {
    try {
        let docRef;
        if (this.parentId) {
            docRef = doc(db, this.collectionName, this.parentId, this.collectionName, id);
        } else {
            docRef = doc(db, this.collectionName, id);
        }

        await setDoc(docRef, data);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return this.mapFunction({ id: docSnap.id, ...docSnap.data() });
        } else {
            return null;
        }
    } catch (error) {
        const parentInfo = this.parentId ? ` from parent ${this.parentId}` : '';
        console.error(`Error setting document ${id} in ${this.collectionName}${parentInfo}:`, error);
        throw error;
    }
  }

  async get(queryConstraints?: QueryConstraint[]): Promise<T[]> {
    try {
      let querySnapshot;
      let collectionRef;
      let fullPath: string;
      let queryDescription: string = "No query constraints.";
  
      if (this.parentId && this.subCollectionName) {
        collectionRef = collection(db, this.collectionName, this.parentId, this.subCollectionName);
        fullPath = `/${this.collectionName}/${this.parentId}/${this.subCollectionName}`;
        console.log(`Getting documents from subcollection: ${this.subCollectionName} within parent: ${this.parentId} in collection ${this.collectionName}`);
      } else if (this.parentId) {
        collectionRef = collection(db, this.collectionName, this.parentId, this.collectionName);
        fullPath = `/${this.collectionName}/${this.parentId}/${this.collectionName}`;
        console.log(`Getting documents from collection: ${this.collectionName} within parent: ${this.parentId}`);
      } else {
        collectionRef = collection(db, this.collectionName);
        fullPath = `/${this.collectionName}`;
        console.log(`Getting documents from collection: ${this.collectionName}`);
      }
  
      console.log('Full path:', fullPath);
  
      if (queryConstraints && queryConstraints.length > 0) {
        const q = query(collectionRef, ...queryConstraints);
        querySnapshot = await getDocs(q);
  
        // Construct query description for logging
        queryDescription = "Query constraints: ";
        queryConstraints.forEach((constraint, index) => {
          queryDescription += constraint.toString();
          if (index < queryConstraints.length - 1) {
            queryDescription += ", ";
          }
        });
        console.log(queryDescription);
      } else {
        querySnapshot = await getDocs(collectionRef);
      }
  
      const mappedResults = querySnapshot.docs
        .map((doc) => this.mapFunction({ id: doc.id, ...doc.data() }))
        .filter((item) => item !== null) as T[];
  
      console.log('Mapped results:', mappedResults);
      return mappedResults;
    } catch (error) {
      const parentInfo = this.parentId ? ` from parent ${this.parentId}` : '';
      console.error(`Error getting ${this.collectionName}${parentInfo}:`, error);
      throw error;
    }
  }

  async getPaginated(
    queryConstraints: QueryConstraint[],
    pageSize: number,
    lastDocument?: QueryDocumentSnapshot<DocumentData>
  ): Promise<{ data: T[]; lastDocument: QueryDocumentSnapshot<DocumentData> | null }> {
    try {
      let collectionRef;
      let q;
  
      if (this.parentId && this.subCollectionName) {
        collectionRef = collection(db, this.collectionName, this.parentId, this.subCollectionName);
      } else if (this.parentId) {
        collectionRef = collection(db, this.collectionName, this.parentId, this.collectionName);
      } else {
        collectionRef = collection(db, this.collectionName);
      }
  
      if (lastDocument) {
        q = query(
          collectionRef,
          ...queryConstraints,
          startAfter(lastDocument),
          limit(pageSize)
        );
      } else {
        q = query(
          collectionRef,
          ...queryConstraints,
          limit(pageSize)
        );
      }
  
      const querySnapshot = await getDocs(q);
      const data: T[] = [];
      let newLastDocument: QueryDocumentSnapshot<DocumentData> | null = null;
  
      querySnapshot.forEach((doc) => {
        const mappedData = this.mapFunction({ id: doc.id, ...doc.data() });
        if(mappedData){
          data.push(mappedData);
          newLastDocument = doc;
        }
      });
  
      return { data, lastDocument: newLastDocument };
    } catch (error) {
      const parentInfo = this.parentId ? ` from parent ${this.parentId}` : '';
      console.error(`Error getting paginated ${this.collectionName}${parentInfo}:`, error);
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