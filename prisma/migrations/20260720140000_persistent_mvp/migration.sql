-- Persist the active tenant in each opaque session.
ALTER TABLE "Session" ADD COLUMN "tenantId" TEXT;

UPDATE "Session" AS session
SET "tenantId" = (
  SELECT "tenantId"
  FROM "Membership"
  WHERE "userId" = session."userId" AND "isActive" = true
  ORDER BY "createdAt" ASC
  LIMIT 1
);

-- Legacy sessions without an active membership cannot be authorized safely.
DELETE FROM "Session" WHERE "tenantId" IS NULL;

ALTER TABLE "Session" ALTER COLUMN "tenantId" SET NOT NULL;
DROP INDEX IF EXISTS "Session_userId_idx";
CREATE INDEX "Session_userId_expires_idx" ON "Session"("userId", "expires");
CREATE INDEX "Session_tenantId_expires_idx" ON "Session"("tenantId", "expires");
ALTER TABLE "Session" ADD CONSTRAINT "Session_tenantId_fkey"
  FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- PostgreSQL enforces the booking conflict rule even under concurrent requests.
CREATE EXTENSION IF NOT EXISTS btree_gist;
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_staff_active_time_excl"
  EXCLUDE USING gist (
    "staffId" WITH =,
    tstzrange("startsAt", "endsAt", '[)') WITH &&
  )
  WHERE (
    "deletedAt" IS NULL AND
    "status" IN ('PENDING', 'CONFIRMED', 'CHECKED_IN', 'IN_PROGRESS')
  );
