import bcrypt from "bcryptjs";
import { importJWK, jwtVerify } from "jose";

export const verifyJWT = async (token: string, secret: any) => {
  try {
    const jwk = await importJWK({ k: secret, alg: "HS256", kty: "oct" });

    const { payload } = await jwtVerify(token, jwk, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    throw new Error("Token verification failed");
  }
};

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
