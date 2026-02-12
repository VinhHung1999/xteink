export function formatOrderNumber(seq: number, date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const num = String(seq).padStart(4, "0");
  return `XT-${y}${m}${d}-${num}`;
}
