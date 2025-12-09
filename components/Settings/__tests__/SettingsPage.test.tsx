import userEvent from '@testing-library/user-event';
import SettingsPage from '../../../app/settings/page';
import { act, render, screen } from '../../../test/test-utils';
import { useStore } from '../../../lib/store';
import { playNotificationSound } from '../../../lib/sounds';

jest.mock('../../../lib/sounds', () => ({
  ...jest.requireActual('../../../lib/sounds'),
  playNotificationSound: jest.fn(),
}));

const initialState = useStore.getState();

const createMatchMediaMock = (matches: boolean) =>
  jest.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));

describe('SettingsPage', () => {
  const originalMatchMedia = window.matchMedia;
  const originalFileReader = window.FileReader;

  beforeEach(() => {
    window.matchMedia = createMatchMediaMock(
      false
    ) as unknown as typeof window.matchMedia;
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    act(() => {
      useStore.setState({
        ...initialState,
        tasks: [],
        notifications: [],
        exportData: jest.fn(),
        importData: jest.fn(),
        clearAll: jest.fn(),
      });
    });
  });

  afterEach(() => {
    act(() => {
      useStore.setState(initialState, true);
    });
    jest.clearAllMocks();
    window.matchMedia = originalMatchMedia;
    Object.defineProperty(window, 'FileReader', {
      writable: true,
      value: originalFileReader,
    });
  });

  it('defaults to dark theme for first-time visitors', async () => {
    render(<SettingsPage />);

    expect(
      await screen.findByTestId('settings-section-general')
    ).toBeInTheDocument();
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement).toHaveClass('dark');
  });

  it('shows the general section by default and navigates through sections', async () => {
    const user = userEvent.setup();
    render(<SettingsPage />);

    expect(screen.getByTestId('settings-section-general')).toBeInTheDocument();

    await user.click(screen.getByTestId('settings-nav-item-appearance'));
    expect(
      screen.getByTestId('settings-section-appearance')
    ).toBeInTheDocument();

    await user.click(screen.getByTestId('settings-nav-item-work-schedule'));
    expect(
      screen.getByTestId('settings-section-work-schedule')
    ).toBeInTheDocument();
  });

  it('handles data management actions in the General section', async () => {
    const user = userEvent.setup();
    const exportData = jest.fn();
    const importData = jest.fn();
    const clearAll = jest.fn();
    useStore.setState(state => ({
      ...state,
      exportData,
      importData,
      clearAll,
      tasks: [],
      notifications: [],
    }));

    type MutableFileReader = Omit<FileReader, 'result'> & {
      result: string | ArrayBuffer | null;
    };

    const mockReadAsText = jest.fn(function (this: MutableFileReader) {
      this.result = JSON.stringify({ tasks: [] });
      if (typeof this.onload === 'function') {
        this.onload(new ProgressEvent('load') as ProgressEvent<FileReader>);
      }
    });

    Object.defineProperty(window, 'FileReader', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        readAsText: mockReadAsText,
        onload: null,
        result: null,
      })),
    });

    render(<SettingsPage />);

    const fileInput = screen.getByTestId(
      'header-actions-import-input'
    ) as HTMLInputElement;
    const file = new File([JSON.stringify({ tasks: [] })], 'backup.json', {
      type: 'application/json',
    });
    await user.upload(fileInput, file);

    expect(importData).toHaveBeenCalledWith({ tasks: [] });

    await user.click(screen.getByTestId('header-actions-export'));
    expect(exportData).toHaveBeenCalled();

    await user.click(screen.getByTestId('header-actions-clear'));
    expect(
      await screen.findByTestId('header-confirm-dialog')
    ).toBeInTheDocument();

    await user.click(screen.getByTestId('header-confirm-delete'));
    expect(clearAll).toHaveBeenCalled();
  });

  it('updates theme preference from the Appearance section', async () => {
    const user = userEvent.setup();
    localStorage.setItem('theme', 'light');

    render(<SettingsPage />);

    await user.click(screen.getByTestId('settings-nav-item-appearance'));
    await user.click(screen.getByTestId('settings-theme-option-dark'));

    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement).toHaveClass('dark');
  });

  it('allows configuring notification sound preferences', async () => {
    const user = userEvent.setup();

    render(<SettingsPage />);

    await user.click(screen.getByTestId('settings-nav-item-notifications'));

    expect(
      screen.getByTestId('settings-section-notifications')
    ).toBeInTheDocument();

    await user.click(
      screen.getByTestId('settings-notifications-timer-finished-toggle')
    );

    expect(
      useStore.getState().notificationPreferences.timerFinished.soundEnabled
    ).toBe(false);

    const workdaySelect = screen.getByTestId(
      'settings-notifications-workday-reminder-select'
    ) as HTMLSelectElement;
    await user.selectOptions(workdaySelect, 'digital');

    expect(
      useStore.getState().notificationPreferences.workdayReminder.sound
    ).toBe('digital');
  });

  it('lets users preview the selected notification sound', async () => {
    const user = userEvent.setup();

    render(<SettingsPage />);

    await user.click(screen.getByTestId('settings-nav-item-notifications'));

    const previewButton = screen.getByTestId(
      'settings-notifications-timer-finished-preview'
    );

    expect(previewButton).toBeEnabled();

    await user.click(previewButton);

    expect(playNotificationSound).toHaveBeenCalledWith('chime');

    await user.click(
      screen.getByTestId('settings-notifications-timer-finished-toggle')
    );

    expect(previewButton).toBeDisabled();
  });
});
