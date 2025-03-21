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

// UserProfile Service
export const userProfileService = new BaseService<UserProfile>('userProfile', mapUserProfileFirestore);

export async function getUserProfileById(id: string): Promise<UserProfile | null> {
  return userProfileService.getById(id);
}

export async function createUserProfile(id: string, data: UserProfile): Promise<UserProfile | null> {
  return userProfileService.createById(id, data);
}