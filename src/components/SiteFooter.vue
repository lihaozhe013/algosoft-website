<script setup lang="ts">
import { computed } from 'vue';

import BrandLogo from '@components/BrandLogo.vue';
import { getSiteRoutes, withBase } from '@composables/useSiteRoutes';
import type { SiteContent } from '@/types/content';

const props = defineProps<{ content: SiteContent }>();
const routes = computed(() => getSiteRoutes(props.content.locale));
const privacyPath = computed(() =>
  withBase(props.content.locale === 'en' ? '/en/privacy/' : '/privacy/'),
);
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <BrandLogo :href="routes.home" />
      <p class="footer-tagline">{{ props.content.footer.tagline }}</p>
      <nav
        class="footer-links"
        :aria-label="props.content.footer.navigationLabel"
      >
        <a :href="routes.products">{{ props.content.navigation.products }}</a>
        <a :href="routes.faq">{{ props.content.navigation.faq }}</a>
        <a :href="routes.about">{{ props.content.navigation.about }}</a>
        <a :href="routes.docs">{{ props.content.navigation.docs }}</a>
        <a href="https://algocode.cc" target="_blank" rel="noopener"
          >AlgoCode</a
        >
        <a :href="privacyPath">
          {{
            props.content.locale === 'en' ? 'Website privacy' : '网站隐私说明'
          }}
        </a>
        <a href="mailto:5266917@qq.com">5266917@qq.com</a>
      </nav>
      <p class="footer-copy">
        {{ props.content.footer.copyright }} ·
        <a class="domain" href="https://algosoft.cc">algosoft.cc</a>
      </p>
    </div>
  </footer>
</template>
