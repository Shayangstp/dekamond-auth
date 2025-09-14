// lib/validators.ts
export const iranMobileRegex = /^(09\d{9}|0098\d{10}|\+98\d{10})$/;

/**
 * normalizePhone: normalizes accepted formats to E.164-like without '+' (e.g. 98912XXXXXXX)
 * - 09xxxxxxxxx -> 989xxxxxxxxx
 * - 0098xxxxxxxxxx -> 989xxxxxxxxx
 * - +98xxxxxxxxxx -> 98xxxxxxxxx or optionally keep +98...
 */
export function normalizeIranPhone(input: string) {
  let v = input.trim();
  if (v.startsWith("+")) v = v.slice(1); // +98912... -> 98912...
  if (v.startsWith("00")) v = v.slice(2); // 0098912... -> 98912...
  if (v.startsWith("0")) v = "98" + v.slice(1); // 0912... -> 98912...
  return v;
}
