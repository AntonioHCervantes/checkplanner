'use client';

import Link from 'next/link';
import { useI18n } from '../../lib/i18n';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer
      className="bg-gray-100 py-4 dark:bg-gray-950"
      data-testid="app-footer"
    >
      <nav
        className="mx-auto flex flex-wrap justify-center gap-4 px-4 text-sm text-gray-600 dark:text-gray-400"
        data-testid="footer-nav"
      >
        <Link
          href="/about"
          className="hover:underline"
          data-testid="footer-link-about"
        >
          {t('footer.about')}
        </Link>
        <Link
          href="https://github.com/AntonioHCervantes/checkplanner"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
          data-testid="footer-link-github"
        >
          {t('footer.openSource')}
        </Link>
        <Link
          href="/faqs"
          className="hover:underline"
          data-testid="footer-link-faqs"
        >
          {t('footer.faqs')}
        </Link>
        <Link
          href="/demo-templates"
          className="hover:underline"
          data-testid="footer-link-demo-templates"
        >
          {t('footer.demoTemplates')}
        </Link>
        <Link
          href="/privacy"
          className="hover:underline"
          data-testid="footer-link-privacy"
        >
          {t('footer.privacy')}
        </Link>
        <Link
          href="/terms"
          className="hover:underline"
          data-testid="footer-link-terms"
        >
          {t('footer.terms')}
        </Link>
      </nav>
    </footer>
  );
}
