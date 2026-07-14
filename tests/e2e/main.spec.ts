import { mkdir } from "node:fs/promises";

import { expect, test } from "@playwright/test";

test("public barbershop presents the commercial experience without horizontal overflow", async ({ page }) => {
  await mkdir("artifacts", { recursive: true });
  await page.goto("/barbearia/as-barber-club");
  await expect(page.getByRole("heading", { name: /Corte\. Presença\. Ritual\./ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Seu estilo, bem cuidado\./ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Agendar/ }).first()).toHaveAttribute("href", "/barbearia/as-barber-club/agendar");
  await expect(page.locator("html")).toHaveJSProperty("scrollWidth", await page.locator("html").evaluate((element) => element.clientWidth));
  await page.screenshot({ path: "artifacts/barbershop-desktop.png", fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await expect(page.getByRole("heading", { name: /Corte\. Presença\. Ritual\./ })).toBeVisible();
  const viewportWidth = await page.locator("html").evaluate((element) => element.clientWidth);
  const documentWidth = await page.locator("html").evaluate((element) => element.scrollWidth);
  expect(documentWidth).toBe(viewportWidth);
  await page.screenshot({ path: "artifacts/barbershop-mobile.png", fullPage: true });
});

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
