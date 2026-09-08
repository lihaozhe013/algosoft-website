type AnalyticsEventType = 'page_view' | 'download';

interface AnalyticsEvent {
  id: string;
  type: AnalyticsEventType;
  path: string;
  target?: string;
}

let started = false;

function endpoint(): string | null {
  const value = import.meta.env.VITE_ANALYTICS_ENDPOINT?.trim();
  return value || null;
}

function createEventId(): string {
  const cryptoApi = globalThis.crypto;
  if (cryptoApi && typeof cryptoApi.randomUUID === 'function') {
    return cryptoApi.randomUUID();
  }

  const bytes = new Uint8Array(16);
  if (cryptoApi?.getRandomValues) {
    cryptoApi.getRandomValues(bytes);
  } else {
    for (let index = 0; index < bytes.length; index += 1) {
      bytes[index] = Math.floor(Math.random() * 256);
    }
  }
  bytes[6] = ((bytes[6] ?? 0) & 0x0f) | 0x40;
  bytes[8] = ((bytes[8] ?? 0) & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0'));
  return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex.slice(6, 8).join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10).join('')}`;
}

function sitePath(pathname: string): string {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (
    basePath &&
    (pathname === basePath || pathname.startsWith(`${basePath}/`))
  ) {
    pathname = pathname.slice(basePath.length) || '/';
  }
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

function targetPath(url: URL): string {
  if (url.origin === window.location.origin) {
    return sitePath(url.pathname);
  }
  return `${url.origin}${url.pathname}`;
}

function sendEvent(
  type: AnalyticsEventType,
  path: string,
  target?: string,
): void {
  const collector = endpoint();
  if (!collector) return;

  const event: AnalyticsEvent = {
    id: createEventId(),
    type,
    path,
    ...(target ? { target } : {}),
  };
  const body = JSON.stringify(event);
  const beaconBody = new Blob([body], { type: 'text/plain;charset=UTF-8' });

  try {
    if (navigator.sendBeacon?.(collector, beaconBody)) return;
  } catch {
    // Analytics failures must never affect navigation or downloads.
  }

  void fetch(collector, {
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body,
    keepalive: true,
  }).catch(() => undefined);
}

function isDownload(anchor: HTMLAnchorElement, url: URL): boolean {
  return (
    anchor.hasAttribute('download') ||
    sitePath(url.pathname).startsWith('/downloads/')
  );
}

function handleClick(event: MouseEvent): void {
  if (event.defaultPrevented || event.button !== 0) return;
  if (!(event.target instanceof Element)) return;

  const anchor = event.target.closest('a[href]');
  if (!(anchor instanceof HTMLAnchorElement)) return;

  let url: URL;
  try {
    url = new URL(anchor.href, window.location.href);
  } catch {
    return;
  }

  if (isDownload(anchor, url)) {
    sendEvent('download', sitePath(window.location.pathname), targetPath(url));
  }
}

export function startAnalytics(): void {
  if (started || !endpoint()) return;
  started = true;
  sendEvent('page_view', sitePath(window.location.pathname));
  document.addEventListener('click', handleClick, true);
}
