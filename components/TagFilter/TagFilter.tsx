'use client';
import { Tag } from '../../lib/types';
import { useI18n } from '../../lib/i18n';
import { Star } from 'lucide-react';

interface TagFilterProps {
  tags: Tag[];
  activeTag?: string;
  toggleTag: (label: string) => void;
  showAll: () => void;
  removeTag: (label: string) => void;
  toggleFavorite: (label: string) => void;
  'data-testid'?: string;
}

export default function TagFilter({
  tags,
  activeTag = 'all',
  toggleTag,
  showAll,
  removeTag,
  toggleFavorite,
  'data-testid': testId,
}: TagFilterProps) {
  const { t } = useI18n();
  if (tags.length === 0) {
    return null;
  }
  return (
    <div
      className="mt-4 px-4"
      data-testid={testId ?? 'tag-filter'}
    >
      <div
        className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-2 dark:border-gray-700"
        role="tablist"
        aria-label={t('tagFilter.tabsLabel')}
      >
        <button
          type="button"
          onClick={showAll}
          role="tab"
          aria-selected={activeTag === 'all'}
          className={`rounded-t px-3 py-1 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 ${
            activeTag === 'all'
              ? 'bg-gray-900 text-white shadow dark:bg-gray-100 dark:text-gray-900'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
          data-testid="tag-filter-show-all"
        >
          {t('tagFilter.showAll')}
        </button>
        {tags.map(tag => {
          const isActive = activeTag === tag.label;
          return (
            <div
              key={tag.id}
              className={`flex items-center rounded-t border border-transparent bg-transparent text-xs transition ${
                isActive
                  ? 'bg-gray-900/5 text-gray-900 dark:bg-gray-100/10 dark:text-gray-100'
                  : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
              style={{
                boxShadow: isActive
                  ? `inset 0 -2px 0 0 ${tag.color}`
                  : 'inset 0 -2px 0 0 transparent',
              }}
            >
              <button
                type="button"
                onClick={() => toggleTag(tag.label)}
                role="tab"
                aria-selected={isActive}
                className="flex items-center gap-2 rounded-t px-3 py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
                data-testid="tag-filter-toggle"
                data-tag={tag.label}
              >
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: tag.color }}
                />
                <span className="select-none">{tag.label}</span>
                {isActive ? (
                  <span className="sr-only">
                    {t('tagFilter.activeIndicator')}
                  </span>
                ) : null}
              </button>
              <div className="flex items-center pr-2">
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    toggleFavorite(tag.label);
                  }}
                  aria-pressed={tag.favorite}
                  aria-label={
                    tag.favorite
                      ? t('actions.unfavoriteTag')
                      : t('actions.favoriteTag')
                  }
                  title={
                    tag.favorite
                      ? t('actions.unfavoriteTag')
                      : t('actions.favoriteTag')
                  }
                  className="ml-1 flex h-5 w-5 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 dark:text-gray-300 dark:hover:bg-gray-700"
                  data-testid="tag-filter-favorite"
                  data-tag={tag.label}
                >
                  <Star
                    className="h-3 w-3"
                    fill={tag.favorite ? 'currentColor' : 'none'}
                  />
                </button>
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    removeTag(tag.label);
                  }}
                  aria-label={t('actions.removeTag')}
                  title={t('actions.removeTag')}
                  className="ml-1 flex h-5 w-5 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 dark:text-gray-300 dark:hover:bg-gray-700"
                  data-testid="tag-filter-remove"
                  data-tag={tag.label}
                >
                  ×
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
