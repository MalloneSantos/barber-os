export type Role = "OWNER" | "MANAGER" | "RECEPTIONIST" | "PROFESSIONAL" | "CUSTOMER";

export type Permission =
  | "finance:view"
  | "finance:edit"
  | "appointments:view"
  | "appointments:edit"
  | "customers:view"
  | "customers:edit"
  | "campaigns:create"
  | "team:edit"
  | "commissions:view"
  | "settings:edit";

const rolePermissions: Record<Role, ReadonlySet<Permission>> = {
  OWNER: new Set<Permission>([
    "finance:view",
    "finance:edit",
    "appointments:view",
    "appointments:edit",
    "customers:view",
    "customers:edit",
    "campaigns:create",
    "team:edit",
    "commissions:view",
    "settings:edit",
  ]),
  MANAGER: new Set<Permission>([
    "finance:view",
    "appointments:view",
    "appointments:edit",
    "customers:view",
    "customers:edit",
    "campaigns:create",
    "team:edit",
    "commissions:view",
  ]),
  RECEPTIONIST: new Set<Permission>([
    "appointments:view",
    "appointments:edit",
    "customers:view",
    "customers:edit",
  ]),
  PROFESSIONAL: new Set<Permission>([
    "appointments:view",
    "customers:view",
    "commissions:view",
  ]),
  CUSTOMER: new Set<Permission>(),
};

export function authorize(role: Role, permission: Permission): boolean {
  return rolePermissions[role].has(permission);
}

export function assertTenant(contextTenantId: string, resourceTenantId: string): void {
  if (contextTenantId !== resourceTenantId) throw new Error("TENANT_MISMATCH");
}

