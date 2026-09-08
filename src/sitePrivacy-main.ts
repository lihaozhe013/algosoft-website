import { createApp } from 'vue';

import { startAnalytics } from '@/analytics';
import SitePrivacyApp from '@/sitePrivacy/SitePrivacyApp.vue';
import { getSitePrivacyContent } from '@data/sitePrivacyContent';
import { getLocaleFromPath } from '@/i18n';
import '@styles/main.css';

const content = getSitePrivacyContent(
  getLocaleFromPath(window.location.pathname),
);
document.documentElement.lang = content.htmlLang;
document.title = `${content.hero.title} | AlgoSoft`;
startAnalytics();

createApp(SitePrivacyApp).mount('#app');
