export function generateShortcode() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 6 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

export function validateURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}