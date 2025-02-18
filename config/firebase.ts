import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const firebaseConfig = {
    apiKey: Constants.expoConfig?.extra?.FIREBASE_API_KEY,
    authDomain: Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN,
    projectId: Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID,
    storageBucket: Constants.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: Constants.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID,
    appId: Constants.expoConfig?.extra?.FIREBASE_APP_ID,
    measurementId: Constants.expoConfig?.extra?.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage) 
});

export const storage = getStorage(app);