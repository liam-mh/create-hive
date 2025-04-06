import CreateEventViewModel from '@/viewModels/CreateEventViewModel';
import { createEvent } from '@/services/eventService';
import { uploadImageAsJPG } from '@/hooks/useFirebaseStorage';
import { Timestamp } from 'firebase/firestore';

jest.mock('@/services/eventService', () => ({
  createEvent: jest.fn().mockResolvedValue({ eventId: 'abc123' }),
}));

jest.mock('@/hooks/useFirebaseStorage', () => ({
  uploadImageAsJPG: jest.fn().mockResolvedValue('https://fake.url/image.jpg'),
  getImageUrl: jest.fn().mockResolvedValue('https://fake.url/image.jpg'),
}));
jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  uploadBytes: jest.fn(),
  getDownloadURL: jest.fn().mockResolvedValue('https://mocked-download-url'),
}));
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  Timestamp: jest.fn().mockImplementation(() => ({
    seconds: 1672531200, 
    nanoseconds: 0,
    toDate: jest.fn().mockReturnValue(new Date('2025-01-01T00:00:00Z')),  
  })),
}));

describe('CreateEventViewModel', () => {
  const mockUserId = 'test-user-id';
  const mockLocation = { latitude: 10, longitude: 20 };
  const mockTimestamp = new Timestamp(1672531200, 0);

  let vm: CreateEventViewModel;

  beforeEach(() => {
    jest.clearAllMocks();
    vm = new CreateEventViewModel(mockUserId, mockLocation);
  });

  it('sets and gets eventTitle correctly', () => {
    vm.setEventTitle('Test Event');
    expect(vm.eventTitle).toBe('Test Event');
  });

  it('computes eventMedium only when both primary and secondary are set', () => {
    expect(vm.eventMedium).toBe(null);
    vm.setPrimaryMedium('drawing');
    expect(vm.eventMedium).toBe(null);
    vm.setSecondaryMedium('acrylic');
    expect(vm.eventMedium).toEqual({ primary: 'drawing', secondary: 'acrylic' }); 
  });

  it('returns validation error when required fields are missing', async () => {
    const result = await vm.createEvent();
    expect(result).toMatch(/Please fill in the following fields:/);
  });

  it('creates event successfully when all fields are set', async () => {

    (createEvent as jest.Mock).mockResolvedValue({ eventId: 'abc123' });
    (uploadImageAsJPG as jest.Mock).mockResolvedValue('upload-success');

    vm.setEventType('casual');
    vm.setPrimaryMedium('digital art');
    vm.setSecondaryMedium('3D');
    vm.setEventTimestamp(mockTimestamp);
    vm.setEventDuration(2);
    vm.setVenueName('Test venue');
    vm.setVenueLocation(mockLocation);
    vm.setEventTitle('Test title');
    vm.setEventDescription('Test description');
    vm.setImage('path/to/image.jpg');

    const result = await vm.createEvent();

    expect(createEvent).toHaveBeenCalled();
    expect(uploadImageAsJPG).toHaveBeenCalledWith('path/to/image.jpg', 'event', 'abc123');
    expect(result).toEqual(expect.objectContaining({ eventId: 'abc123' }));
  });

  it('handles event creation failure gracefully', async () => {
    (createEvent as jest.Mock).mockResolvedValue(null);

    vm.setEventType('casual');
    vm.setPrimaryMedium('digital art');
    vm.setSecondaryMedium('3D');
    vm.setEventTimestamp(mockTimestamp);
    vm.setEventDuration(2);
    vm.setVenueName('Test venue');
    vm.setVenueLocation(mockLocation);
    vm.setEventTitle('Test title');
    vm.setEventDescription('Test description');
    vm.setImage('img');

    const result = await vm.createEvent();
    expect(result).toBe('Failed to create event');
    expect(vm.error).toBe('Failed to create event');
  });
});
