import { describe, expect, it } from "vitest";
import { canEditArticles, canPublishArticles, validArticleSlug } from "@/lib/editorialRules";
describe("protected article permissions", () => {
  it("allows admins and editors to draft", () => { expect(canEditArticles(["admin"])).toBe(true); expect(canEditArticles(["editor"])).toBe(true); });
  it("does not allow assistants or unassigned accounts to draft", () => { expect(canEditArticles(["assistant"])).toBe(false); expect(canEditArticles([])).toBe(false); });
  it("reserves publication for administrators", () => { expect(canPublishArticles(["admin"])).toBe(true); expect(canPublishArticles(["editor"])).toBe(false); expect(canPublishArticles(["assistant"])).toBe(false); });
  it("requires stable hyphenated addresses", () => { expect(validArticleSlug("kenyan-law-guide")).toBe(true); expect(validArticleSlug("../../staff")).toBe(false); expect(validArticleSlug("Changing Title!")).toBe(false); });
});