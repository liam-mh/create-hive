export const getFirestore = jest.fn();
export const Timestamp = {
  now: jest.fn(() => ({
    toDate: jest.fn(() => new Date()),
  })),
  fromDate: jest.fn((date) => ({ 
    toDate: jest.fn(() => date), 
  })),
};
export const collection = jest.fn();
export const doc = jest.fn();
export const addDoc = jest.fn();
export const setDoc = jest.fn();
export const getDoc = jest.fn();
export const updateDoc = jest.fn();
export const deleteDoc = jest.fn();
export const query = jest.fn();
export const where = jest.fn();
export const orderBy = jest.fn();
export const limit = jest.fn();
export const onSnapshot = jest.fn();