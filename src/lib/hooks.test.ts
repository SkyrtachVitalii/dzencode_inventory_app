import { renderHook } from '@testing-library/react';
import { useSocket } from './hooks';
import { selectActiveSessions } from '@/lib/features/sessions/sessionsSlice';
import * as reactRedux from 'react-redux';

interface MockSocket {
  on: jest.Mock;
  off: jest.Mock;
  emit: jest.Mock;
  connect: jest.Mock;
  disconnect: jest.Mock;
  connected: boolean;
}

const mockSocketObj: MockSocket = {
  on: jest.fn(),
  off: jest.fn(),
  emit: jest.fn(),
  connect: jest.fn(),
  disconnect: jest.fn(),
  connected: false,
};

jest.mock('@/lib/socketClient', () => ({
  getSocket: jest.fn(() => mockSocketObj),
}));

jest.mock('react-redux', () => {
  const actual = jest.requireActual('react-redux');
  const mockUseDispatch = jest.fn();
  // @ts-expect-error: mock hack
  mockUseDispatch.withTypes = () => mockUseDispatch;
  return {
    ...actual,
    useDispatch: mockUseDispatch,
    useSelector: Object.assign(jest.fn(), { withTypes: () => jest.fn() }),
    useStore: Object.assign(jest.fn(), { withTypes: () => jest.fn() }),
  };
});

describe('useSocket Hook', () => {
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockDispatch = jest.fn();
    (reactRedux.useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  test('should subscribe to "session-update" and dispatch selectActiveSessions action', () => {
    const { unmount } = renderHook(() => useSocket());

    expect(mockSocketObj.connect).toHaveBeenCalled();
    expect(mockSocketObj.emit).toHaveBeenCalledWith("ask-session-count");
    expect(mockSocketObj.on).toHaveBeenCalledWith('session-update', expect.any(Function));

    type SocketOnArgs = [string, (count: number) => void];
    const calls = mockSocketObj.on.mock.calls as SocketOnArgs[];
    const sessionUpdateCall = calls.find((call) => call[0] === 'session-update');

    expect(sessionUpdateCall).toBeDefined();

    if (sessionUpdateCall) {
        const callback = sessionUpdateCall[1];
        callback(42);
    }

    expect(mockDispatch).toHaveBeenCalledWith(selectActiveSessions(42));

    unmount();
    expect(mockSocketObj.off).toHaveBeenCalledWith('session-update', expect.any(Function));
  });
});