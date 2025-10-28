import { renderHook, act } from '@testing-library/react';
import { useStore } from '../../../lib/store';
import { useWorkScheduleSuggestion } from '../useWorkScheduleSuggestion';

describe('useWorkScheduleSuggestion', () => {
  const initialState = useStore.getState();

  beforeEach(() => {
    act(() => {
      useStore.setState(initialState, true);
      useStore.getState().clearAll();
    });
  });

  afterEach(() => {
    act(() => {
      useStore.setState(initialState, true);
    });
  });

  it('does not re-add the suggestion notification once dismissed', () => {
    const { unmount } = renderHook(() => useWorkScheduleSuggestion());

    act(() => {
      const store = useStore.getState();
      store.addTask({ title: 'Task 1', tags: [], priority: 'medium' });
      store.addTask({ title: 'Task 2', tags: [], priority: 'medium' });
      store.addTask({ title: 'Task 3', tags: [], priority: 'medium' });
    });

    expect(
      useStore
        .getState()
        .notifications.some(
          notification => notification.id === 'work-schedule-suggestion'
        )
    ).toBe(true);

    act(() => {
      useStore.getState().dismissNotification('work-schedule-suggestion');
    });

    expect(
      useStore
        .getState()
        .notifications.some(
          notification => notification.id === 'work-schedule-suggestion'
        )
    ).toBe(false);

    act(() => {
      useStore.getState().addTask({
        title: 'Task 4',
        tags: [],
        priority: 'medium',
      });
    });

    expect(
      useStore
        .getState()
        .notifications.some(
          notification => notification.id === 'work-schedule-suggestion'
        )
    ).toBe(false);

    unmount();
  });
});
