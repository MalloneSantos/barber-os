import { demoAccounts } from "@/data/demo";

export function authenticateDemoAccount(email: string, password: string) {
  if (password !== "demo123") return null;
  return demoAccounts.find((account) => account.email === email.toLowerCase()) ?? null;
}

