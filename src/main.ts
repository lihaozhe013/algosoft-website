import { createApp } from 'vue';
import 'element-plus/es/components/button/style/css';
import 'element-plus/es/components/tag/style/css';

import App from '@/App.vue';
import { startAnalytics } from '@/analytics';
import {
  getDocumentSlugFromPath,
  isDocsHomePath,
} from '@composables/useSiteRoutes';
import { getLocaleFromPath, i18n } from '@/i18n';
import '@styles/main.css';

startAnalytics();

const locale = getLocaleFromPath(window.location.pathname);
const isDocsPage = getDocumentSlugFromPath(window.location.pathname) !== null;
const isDocsHomePage = isDocsHomePath(window.location.pathname);
document.documentElement.lang = locale;
if (!isDocsPage && !isDocsHomePage)
  document.title = i18n.global.t('meta.title');

async function mountPage(): Promise<void> {
  const page = isDocsPage
    ? (await import('@components/DocsPage.vue')).default
    : isDocsHomePage
      ? (await import('@components/DocsHomePage.vue')).default
      : App;

  createApp(page).use(i18n).mount('#app');
}

void mountPage();
