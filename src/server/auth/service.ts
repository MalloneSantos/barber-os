import { compare } from "bcryptjs";

import type { Role } from "@/domain/auth/permissions";

type TenantMembership = {
  tenantId: string;
  role: Role;
  isActive: boolean;
  tenant: {
    name: string;
    slug: string;
    deletedAt: Date | null;
  };
};

export type AuthenticationCandidate = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string | null;
  memberships: TenantMembership[];
};

export type AuthenticatedIdentity = {
  userId: string;
  tenantId: string;
  email: string;
  name: string;
  role: Role;
  tenantName: string;
  tenantSlug: string;
};

export type StoredSessionRecord = {
  id: string;
  sessionToken: string;
  tenantId: string;
  expires: Date;
  user: Omit<AuthenticationCandidate, "passwordHash">;
};

export async function authenticateCandidate(
  credentials: { email: string; password: string },
  candidate: AuthenticationCandidate | null,
): Promise<AuthenticatedIdentity | null> {
  if (!candidate?.passwordHash) return null;
  if (candidate.email.toLowerCase() !== credentials.email.trim().toLowerCase()) return null;
  if (!(await compare(credentials.password, candidate.passwordHash))) return null;

  const membership = candidate.memberships.find(
    (item) => item.isActive && item.tenant.deletedAt === null,
  );
  if (!membership) return null;

  return {
    userId: candidate.id,
    tenantId: membership.tenantId,
    email: candidate.email,
    name: `${candidate.firstName} ${candidate.lastName}`.trim(),
    role: membership.role,
    tenantName: membership.tenant.name,
    tenantSlug: membership.tenant.slug,
  };
}

export function sessionFromRecord(
  record: StoredSessionRecord | null,
  now = new Date(),
): AuthenticatedIdentity | null {
  if (!record || record.expires <= now) return null;

  const membership = record.user.memberships.find(
    (item) =>
      item.tenantId === record.tenantId &&
      item.isActive &&
      item.tenant.deletedAt === null,
  );
  if (!membership) return null;

  return {
    userId: record.user.id,
    tenantId: membership.tenantId,
    email: record.user.email,
    name: `${record.user.firstName} ${record.user.lastName}`.trim(),
    role: membership.role,
    tenantName: membership.tenant.name,
    tenantSlug: membership.tenant.slug,
  };
}
