<script setup lang="ts">
import ProductPageShell from '@components/ProductPageShell.vue';
import { getSiteRoutes } from '@composables/useSiteRoutes';
import { getSitePrivacyContent } from '@data/sitePrivacyContent';
import { getLocaleFromPath } from '@/i18n';

const content = getSitePrivacyContent(
  getLocaleFromPath(window.location.pathname),
);
const routes = getSiteRoutes(content.locale);

const footerLinks = [
  { label: content.footer.backHome, href: routes.home },
  { label: '5266917@qq.com', href: 'mailto:5266917@qq.com' },
] as const;
</script>

<template>
  <ProductPageShell
    :alternate-hreflang="content.locale === 'en' ? 'zh-CN' : 'en'"
    :alternate-label="content.alternateLabel"
    :alternate-path="content.alternatePath"
    :copyright="content.footer.copyright"
    :footer-links="footerLinks"
    :home-href="routes.home"
    :home-label="content.nav.home"
  >
    <section class="section">
      <div class="container">
        <div class="section-head privacy-head">
          <p class="section-kicker">{{ content.hero.kicker }}</p>
          <h1 class="section-title">{{ content.hero.title }}</h1>
          <p class="section-subtitle">{{ content.hero.subtitle }}</p>
          <p class="privacy-updated">{{ content.hero.updated }}</p>
        </div>
        <div class="privacy-list">
          <article
            v-for="section in content.sections"
            :key="section.heading"
            class="privacy-item"
          >
            <h2>{{ section.heading }}</h2>
            <p v-for="(paragraph, index) in section.paragraphs" :key="index">
              {{ paragraph }}
            </p>
          </article>
        </div>
      </div>
    </section>
  </ProductPageShell>
</template>
