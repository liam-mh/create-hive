import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Rubik_400Regular, Rubik_700Bold } from '@expo-google-fonts/rubik';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider, useAuth } from '@/context/authContext';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    } else {
      SplashScreen.preventAutoHideAsync();
    }
  }, [fontsLoaded]);

  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {fontsLoaded ? (
          <InnerLayout />
        ) : (
          <Slot />
        )}
      </GestureHandlerRootView>
    </AuthProvider>
  );
}

export function InnerLayout() {
  const { user } = useAuth();
  return (
    <Stack initialRouteName={user ? "(tabs)" : "login"}>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}