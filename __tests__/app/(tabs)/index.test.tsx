import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Index from '@/app/(tabs)';
import { useAuth } from '@/context/authContext';
import { router } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Mocks
jest.mock('@/context/authContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@/utils/iconUtils', () => ({
  getIcon: jest.fn(() => <></>), 
}));

jest.mock('react-native-safe-area-context', () => {
  return {
    useSafeAreaInsets: jest.fn(() => ({
      top: 10,
      bottom: 10,
      left: 0,
      right: 0,
    })),
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('<Index />', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { firstName: 'Liam' },
    });

    (router.push as jest.Mock).mockReset();
  });

  it('renders welcome message with user name', () => {
    const { getByTestId } = render(
      <SafeAreaProvider>
        <Index />
      </SafeAreaProvider>
    );
    
    const header = getByTestId('header-text');
    const subheader = getByTestId('subheader-text');
  
    expect(header.props.children).toContain('Liam');
    expect(subheader.props.children).toBe('lets get you started');
  });

  it('renders create, explore, and discover options', () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <Index />
      </SafeAreaProvider>
    );

    expect(getByText('create')).toBeTruthy();
    expect(getByText('explore')).toBeTruthy();
    expect(getByText('discover')).toBeTruthy();
  });

  it('navigates to /create when pressing the "create" option', () => {
    const { getByTestId } = render(
      <SafeAreaProvider>
        <Index />
      </SafeAreaProvider>
    );

    const button = getByTestId('create-navigation');
    fireEvent.press(button!);
    expect(router.push).toHaveBeenCalledWith('/(tabs)/create');
  });

  it('navigates to /explore when pressing the "explore" option', () => {
    const { getByTestId } = render(
      <SafeAreaProvider>
        <Index />
      </SafeAreaProvider>
    );

    const button = getByTestId('explore-navigation');
    fireEvent.press(button!);
    expect(router.push).toHaveBeenCalledWith('/(tabs)/explore');
  });

  it('navigates to /search when pressing the "discover" option', () => {
    const { getByTestId } = render(
      <SafeAreaProvider>
        <Index />
      </SafeAreaProvider>
    );

    const button = getByTestId('discover-navigation');
    fireEvent.press(button!);
    expect(router.push).toHaveBeenCalledWith('/(tabs)/search');
  });

  it('render all styled images', () => {
    const { getByTestId } = render(
      <SafeAreaProvider>
        <Index />
      </SafeAreaProvider>
    );

    expect(getByTestId('top-image').props.source.testUri).toContain('index-curve-top-primary');
    expect(getByTestId('middle-first-image').props.source.testUri).toContain('index-curve-middle-primary-top');
    expect(getByTestId('middle-second-image').props.source.testUri).toContain('index-curve-middle-secondary-top');
    expect(getByTestId('bottom-image').props.source.testUri).toContain('index-curve-bottom-primary');
  });
});
