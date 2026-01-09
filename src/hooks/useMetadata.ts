import { useEffect } from 'react';

interface MetadataOptions {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogImage?: string;
  favicon?: string;
}

export function useMetadata({
  title,
  description,
  keywords,
  ogTitle,
  ogImage,
  favicon,
}: MetadataOptions) {
  useEffect(() => {
    const setMetaTag = (
      key: string,
      content: string | undefined,
      attribute: 'name' | 'property'
    ) => {
      const fallbackAttribute = attribute === 'name' ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!meta) {
        meta = document.querySelector(`meta[${fallbackAttribute}="${key}"]`);
      }
      if (!content) {
        meta?.remove();
        return;
      }
      if (!meta) {
        meta = document.createElement('meta');
        document.head.appendChild(meta);
      }
      meta.setAttribute(attribute, key);
      meta.removeAttribute(fallbackAttribute);
      meta.setAttribute('content', content);
    };

    if (title) document.title = title;
    setMetaTag('description', description, 'name');
    setMetaTag('keywords', keywords, 'name');
    setMetaTag('og:title', ogTitle, 'property');
    setMetaTag('og:image', ogImage, 'property');

    if (favicon) {
      let link: HTMLLinkElement | null = document.querySelector('link[rel="icon"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/png';
        document.head.appendChild(link);
      }
      link.href = favicon;
    }
  }, [title, description, keywords, ogTitle, ogImage, favicon]);
}
