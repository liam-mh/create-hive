import React from 'react';
import { render } from '@testing-library/react-native';
import RootLayout, { InnerLayout } from '@/app/_layout';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useAuth, AuthProvider } from '@/context/authContext';

jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return {
    GestureHandlerRootView: View,
  };
});

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

jest.mock('expo-font', () => ({
  useFonts: jest.fn(),
}));

jest.mock('@/context/authContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useAuth: jest.fn(),
}));

jest.mock('expo-router', () => {
  const React = require('react');
  const { Text } = require('react-native');

  const MockStack = ({ initialRouteName, children }: any) => (
    <>
      <Text testID="stack-initial-route">{initialRouteName}</Text>
      {children}
    </>
  );

  MockStack.Screen = ({ name }: any) => (
    <Text>mock-screen-{name}</Text>
  );

  return {
    Slot: () => <Text testID="slot">mock-slot</Text>,
    Stack: MockStack,
  };
});


describe('RootLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Slot when fonts are not loaded and prevents splash screen auto-hide', () => {
    (useFonts as jest.Mock).mockReturnValue([false, null]);

    const { getByTestId } = render(<RootLayout />);
    expect(getByTestId('slot')).toBeTruthy();
    expect(SplashScreen.preventAutoHideAsync).toHaveBeenCalledTimes(1);
    expect(SplashScreen.hideAsync).not.toHaveBeenCalled();
  });

  it('renders InnerLayout when fonts are loaded and hides splash screen', async () => {
    (useFonts as jest.Mock).mockReturnValue([true]);
    (useAuth as jest.Mock).mockReturnValue({ user: { id: '123' } });

    const { getByTestId } = render(<RootLayout />);
    await Promise.resolve(); 

    expect(getByTestId('stack-initial-route')).toHaveTextContent('(tabs)');
    expect(SplashScreen.hideAsync).toHaveBeenCalledTimes(1);
    expect(SplashScreen.preventAutoHideAsync).not.toHaveBeenCalled();
  });
});

describe('InnerLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sets initialRouteName to "login" when user is not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });

    const { getByTestId } = render(
      <AuthProvider>
        <InnerLayout />
      </AuthProvider>
    );

    expect(getByTestId('stack-initial-route')).toHaveTextContent('login');
  });

  it('sets initialRouteName to "(tabs)" when user is authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: { id: '123' } });

    const { getByTestId } = render(
      <AuthProvider>
        <InnerLayout />
      </AuthProvider>
    );

    expect(getByTestId('stack-initial-route')).toHaveTextContent('(tabs)');
  });

  it('renders defined Stack.Screen components', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: { id: '123' } });

    const { getByText } = render(
      <AuthProvider>
        <InnerLayout />
      </AuthProvider>
    );

    expect(getByText('mock-screen-login')).toBeTruthy();
    expect(getByText('mock-screen-(tabs)')).toBeTruthy();
    expect(getByText('mock-screen-+not-found')).toBeTruthy();
  });
});
