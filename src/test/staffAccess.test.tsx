import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  staff: { loading: false, user: null as { id: string } | null, roles: [] as string[], error: "" },
  from: vi.fn(),
}));
vi.mock("@/hooks/use-staff", () => ({ useStaff: () => mocks.staff }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from: mocks.from, auth: { signOut: vi.fn() } } }));
vi.mock("@/components/SEOHead", () => ({ default: () => null }));
import StaffWorkspace from "@/pages/StaffWorkspace";

function openWorkspace() {
  render(<MemoryRouter initialEntries={["/staff"]}><Routes>
    <Route path="/staff" element={<StaffWorkspace />} />
    <Route path="/staff/login" element={<h1>Sign in</h1>} />
  </Routes></MemoryRouter>);
}

afterEach(() => { cleanup(); mocks.from.mockClear(); });

describe("private staff access", () => {
  it("sends signed-out visitors to sign-in without requesting firm records", () => {
    mocks.staff = { loading: false, user: null, roles: [], error: "" };
    openWorkspace();
    expect(screen.getByRole("heading", { name: "Sign in" })).toBeInTheDocument();
    expect(mocks.from).not.toHaveBeenCalled();
  });

  it("does not request firm records for a signed-in account without an assigned role", () => {
    mocks.staff = { loading: false, user: { id: "unassigned-account" }, roles: [], error: "" };
    openWorkspace();
    expect(screen.getByRole("heading", { name: "Access not assigned" })).toBeInTheDocument();
    expect(mocks.from).not.toHaveBeenCalled();
  });

  it("does not request firm records while access is still being checked", () => {
    mocks.staff = { loading: true, user: null, roles: [], error: "" };
    openWorkspace();
    expect(screen.getByRole("status")).toHaveTextContent("Checking secure staff access");
    expect(mocks.from).not.toHaveBeenCalled();
  });
});