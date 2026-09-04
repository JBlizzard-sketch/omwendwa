import { Helmet } from "react-helmet-async";

interface JsonLdProps {
  /** One schema object or an array of them. */
  data: Record<string, unknown> | Record<string, unknown>[];
}

const strip = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(strip).filter((v) => v !== undefined);
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      const cleaned = strip(v);
      if (cleaned !== undefined && cleaned !== null && cleaned !== "") out[k] = cleaned;
    }
    return out;
  }
  return value;
};

const JsonLd = ({ data }: JsonLdProps) => {
  const payload = Array.isArray(data) ? data.map(strip) : strip(data);
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(payload)}</script>
    </Helmet>
  );
};

export default JsonLd;
