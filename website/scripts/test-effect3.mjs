import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

await page.goto("http://localhost:3000", {
  waitUntil: "networkidle",
  timeout: 30000,
});
await page.waitForTimeout(2000);

// Test Navbar's scroll useEffect - it adds shadow class when scrolled > 50
// Scroll down and check if nav gets the scrolled class
const beforeScroll = await page.evaluate(() => {
  const nav = document.querySelector("nav");
  return nav ? nav.className : "no nav";
});
console.log("Nav class before scroll:", beforeScroll.slice(0, 120));

await page.evaluate(() => window.scrollBy(0, 200));
await page.waitForTimeout(500);

const afterScroll = await page.evaluate(() => {
  const nav = document.querySelector("nav");
  return nav ? nav.className : "no nav";
});
console.log("Nav class after scroll:", afterScroll.slice(0, 120));

// Check if the class changed (shadow should appear)
const hasShadow = afterScroll.includes("shadow");
console.log("Navbar useEffect works (scroll detected):", hasShadow);

// Now add a console.log directly to Problem section via evaluate
// to see if we can manually trigger the observer
const manualTest = await page.evaluate(() => {
  const sections = document.querySelectorAll("section");
  // Problem is likely sections[1] (after Hero)
  const problemSection = sections[1];
  if (!problemSection) return "no problem section";

  // Manually add revealed to all children
  let count = 0;
  problemSection
    .querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")
    .forEach((el) => {
      el.classList.add("revealed");
      count++;
    });
  return "Manually revealed " + count + " elements";
});
console.log("Manual reveal:", manualTest);

// Check if they're now visible
const opacity = await page.evaluate(() => {
  const el = document.querySelector(".revealed");
  if (!el) return "no revealed element";
  return getComputedStyle(el).opacity;
});
console.log("Opacity after manual reveal:", opacity);

await page.screenshot({
  path: "/Users/phuhung/Documents/Notes/Hung's Notes/Projects/xteink/website/scripts/after-manual-reveal.png",
  fullPage: false,
});
console.log("Screenshot saved");

await browser.close();
