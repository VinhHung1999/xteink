const FORWARD_TRANSITIONS: Record<string, string[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["SHIPPING", "CANCELLED"],
  SHIPPING: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};

const REVERSE_TRANSITIONS: Record<string, string[]> = {
  PENDING: [],
  CONFIRMED: ["PENDING"],
  SHIPPING: ["CONFIRMED"],
  DELIVERED: ["SHIPPING"],
  CANCELLED: ["PENDING"],
};

export function isValidTransition(from: string, to: string): boolean {
  return (FORWARD_TRANSITIONS[from]?.includes(to) ?? false)
    || (REVERSE_TRANSITIONS[from]?.includes(to) ?? false);
}

export function isReversion(from: string, to: string): boolean {
  return REVERSE_TRANSITIONS[from]?.includes(to) ?? false;
}

export function getForwardTransitions(from: string): string[] {
  return FORWARD_TRANSITIONS[from] ?? [];
}

export function getReverseTransitions(from: string): string[] {
  return REVERSE_TRANSITIONS[from] ?? [];
}
