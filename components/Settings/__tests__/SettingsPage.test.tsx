import userEvent from '@testing-library/user-event';
import SettingsPage from '../../../app/settings/page';
import { act, render, screen } from '../../../test/test-utils';
import { useStore } from '../../../lib/store';

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

    const mockReadAsText = jest.fn(function (this: FileReader) {
      this.result = JSON.stringify({ tasks: [] });
      if (typeof this.onload === 'function') {
        this.onload(new ProgressEvent('load'));
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
});
