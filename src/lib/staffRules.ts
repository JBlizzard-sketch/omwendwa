export const staffRoles = ["admin", "editor", "assistant"] as const;
export type StaffRole = typeof staffRoles[number];
export const enquiryStatuses = ["new", "contacted", "converted", "closed"] as const;
export const bookingStatuses = ["pending", "confirmed", "cancelled", "completed"] as const;
export function canManageRecords(roles: readonly string[]) {
  return roles.includes("admin") || roles.includes("assistant");
}
export function canReadActivity(roles: readonly string[]) {
  return roles.includes("admin");
}