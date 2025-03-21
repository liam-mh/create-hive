import React, { createContext, useContext, useState, useEffect } from 'react';
import { View, ActivityIndicator, AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/models/User';
import { getUserByUserAt } from '@/services/userService';

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  signIn: (userAt: string) => Promise<User | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();

    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        try {
          await AsyncStorage.removeItem('user');
          setUser(null);
        } catch (error) {
          console.error('Error clearing user on app close:', error);
        }
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  const signIn = async (userAt: string) => {
    console.log('logging in with: ', userAt);
    try {
      const fetchedUsers: User[] = await getUserByUserAt(userAt);
      if (fetchedUsers && fetchedUsers.length > 0) {
        const fetchedUser: User = fetchedUsers[0];
        await AsyncStorage.setItem('user', JSON.stringify(fetchedUser));
        setUser(fetchedUser);
        return fetchedUser;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Login failed:', error);
      return null;
    }
  };


  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error removing user:', error);
    }
  };

  const value = {
    user,
    setUser,
    isLoading,
    signIn,
    signOut,
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}