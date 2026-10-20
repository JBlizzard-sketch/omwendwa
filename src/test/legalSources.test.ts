import { describe, expect, it } from "vitest";
import { selectSources } from "../../supabase/functions/legal-assistant/retrieval";
describe("published article grounding", () => {
  const articles = [{ slug: "land-checks", title: "Buying land", excerpt: "Land due diligence", content: "Check a land title", date: "2026-09-01" }, { slug: "employment", title: "Employment", excerpt: "Workplace rights", content: "Employment contracts", date: "2026-09-02" }];
  it("retrieves relevant published articles for source links", () => { expect(selectSources(articles, "buying land").map(p => p.slug)).toEqual(["land-checks"]); });
  it("does not invent a source for unsupported questions", () => { expect(selectSources(articles, "maritime shipping")).toEqual([]); });
});