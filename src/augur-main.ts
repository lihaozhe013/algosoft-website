import { createApp } from 'vue';
import 'element-plus/es/components/button/style/css';

import AugurApp from '@/augur/AugurApp.vue';
import { startAnalytics } from '@/analytics';
import { getAugurContent } from '@data/augurContent';
import { getLocaleFromPath } from '@/i18n';
import '@styles/main.css';

startAnalytics();

const content = getAugurContent(getLocaleFromPath(window.location.pathname));
document.documentElement.lang = content.htmlLang;
document.title = content.meta.title;

createApp(AugurApp).mount('#app');
