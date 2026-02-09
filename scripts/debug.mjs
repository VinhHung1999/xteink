import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

page.on("console", (msg) =>
  console.log("[BROWSER]", msg.type(), msg.text().slice(0, 200))
);
page.on("pageerror", (e) => console.log("[ERROR]", e.message.slice(0, 200)));

await page.goto("http://localhost:3000", {
  waitUntil: "networkidle",
  timeout: 30000,
});

await page.waitForTimeout(2000);

// Check if Navbar mobile button click works (proves hydration)
const clickTest = await page.evaluate(() => {
  const button = document.querySelector("button");
  if (!button) return "no button found";
  button.click();
  return "clicked: " + button.className.slice(0, 80);
});
console.log("Click test:", clickTest);

await page.waitForTimeout(1000);

// Check for state changes after click (drawer open?)
const drawerCheck = await page.evaluate(() => {
  const drawers = document.querySelectorAll('[class*="translate-x"]');
  return Array.from(drawers).map((d) => d.className.slice(0, 80));
});
console.log("Drawer elements:", JSON.stringify(drawerCheck));

// Check React 19 internal markers
const reactMarkers = await page.evaluate(() => {
  const el = document.body.firstElementChild;
  if (!el) return "no first child";
  return Object.keys(el)
    .filter((k) => k.startsWith("__react") || k.startsWith("$"))
    .slice(0, 10);
});
console.log("React markers on first child:", JSON.stringify(reactMarkers));

// Ultimate test: inject a useEffect-like test
const effectTest = await page.evaluate(() => {
  return new Promise((resolve) => {
    // If React is running, queueMicrotask should show it
    let reactFound = false;
    const origCE = document.createElement.bind(document);
    // Simply check if React's internal scheduler is running
    if (window.__NEXT_DATA__) {
      resolve("has __NEXT_DATA__");
    } else if (window.__next_f) {
      resolve("has __next_f (RSC payload)");
    } else {
      // Check all window properties for Next.js markers
      const nextKeys = Object.keys(window).filter(
        (k) => k.includes("next") || k.includes("NEXT") || k.includes("__N")
      );
      resolve("Next.js window keys: " + nextKeys.join(", "));
    }
  });
});
console.log("Effect test:", effectTest);

await browser.close();
