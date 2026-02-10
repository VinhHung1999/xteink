/**
 * Playwright script to audit scroll-reveal behavior on localhost:3000
 *
 * - Opens the page and waits for networkidle
 * - Screenshots the top of the page
 * - Scrolls down 500px at a time (5 times), pausing 1s each time
 * - After each scroll, counts elements with the "revealed" class
 * - Takes a final full-page screenshot
 * - Reports totals for "reveal" class, "revealed" class, and console errors
 */

import { chromium } from "playwright";

const BASE_URL = "http://localhost:3000";
const SCROLL_STEP = 500;
const SCROLL_COUNT = 5;
const PAUSE_MS = 1000;
const SCREENSHOT_DIR = "/Users/phuhung/Documents/Notes/Hung's Notes/Projects/xteink/website/scripts";

(async () => {
  const consoleErrors = [];

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  // Capture console errors
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });
  page.on("pageerror", (err) => {
    consoleErrors.push(err.message);
  });

  console.log(`Opening ${BASE_URL} ...`);
  await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 30000 });
  console.log("Page loaded (networkidle).");

  // Screenshot: top of page
  const topScreenshot = `${SCREENSHOT_DIR}/screenshot-top.png`;
  await page.screenshot({ path: topScreenshot });
  console.log(`Top-of-page screenshot saved: ${topScreenshot}`);

  // Scroll loop
  for (let i = 1; i <= SCROLL_COUNT; i++) {
    await page.evaluate((step) => window.scrollBy(0, step), SCROLL_STEP);
    await page.waitForTimeout(PAUSE_MS);

    const revealedCount = await page.evaluate(() => {
      return document.querySelectorAll(".revealed").length;
    });
    const scrollY = await page.evaluate(() => window.scrollY);
    console.log(
      `Scroll ${i}/${SCROLL_COUNT} -- scrollY: ${scrollY}px -- elements with "revealed" class: ${revealedCount}`
    );
  }

  // Final full-page screenshot
  const fullScreenshot = `${SCREENSHOT_DIR}/screenshot-full.png`;
  await page.screenshot({ path: fullScreenshot, fullPage: true });
  console.log(`Full-page screenshot saved: ${fullScreenshot}`);

  // Final counts
  const totalReveal = await page.evaluate(() => document.querySelectorAll(".reveal").length);
  const totalRevealed = await page.evaluate(() => document.querySelectorAll(".revealed").length);

  console.log("\n===== REPORT =====");
  console.log(`Total elements with "reveal" class:    ${totalReveal}`);
  console.log(`Total elements with "revealed" class:  ${totalRevealed}`);
  console.log(`Console errors captured:               ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    consoleErrors.forEach((err, idx) => {
      console.log(`  [${idx + 1}] ${err}`);
    });
  } else {
    console.log("  (none)");
  }
  console.log("==================\n");

  await browser.close();
})();
