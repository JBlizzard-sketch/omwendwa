import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { SITE_URL, abs } from "@/lib/structuredData";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  type?: string;
  image?: string;
  noindex?: boolean;
}

const SITE_NAME = "O. Mwendwa & Company Advocates";
const SHORT_NAME = "O. Mwendwa Advocates";

/** Keep the rendered title within the ~60 character window search results show. */
const buildTitle = (title: string) => {
  const clean = title.trim().replace(/\s*[|—-]\s*O\. Mwendwa.*$/i, "");
  const withFull = `${clean} | ${SITE_NAME}`;
  if (withFull.length <= 60) return withFull;
  const withShort = `${clean} | ${SHORT_NAME}`;
  if (withShort.length <= 60) return withShort;
  return clean.length <= 60 ? clean : `${clean.slice(0, 57).trimEnd()}…`;
};

/** Meta descriptions render best between 50 and 160 characters. */
const trimDescription = (description: string) => {
  const clean = description.trim().replace(/\s+/g, " ");
  if (clean.length <= 160) return clean;
  const cut = clean.slice(0, 157);
  const lastStop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(" "));
  return `${cut.slice(0, lastStop > 80 ? lastStop : 157).trimEnd()}…`;
};

const SEOHead = ({ title, description, canonical, type = "website", image, noindex }: SEOHeadProps) => {
  const { pathname } = useLocation();
  const fullTitle = buildTitle(title);
  const metaDescription = trimDescription(description);
  const canonicalUrl = canonical ? abs(canonical) : `${SITE_URL}${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`;
  const imageUrl = abs(image || "/og-image.jpg");

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content="en_KE" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default SEOHead;
