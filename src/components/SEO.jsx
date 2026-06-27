import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { buildTitle, DEFAULT_OG_IMAGE, getSiteUrl } from "../config/seo";

const upsertMeta = (attr, key, content) => {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const upsertLink = (rel, href) => {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const upsertJsonLd = (data) => {
  const id = "seo-jsonld";
  let el = document.getElementById(id);
  if (!data) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
};

const SEO = ({
  title,
  description,
  keywords,
  pathname,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noindex = false,
  jsonLd,
}) => {
  const location = useLocation();
  const path = pathname ?? location.pathname;
  const siteUrl = getSiteUrl();
  const canonical = `${siteUrl}${path === "/" ? "" : path}`;
  const fullTitle = buildTitle(title);
  const image = ogImage?.startsWith("http") ? ogImage : `${siteUrl}${ogImage || DEFAULT_OG_IMAGE}`;
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    document.title = fullTitle;

    upsertMeta("name", "description", description);
    upsertMeta("name", "keywords", keywords);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    upsertMeta("name", "googlebot", noindex ? "noindex, nofollow" : "index, follow");

    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", ogType);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:locale", "en_IN");
    upsertMeta("property", "og:site_name", "BudgetCarHub");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);

    upsertLink("canonical", canonical);
    upsertJsonLd(jsonLd);

    return () => {
      document.getElementById("seo-jsonld")?.remove();
    };
  }, [fullTitle, description, keywords, canonical, image, ogType, noindex, jsonLdKey]);

  return null;
};

export default SEO;
