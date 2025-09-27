import { useEffect } from "react";

export default function useSEO({ title, description, keywords, image }) {
  useEffect(() => {
    // Set document title
    if (title) {
      document.title = title;
    }

    // Helper: update or create a meta tag
    const setMeta = (attrName, attrValue, content) => {
      if (!content) return;
      let tag = document.querySelector(`meta[${attrName}='${attrValue}']`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attrName, attrValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    // Basic SEO tags
    setMeta("name", "description", description);
    setMeta("name", "keywords", keywords);

    // Open Graph (for social sharing)
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", image);

    // Twitter card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);
  }, [title, description, keywords, image]);
}
