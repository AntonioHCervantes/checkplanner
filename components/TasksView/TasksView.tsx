'use client';
import { Plus } from 'lucide-react';
import AddTask from '../AddTask/AddTask';
import TaskList from '../TaskList/TaskList';
import TagFilter from '../TagFilter/TagFilter';
import useTasksView from './useTasksView';
import { useI18n } from '../../lib/i18n';
import useTasksViewLayout from './useTasksViewLayout';

export default function TasksView() {
  const { state, actions } = useTasksView();
  const {
    tasks,
    tags,
    activeTags,
    tagToRemove,
    highlightedId,
    hasTasks,
    isFiltering,
  } = state;
  const {
    addTask,
    addTag,
    toggleTagFilter,
    resetTagFilter,
    removeTag,
    toggleFavoriteTag,
    confirmRemoveTag,
    cancelRemoveTag,
  } = actions;
  const { t } = useI18n();
  const {
    state: {
      showMobileAddTask,
      confirmDialogRef,
      confirmCancelButtonRef,
      confirmDeleteTitleId,
      confirmDeleteDescriptionId,
    },
    actions: { showMobileForm, onFocusStartGuard, onFocusEndGuard },
  } = useTasksViewLayout({
    hasTasks,
    tagToRemove,
    cancelRemoveTag,
  });
  return (
    <main>
      {hasTasks && !showMobileAddTask && (
        <div className="sm:hidden">
          <div className="flex justify-center px-4 pt-4">
            <button
              type="button"
              onClick={showMobileForm}
              className="flex items-center gap-2 rounded bg-[#57886C] px-4 py-2 text-sm text-white hover:brightness-110 focus:ring"
              aria-expanded={showMobileAddTask}
              aria-controls="tasks-view-add-task"
            >
              <Plus className="h-4 w-4" />
              {t('tasksView.mobileAddTask.show')}
            </button>
          </div>
        </div>
      )}
      <div
        id="tasks-view-add-task"
        className={`${hasTasks && !showMobileAddTask ? 'hidden ' : ''}sm:block`}
      >
        <AddTask
          addTask={addTask}
          tags={tags}
          addTag={addTag}
          toggleFavoriteTag={toggleFavoriteTag}
        />
      </div>
      <TagFilter
        tags={tags}
        activeTags={activeTags}
        toggleTag={toggleTagFilter}
        showAll={resetTagFilter}
        removeTag={removeTag}
        toggleFavorite={toggleFavoriteTag}
      />
      <TaskList
        tasks={tasks}
        highlightedId={highlightedId}
        hasTasks={hasTasks}
        isFiltering={isFiltering}
      />
      {tagToRemove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div
            ref={confirmDialogRef}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={confirmDeleteTitleId}
            aria-describedby={confirmDeleteDescriptionId}
            className="w-full max-w-sm rounded bg-gray-900 p-6 text-center text-gray-100"
          >
            <span
              tabIndex={0}
              aria-hidden="true"
              data-focus-guard
              onFocus={onFocusStartGuard}
              className="sr-only"
            />
            <h2
              id={confirmDeleteTitleId}
              className="mb-2 text-lg font-semibold"
            >
              {t('actions.removeTag')}
            </h2>
            <p
              id={confirmDeleteDescriptionId}
              className="mb-4"
            >
              {t('tagFilter.confirmDelete')}
            </p>
            <div className="flex justify-center gap-2">
              <button
                ref={confirmCancelButtonRef}
                onClick={cancelRemoveTag}
                className="rounded bg-gray-700 px-3 py-1 hover:bg-gray-600 focus:bg-gray-600"
              >
                {t('confirmDelete.cancel')}
              </button>
              <button
                onClick={confirmRemoveTag}
                className="rounded bg-[rgb(184,75,79)] px-3 py-1 text-white hover:brightness-110 focus:brightness-110"
              >
                {t('confirmDelete.delete')}
              </button>
            </div>
            <span
              tabIndex={0}
              aria-hidden="true"
              data-focus-guard
              onFocus={onFocusEndGuard}
              className="sr-only"
            />
          </div>
        </div>
      )}
    </main>
  );
}
