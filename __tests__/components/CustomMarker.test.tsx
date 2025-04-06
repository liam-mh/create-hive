import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';

import { getImageUrl } from '@/hooks/useFirebaseStorage';
import { COLOURS } from '@/styles';
import CustomMarker from '@/components/CustomMarker';

jest.mock("@/hooks/useFirebaseStorage", () => ({
  getImageUrl: jest.fn(),
}));

jest.mock('react-native/Libraries/Image/Image', () => ({
  ...jest.requireActual('react-native/Libraries/Image/Image'),
  getSize: jest.fn((uri, success) => success && success(DEFAULT_SIZE, DEFAULT_SIZE)),
  prefetch: jest.fn(),
}));

const DEFAULT_SIZE = 2.5 * 16; 

describe('<CustomMarker />', () => {
  const mockCoordinate = { latitude: 123, longitude: 456 };
  const mockOnPress = jest.fn();

  beforeEach(() => {
    (getImageUrl as jest.Mock).mockReset();
  });

  it('renders the marker with default props', () => {
    const { getByTestId } = render(
      <CustomMarker
        coordinate={mockCoordinate}
        type="artwork"
        id="artwork1"
        text="Artwork Title"
        isSelected={false}
      />
    );
  
    expect(getByTestId('custom-marker-artwork-artwork1')).toBeDefined();
    expect(getByTestId('marker-touchable')).toBeDefined();
    expect(getByTestId('marker-container')).toBeDefined();
    expect(getByTestId('pin-artwork')).toBeDefined();
    expect(getByTestId('triangle-artwork')).toBeDefined();
    expect(getByTestId('marker-text')).toBeDefined();
  });
  
  it('renders the correct pin color based on the type', () => {
    const { getByTestId } = render(
      <>
        <CustomMarker
          coordinate={mockCoordinate}
          type="event"
          id="event1"
          text="Event Name"
          isSelected={false}
        />
        <CustomMarker
          coordinate={mockCoordinate}
          type="artwork"
          id="artwork1"
          text="Artwork Title"
          isSelected={false}
        />
      </>
    );
    const eventPin = getByTestId('pin-event');
    const artworkPin = getByTestId('pin-artwork');

    expect(eventPin).toHaveStyle({ backgroundColor: COLOURS.primary });
    expect(artworkPin).toHaveStyle({ backgroundColor: COLOURS.secondary });
  });
  
  it('displays the loading indicator', () => {
    const { getByTestId } = render(
      <CustomMarker
      coordinate={mockCoordinate}
        type="artwork"
        id="artwork1"
        text="Artwork Title"
        isSelected={false}
      />
    );
  
    expect(getByTestId('loading-indicator')).toBeDefined();
  });

  it('renders the text if provided', () => {
    const { getByText } = render(
      <CustomMarker
        coordinate={mockCoordinate}
        type="artwork"
        id="artwork1"
        text="Artwork Title"
        isSelected={false}
      />
    );
    expect(getByText('Artwork Title')).toBeDefined();

    const { queryByText } = render(
      <CustomMarker
        coordinate={mockCoordinate}
        type="artwork"
        id="artwork1"
        text={null}
        isSelected={false}
      />
    );
    expect(queryByText('Artwork Title')).toBeNull();
  });

  it('calls onPress when the marker is pressed', () => {
    const { getByTestId } = render(
      <CustomMarker
        coordinate={mockCoordinate}
        type="artwork"
        id="artwork1"
        text="Artwork Title"
        isSelected={false}
        onPress={mockOnPress}
      />
    );
    const touchable = getByTestId('marker-touchable');
    fireEvent.press(touchable);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('fetches and displays the image URL', async () => {
    (getImageUrl as jest.Mock).mockResolvedValueOnce('https://example.com/image.jpg');

    const { findByTestId } = render(
      <CustomMarker
        coordinate={mockCoordinate}
        type="artwork"
        id="artwork1"
        text="Artwork Title"
        isSelected={false}
      />
    );

    const image = await findByTestId('fetched-image');

    expect(image).toBeDefined();
    expect(image.props.source[0]).toEqual({ uri: 'https://example.com/image.jpg' });
    expect(getImageUrl).toHaveBeenCalledWith('artwork', 'artwork1');
  });

  it('displays the default image if fetching the image URL fails', async () => {
    (getImageUrl as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch image'));

    const { findByTestId } = render(
      <CustomMarker
        coordinate={mockCoordinate}
        type="artwork"
        id="artwork1"
        text="Artwork Title"
        isSelected={false}
      />
    );

    const defaultImage = await findByTestId('default-image-artwork');
    expect(defaultImage).toBeDefined();
  });
});