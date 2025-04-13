import { mapUserProfileFirestore, UserProfile } from '@/models/UserProfile';
import { BaseService } from './baseService'; 
import { User, mapUserFirestore } from '@/models/User';
import { where } from 'firebase/firestore';

// User Service
export const userService = new BaseService<User>('user', mapUserFirestore);

export async function getUser(): Promise<User[]> {
  return userService.get();
}

export async function getUserById(id: string): Promise<User | null> {
  return userService.getById(id);
}

export async function getUserByUserAt(userAt: string): Promise<User[]> {
  return userService.get([where('userAt', '==', userAt)]);
}

export async function getUserBySearch(value: string): Promise<User[]> {
  const userAtResults = await userService.get([
    where('userAt', '>=', value),
    where('userAt', '<', value + '\uf8ff'),
  ]);

  const firstNameResults = await userService.get([
    where('firstName', '>=', value),
    where('firstName', '<', value + '\uf8ff'),
  ]);

  const lastNameResults = await userService.get([
    where('lastName', '>=', value),
    where('lastName', '<', value + '\uf8ff'),
  ]);

  const allResults = [...userAtResults, ...firstNameResults, ...lastNameResults];
  const uniqueResults = Array.from(new Set(allResults.map(user => user.userId)))
    .map(id => allResults.find(user => user.userId === id))
    .filter(user => user !== undefined) as User[];

  return uniqueResults;
}

// UserProfile Service
export const userProfileService = new BaseService<UserProfile>('userProfile', mapUserProfileFirestore);

export async function getUserProfileById(id: string): Promise<UserProfile | null> {
  return userProfileService.getById(id);
}

export async function createUserProfile(id: string, data: UserProfile): Promise<UserProfile | null> {
  return userProfileService.createById(id, data);
}