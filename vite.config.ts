import { fileURLToPath, URL } from 'node:url';

import { existsSync } from 'node:fs';
import path from 'node:path';
import type { ServerResponse } from 'node:http';

import vue from '@vitejs/plugin-vue';
import { defineConfig, type Connect, type Plugin } from 'vite';

/**
 * Redirects extension-less directory paths to their trailing-slash form
 * (e.g. /algopdf -> /algopdf/), mirroring the 301 behaviour of static
 * hosts in production. Without it the dev/preview SPA fallback serves
 * the root index.html for multi-page entries.
 */
function directoryTrailingSlashRedirect(): Plugin {
  function middleware(getBaseDir: () => string) {
    return (
      req: Connect.IncomingMessage,
      res: ServerResponse,
      next: Connect.NextFunction,
    ): void => {
      const method = req.method ?? 'GET';
      if (method !== 'GET' && method !== 'HEAD') return next();

      let url: URL;
      try {
        url = new URL(req.url ?? '/', 'http://localhost');
      } catch {
        return next();
      }

      const { pathname } = url;
      if (pathname.endsWith('/') || path.posix.extname(pathname) !== '')
        return next();

      if (!existsSync(path.join(getBaseDir(), pathname, 'index.html')))
        return next();

      res.statusCode = 301;
      res.setHeader('Location', `${pathname}/${url.search}`);
      res.end();
    };
  }

  return {
    name: 'directory-trailing-slash-redirect',
    configureServer(server) {
      server.middlewares.use(middleware(() => server.config.root));
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware(() => server.config.build.outDir));
    },
  };
}

function getBasePath(): string {
  const configuredBasePath = process.env.VITE_BASE_PATH?.trim();

  if (!configuredBasePath || configuredBasePath === '/') return '/';

  return `/${configuredBasePath.replace(/^\/+|\/+$/g, '')}/`;
}

export default defineConfig({
  base: getBasePath(),
  plugins: [vue(), directoryTrailingSlashRedirect()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(
        new URL('./src/components', import.meta.url),
      ),
      '@composables': fileURLToPath(
        new URL('./src/composables', import.meta.url),
      ),
      '@data': fileURLToPath(new URL('./src/data', import.meta.url)),
      '@docs': fileURLToPath(new URL('./src/docs', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: {
        zh: fileURLToPath(new URL('./index.html', import.meta.url)),
        en: fileURLToPath(new URL('./en/index.html', import.meta.url)),
        docs: fileURLToPath(new URL('./docs/index.html', import.meta.url)),
        enDocs: fileURLToPath(new URL('./en/docs/index.html', import.meta.url)),
        docsAlgocode: fileURLToPath(
          new URL('./docs/algocode/index.html', import.meta.url),
        ),
        enDocsAlgocode: fileURLToPath(
          new URL('./en/docs/algocode/index.html', import.meta.url),
        ),
        docsAugurTerm: fileURLToPath(
          new URL('./docs/augur-term/index.html', import.meta.url),
        ),
        enDocsAugurTerm: fileURLToPath(
          new URL('./en/docs/augur-term/index.html', import.meta.url),
        ),
        docsAlgoTerm: fileURLToPath(
          new URL('./docs/algoterm/index.html', import.meta.url),
        ),
        enDocsAlgoTerm: fileURLToPath(
          new URL('./en/docs/algoterm/index.html', import.meta.url),
        ),
        docsAugurGit: fileURLToPath(
          new URL('./docs/augur-git/index.html', import.meta.url),
        ),
        enDocsAugurGit: fileURLToPath(
          new URL('./en/docs/augur-git/index.html', import.meta.url),
        ),
        augurGitZh: fileURLToPath(
          new URL('./augur-git/index.html', import.meta.url),
        ),
        augurGitEn: fileURLToPath(
          new URL('./en/augur-git/index.html', import.meta.url),
        ),
        pdfZh: fileURLToPath(new URL('./algopdf/index.html', import.meta.url)),
        pdfEn: fileURLToPath(
          new URL('./en/algopdf/index.html', import.meta.url),
        ),
        privacyZh: fileURLToPath(
          new URL('./algopdf/privacy/index.html', import.meta.url),
        ),
        privacyEn: fileURLToPath(
          new URL('./en/algopdf/privacy/index.html', import.meta.url),
        ),
        privacySiteZh: fileURLToPath(
          new URL('./privacy/index.html', import.meta.url),
        ),
        privacySiteEn: fileURLToPath(
          new URL('./en/privacy/index.html', import.meta.url),
        ),
      },
    },
  },
});
