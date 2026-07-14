from pathlib import Path
from playwright.sync_api import sync_playwright

output = Path("artifacts")
output.mkdir(exist_ok=True)
console_errors: list[str] = []

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)

    desktop = browser.new_page(viewport={"width": 1440, "height": 1080})
    desktop.on("console", lambda message: console_errors.append(message.text) if message.type == "error" else None)
    desktop.goto("http://localhost:3107/login")
    desktop.wait_for_load_state("networkidle")
    desktop.get_by_role("button", name="Proprietário").click()
    desktop.wait_for_url("**/painel")
    desktop.wait_for_load_state("networkidle")
    desktop.screenshot(path=output / "dashboard-desktop.png", full_page=True)

    mobile = browser.new_page(viewport={"width": 390, "height": 844})
    mobile.on("console", lambda message: console_errors.append(message.text) if message.type == "error" else None)
    mobile.goto("http://localhost:3107/barbearia/as-barber-club/agendar")
    mobile.wait_for_load_state("networkidle")
    mobile.screenshot(path=output / "booking-mobile.png", full_page=True)

    browser.close()

if console_errors:
    raise RuntimeError("Browser console errors: " + " | ".join(console_errors))

print("Visual QA complete: dashboard-desktop.png, booking-mobile.png")

