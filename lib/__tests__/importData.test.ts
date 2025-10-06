import { DEMO_TEMPLATES } from '../demoTemplates';
import { useStore } from '../store';
import type { Notification, PersistedState } from '../types';

describe('importData', () => {
  beforeEach(() => {
    useStore.getState().clearAll();
  });

  it('re-adds the welcome notification when the imported data lacks it', () => {
    const templateState = DEMO_TEMPLATES[0].createState();
    expect(templateState.notifications).toHaveLength(0);

    useStore.getState().importData(templateState);

    const notifications = useStore.getState().notifications;
    const welcome = notifications.find(
      notification => notification.id === 'welcome'
    );

    expect(welcome).toBeDefined();
    expect(welcome?.titleKey).toBe('notifications.welcome.title');
  });

  it('keeps an existing welcome notification without duplicating it', () => {
    const templateState = DEMO_TEMPLATES[0].createState();
    const existingWelcome: Notification = {
      id: 'welcome',
      type: 'info',
      titleKey: 'notifications.welcome.title',
      descriptionKey: 'notifications.welcome.description',
      read: true,
      createdAt: '2024-01-01T00:00:00.000Z',
    };
    const stateWithWelcome: PersistedState = {
      ...templateState,
      notifications: [existingWelcome],
    };

    useStore.getState().importData(stateWithWelcome);

    const notifications = useStore.getState().notifications;
    const welcomeNotifications = notifications.filter(
      notification => notification.id === 'welcome'
    );

    expect(welcomeNotifications).toHaveLength(1);
    expect(welcomeNotifications[0].createdAt).toBe(existingWelcome.createdAt);
    expect(welcomeNotifications[0].read).toBe(true);
  });
});
