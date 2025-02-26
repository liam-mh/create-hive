import { BaseService } from './baseService'; 
import { User, mapUserFirestore } from '@/models/User';

export const userService = new BaseService<User>('user', mapUserFirestore);

export async function getUser(): Promise<User[]> {
  return userService.get();
}

export async function getUserById(id: string): Promise<User | null> {
  return userService.getById(id);
}