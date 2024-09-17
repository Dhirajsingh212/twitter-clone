import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

export function verifyToken(token: string): JwtPayload | string {
  const decoded = jwt.verify(token, process.env.SECRET!);
  return decoded;
}

export async function verifyHashedPassword(
  password: string,
  dbpassword: string
): Promise<boolean> {
  const correct = await bcrypt.compare(password, dbpassword);
  if (correct) {
    return true;
  }
  return false;
}
