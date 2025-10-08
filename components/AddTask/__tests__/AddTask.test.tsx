import { render, screen, fireEvent } from '../../../test/test-utils';
import AddTask from '../AddTask';
import useAddTask from '../useAddTask';
import useAddTaskView from '../useAddTaskView';

jest.mock('../useAddTask');
jest.mock('../useAddTaskView');

const mockUseAddTask = useAddTask as jest.MockedFunction<typeof useAddTask>;
const mockUseAddTaskView = useAddTaskView as jest.MockedFunction<
  typeof useAddTaskView
>;

describe('AddTask', () => {
  beforeEach(() => {
    mockUseAddTask.mockReturnValue({
      state: {
        title: 'Test task',
        tags: [],
        priority: 'medium',
        existingTags: [],
      },
      actions: {
        setTitle: jest.fn(),
        setPriority: jest.fn(),
        handleAdd: jest.fn(),
        handleTagInputChange: jest.fn(),
        handleExistingTagSelect: jest.fn(),
        handleTagInputBlur: jest.fn(),
        removeTag: jest.fn(),
      },
    });
    mockUseAddTaskView.mockReturnValue({
      state: {
        isListening: false,
        showVoiceWarning: false,
        voiceWarningRef: { current: null },
        voiceWarningCloseButtonRef: { current: null },
      },
      actions: {
        handleVoiceInput: jest.fn(),
        closeVoiceWarning: jest.fn(),
        getTagColor: jest.fn(),
        onVoiceWarningFocusStartGuard: jest.fn(),
        onVoiceWarningFocusEndGuard: jest.fn(),
      },
    } as any);
  });

  it('calls handleAdd on submit', () => {
    render(
      <AddTask
        addTask={jest.fn()}
        tags={[]}
        addTag={jest.fn()}
        toggleFavoriteTag={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Add' }));

    const { handleAdd } = mockUseAddTask.mock.results[0].value.actions as any;
    expect(handleAdd).toHaveBeenCalled();
  });
});
