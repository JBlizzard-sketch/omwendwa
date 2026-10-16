import { describe, expect, it } from "vitest";
import { staffRoles, canManageRecords, canReadActivity } from "@/lib/staffRules";

describe("invited staff permissions", () => {
  it("supports the three agreed staff roles", () => {
    expect(staffRoles).toEqual(["admin", "editor", "assistant"]);
  });
  it("does not grant record management to an unassigned account", () => {
    expect(canManageRecords([])).toBe(false);
  });
  it("allows admin and assistant to manage enquiries, but not editors", () => {
    expect(canManageRecords(["admin"])).toBe(true);
    expect(canManageRecords(["assistant"])).toBe(true);
    expect(canManageRecords(["editor"])).toBe(false);
  });
  it("reserves activity history for administrators", () => {
    expect(canReadActivity(["admin"])).toBe(true);
    expect(canReadActivity(["assistant", "editor"])).toBe(false);
    expect(canReadActivity([])).toBe(false);
  });
});