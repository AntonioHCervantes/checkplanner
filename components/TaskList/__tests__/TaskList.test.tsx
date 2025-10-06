import { render, screen } from '../../../test/test-utils';
import TaskList from '../TaskList';

jest.mock('../../TaskItem/TaskItem', () => ({
  __esModule: true,
  default: ({ taskId }: { taskId: string }) => (
    <div data-testid={`task-${taskId}`}></div>
  ),
}));

describe('TaskList', () => {
  const tasks = [
    {
      id: '1',
      title: 'Task 1',
      createdAt: new Date().toISOString(),
      listId: 'backlog',
      tags: [],
      priority: 'medium' as const,
      plannedFor: null,
    },
    {
      id: '2',
      title: 'Task 2',
      createdAt: new Date().toISOString(),
      listId: 'backlog',
      tags: [],
      priority: 'low' as const,
      plannedFor: null,
    },
  ];

  it('renders tasks', () => {
    render(
      <TaskList
        tasks={tasks}
        hasTasks
        isFiltering={false}
      />
    );
    expect(screen.getByTestId('task-1')).toBeInTheDocument();
    expect(screen.getByTestId('task-2')).toBeInTheDocument();
  });

  it('shows intro empty message when there are no tasks', () => {
    render(
      <TaskList
        tasks={[]}
        hasTasks={false}
        isFiltering={false}
      />
    );
    expect(
      screen.getByText('Check your plan. Check your day.')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Explore demo templates' })
    ).toHaveAttribute('href', '/demo-templates');
  });

  it('shows default empty message while filtering', () => {
    render(
      <TaskList
        tasks={[]}
        hasTasks
        isFiltering
      />
    );
    expect(screen.getByText('No tasks')).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'Explore demo templates' })
    ).not.toBeInTheDocument();
  });
});
