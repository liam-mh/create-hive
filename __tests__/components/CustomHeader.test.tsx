import { fireEvent, render } from "@testing-library/react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import CustomHeader from "@/components/CustomHeader";

// Mocks
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

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    back: jest.fn(),
  },
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

describe('<CustomHeader />', () => {
  it('renders logo when showLogo is true', () => {
    const { getByTestId } = render(
      <SafeAreaProvider>
        <CustomHeader showLogo />
      </SafeAreaProvider>
    );

    const logoImage = getByTestId('logo-image');
    expect(logoImage).toBeTruthy();
    expect(logoImage.props.source.testUri).toContain('create-hive-logo');
  });

  it('does not render back button when hideBackButton is true', () => {
    const { queryByTestId } = render(
      <SafeAreaProvider>
        <CustomHeader hideBackButton />
      </SafeAreaProvider>
    );

    const backButton = queryByTestId('back-button');
    expect(backButton).toBeNull();
  });

  it('renders settings icon when showSettingsIcon is true and triggers handleSettings on press', () => {
    const { getByTestId } = render(
      <SafeAreaProvider>
        <CustomHeader />
      </SafeAreaProvider>
    );

    const settingsButton = getByTestId('settings-button');
    fireEvent.press(settingsButton);
    expect(router.push).toHaveBeenCalledWith('/(tabs)/settings');
  });

  it('renders search icon when showSearchIcon is provided and triggers the callback on press', () => {
    const mockSearch = jest.fn();
    const { getByTestId } = render(
      <SafeAreaProvider>
        <CustomHeader showSearchIcon={mockSearch} />
      </SafeAreaProvider>
    );

    const searchButton = getByTestId('search-button');
    fireEvent.press(searchButton);
    expect(mockSearch).toHaveBeenCalled();
  });

  it('renders create icon when showCreateIcon is provided and triggers the callback on press', () => {
    const mockCreate = jest.fn();

    const { getByTestId } = render(
      <SafeAreaProvider>
        <CustomHeader showCreateIcon={mockCreate} />
      </SafeAreaProvider>
    );

    const createButton = getByTestId('create-button');
    fireEvent.press(createButton);
    expect(mockCreate).toHaveBeenCalled();
  });
});