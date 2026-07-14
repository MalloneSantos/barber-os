import { expect, test } from "@playwright/test";

test("owner signs in and sees the live dashboard", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Proprietário" }).click();
  await expect(page).toHaveURL(/\/painel$/);
  await expect(page.getByRole("heading", { name: /Bom dia, Alexandre/ })).toBeVisible();
  await expect(page.getByText("Impacto gerado")).toBeVisible();
});

test("customer completes the booking and mock deposit flow", async ({ page }) => {
  await page.goto("/barbearia/as-barber-club/agendar");
  for (let step = 0; step < 4; step += 1) {
    await page.getByRole("button", { name: /Continuar/ }).click();
  }
  await page.getByRole("button", { name: /Pagar € 5/ }).click();
  await expect(page.getByRole("heading", { name: "Sua cadeira está reservada." })).toBeVisible();
  await expect(page.getByText("Sinal pago")).toBeVisible();
});

