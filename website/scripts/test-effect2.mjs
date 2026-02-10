import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

// Capture ALL console messages
page.on("console", (msg) => {
  console.log("[BROWSER " + msg.type() + "]", msg.text().slice(0, 300));
});
page.on("pageerror", (e) => {
  console.log("[PAGE ERROR]", e.message.slice(0, 300));
});

await page.goto("http://localhost:3000", {
  waitUntil: "networkidle",
  timeout: 30000,
});

// Wait longer
await page.waitForTimeout(5000);

// Try to manually test if React effects are running at all
// by injecting a temporary component-like effect
const effectCheck = await page.evaluate(() => {
  // Check if React is in the global scope
  const hasReact = typeof window.__NEXT_LOADED_CHUNKS__ !== "undefined";
  const hasNextF = typeof window.__next_f !== "undefined";

  // Try to find any React internal state
  const rootEl = document.body.firstElementChild;
  const allKeys = rootEl ? Object.getOwnPropertyNames(rootEl) : [];
  const reactLike = allKeys.filter(
    (k) => k.includes("react") || k.includes("fiber") || k.startsWith("__")
  );

  // Check if the Problem component's useEffect ran by looking for side effects
  // Our useEffect adds "revealed" class, so check if it's there
  const problemSection = document.querySelectorAll("section")[1];
  const problemHTML = problemSection
    ? problemSection.innerHTML.slice(0, 200)
    : "no section";

  return {
    hasLoadedChunks: hasReact,
    hasNextF: hasNextF,
    reactLikeKeys: reactLike.slice(0, 5),
    problemHTML,
    // Check if ANY useEffect has run anywhere
    documentTitle: document.title,
  };
});
console.log("\nEffect check:", JSON.stringify(effectCheck, null, 2));

await browser.close();
