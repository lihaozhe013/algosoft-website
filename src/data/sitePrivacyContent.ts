import { withBase } from '@composables/useSiteRoutes';
import type { Locale, SitePrivacyPageContent } from '@/types/content';

const zhContent: SitePrivacyPageContent = {
  locale: 'zh-CN',
  htmlLang: 'zh-CN',
  alternatePath: withBase('/en/privacy/'),
  alternateLabel: 'EN',
  nav: { home: 'AlgoSoft 首页' },
  hero: {
    kicker: 'AlgoSoft · 网站隐私说明',
    title: '网站统计保持匿名',
    subtitle:
      'AlgoSoft 官网使用自建的第一方统计，用于了解页面浏览和软件下载情况。我们不使用 Cookie，也不建立长期用户画像。',
    updated: '生效日期：2026 年 9 月 8 日',
  },
  sections: [
    {
      heading: '我们收集什么',
      paragraphs: [
        '网站会记录页面浏览和下载事件，包括页面路径、事件类型和接收时间。统计服务会根据访问来源生成每日变化的匿名标识，用于计算近似 UV。',
      ],
    },
    {
      heading: '我们不收集什么',
      paragraphs: [
        '统计脚本不使用 Cookie、持久化用户 ID、User-Agent、完整 Referer、URL 查询参数或 hash。服务器不会把原始 IP 地址写入统计数据库。',
      ],
    },
    {
      heading: '统计用途与保存',
      paragraphs: [
        '这些数据只用于改进网站内容、了解产品页面访问量和下载情况。原始匿名事件暂不自动删除；如果未来流量增长，我们会改用聚合数据或缩短保存期限。',
      ],
    },
    {
      heading: '如何避免统计',
      paragraphs: [
        '如果浏览器禁用 JavaScript、拦截统计请求或网络无法连接统计服务，网站仍可正常使用，相关访问不会进入统计数据。统计请求失败不会阻止页面导航或文件下载。',
      ],
    },
    {
      heading: '联系我们',
      paragraphs: [
        '如果你对网站统计或本说明有疑问，请发送邮件至 5266917@qq.com。',
      ],
    },
  ],
  footer: {
    backHome: '返回 AlgoSoft 首页',
    copyright: '© 2026 AlgoSoft',
  },
};

const enContent: SitePrivacyPageContent = {
  locale: 'en',
  htmlLang: 'en',
  alternatePath: withBase('/privacy/'),
  alternateLabel: '中文',
  nav: { home: 'AlgoSoft home' },
  hero: {
    kicker: 'AlgoSoft · Website Privacy',
    title: 'Website analytics stay anonymous',
    subtitle:
      'The AlgoSoft website uses first-party analytics to understand page views and downloads. We do not use cookies or build long-term user profiles.',
    updated: 'Effective date: September 8, 2026',
  },
  sections: [
    {
      heading: 'What we collect',
      paragraphs: [
        'The website records page-view and download events, including the page path, event type, and received time. The analytics service creates a daily rotating anonymous identifier for approximate unique-visitor counts.',
      ],
    },
    {
      heading: 'What we do not collect',
      paragraphs: [
        'The analytics script does not use cookies, persistent user IDs, User-Agent strings, full referrers, URL query parameters, or URL fragments. The server does not write raw IP addresses to the analytics database.',
      ],
    },
    {
      heading: 'Purpose and retention',
      paragraphs: [
        'The data is used only to improve website content and understand product-page traffic and downloads. Anonymous raw events are not automatically deleted yet; if traffic grows, we will move to aggregate data or shorten retention.',
      ],
    },
    {
      heading: 'How to avoid analytics',
      paragraphs: [
        'If JavaScript is disabled, analytics requests are blocked, or the analytics service is unreachable, the website remains usable and the visit is not recorded. A failed analytics request never blocks navigation or downloads.',
      ],
    },
    {
      heading: 'Contact us',
      paragraphs: [
        'Questions about website analytics or this notice? Email 5266917@qq.com.',
      ],
    },
  ],
  footer: {
    backHome: 'Back to AlgoSoft home',
    copyright: '© 2026 AlgoSoft',
  },
};

export const sitePrivacyContentByLocale: Record<
  Locale,
  SitePrivacyPageContent
> = {
  'zh-CN': zhContent,
  en: enContent,
};

export function getSitePrivacyContent(locale: Locale): SitePrivacyPageContent {
  return sitePrivacyContentByLocale[locale];
}
