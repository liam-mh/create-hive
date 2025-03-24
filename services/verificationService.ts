import { Verification, mapVerificationFirestore } from '@/models/Verification';
import { BaseService } from './baseService';

export const verificationService = new BaseService<Verification>('verification', mapVerificationFirestore);

export async function createVerification(props: Verification): Promise<Verification | null> {
  return verificationService.create<'userId'>(props);
}

export async function getVerification(): Promise<Verification[]> {
  return verificationService.get();
}

export async function getVerificationById(id: string): Promise<Verification | null> {
  return verificationService.getById(id);
}