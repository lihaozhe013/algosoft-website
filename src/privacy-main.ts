import { createApp } from 'vue';

import PrivacyApp from '@/pdf/PrivacyApp.vue';
import { startAnalytics } from '@/analytics';
import { getLocaleFromPath } from '@/i18n';
import { getPrivacyContent } from '@data/privacyContent';
import '@styles/main.css';

startAnalytics();

const locale = getLocaleFromPath(window.location.pathname);
const content = getPrivacyContent(locale);
document.documentElement.lang = content.htmlLang;
document.title = content.meta.title;

createApp(PrivacyApp).mount('#app');
