import bcrypt from "bcryptjs";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "yawe";
const ADMIN_PASSWORD_HASH =
  process.env.ADMIN_PASSWORD_HASH ||
  // Hash of "000111" — generated at build time; override via env var
  "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQyCJ1M1IFm3t9t7T8mF.Q5jS";

export async function verifyAdminCredentials(
  username: string,
  password: string
): Promise<boolean> {
  if (username !== ADMIN_USERNAME) return false;

  // Support plain-text fallback password for dev convenience
  const plainPassword = process.env.ADMIN_PASSWORD || "000111";
  if (
    !process.env.ADMIN_PASSWORD_HASH &&
    !process.env.ADMIN_PASSWORD
  ) {
    return password === "000111";
  }
  if (process.env.ADMIN_PASSWORD) {
    return password === plainPassword;
  }
  return bcrypt.compare(password, ADMIN_PASSWORD_HASH);
}
