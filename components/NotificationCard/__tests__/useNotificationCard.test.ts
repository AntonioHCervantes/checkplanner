import { renderHook, act } from '@testing-library/react';
import useNotificationCard from '../useNotificationCard';
import { useStore } from '../../../lib/store';
import { usePwaInstallPrompt } from '../../../lib/usePwaInstallPrompt';

jest.mock('../../../lib/usePwaInstallPrompt');

const mockUsePwaInstallPrompt = usePwaInstallPrompt as jest.MockedFunction<
  typeof usePwaInstallPrompt
>;

const initialState = useStore.getState();

describe('useNotificationCard', () => {
  beforeEach(() => {
    act(() => {
      useStore.setState(initialState, true);
    });
    mockUsePwaInstallPrompt.mockReturnValue({
      canInstall: false,
      isInstalled: false,
      promptInstall: jest.fn(),
    });
  });

  afterEach(() => {
    act(() => {
      useStore.setState(initialState, true);
    });
  });

  it('returns welcome actions', () => {
    const { result } = renderHook(() =>
      useNotificationCard({
        notification: {
          id: 'welcome',
          type: 'info',
          titleKey: 'notifications.welcome.title',
          descriptionKey: 'notifications.welcome.description',
          read: false,
          createdAt: new Date().toISOString(),
        },
      })
    );

    expect(result.current.state.isWelcomeNotification).toBe(true);
    expect(result.current.state.actionItems).toHaveLength(2);
  });

  it('dismisses notifications', () => {
    const removeNotification = jest.fn();
    act(() => {
      useStore.setState({ removeNotification });
    });

    const { result } = renderHook(() =>
      useNotificationCard({
        notification: {
          id: 'test',
          type: 'info',
          titleKey: 'notifications.welcome.title',
          descriptionKey: 'notifications.welcome.description',
          read: false,
          createdAt: new Date().toISOString(),
        },
      })
    );

    act(() => {
      result.current.actions.handleDismiss();
    });

    expect(removeNotification).toHaveBeenCalledWith('test');
  });
});
