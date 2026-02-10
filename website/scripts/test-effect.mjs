import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

const logs = [];
page.on("console", (msg) => {
  if (msg.text().includes("[PROBLEM]") || msg.text().includes("[REVEAL]"))
    logs.push(msg.text());
});

await page.goto("http://localhost:3000", {
  waitUntil: "networkidle",
  timeout: 30000,
});
await page.waitForTimeout(3000);

console.log("Relevant logs:", logs.length);
logs.forEach((l) => console.log(" ", l));

// Check if Problem's elements got revealed
const problemRevealed = await page.evaluate(() => {
  const sections = document.querySelectorAll("section");
  const results = [];
  sections.forEach((s, i) => {
    const revealed = s.querySelectorAll(".revealed").length;
    const total = s.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    ).length;
    if (total > 0 || revealed > 0) {
      results.push({ section: i, total, revealed });
    }
  });
  return results;
});
console.log("Section results:", JSON.stringify(problemRevealed, null, 2));

await browser.close();
