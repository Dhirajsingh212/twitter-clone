import prisma from "@/db/db";
import bcrypt from "bcrypt";
import { importJWK, JWTPayload, SignJWT } from "jose";
import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const generateJWT = async (payload: JWTPayload) => {
  const secret = process.env.JWT_SECRET || "Secr3t";

  const jwk = await importJWK({ k: secret, alg: "HS256", kty: "oct" });

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("365d")
    .sign(jwk);

  return jwt;
};

interface user {
  id: string;
  email: string;
  token: string;
}

interface token extends JWT {
  uid: string;
  jwtToken: string;
}

export interface session extends Session {
  user: {
    id: string;
    jwtToken: string;
    role: string;
    email: string;
  };
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials: any): Promise<user | null> {
        try {
          console.log(credentials);
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const userDb = await prisma?.user.findFirst({
            where: {
              email: credentials.email,
            },
            select: {
              password: true,
              id: true,
            },
          });
          console.log(userDb);
          console.log("reached 0");
          if (userDb && userDb.password) {
            if (
              !(await bcrypt.compare(credentials.password, userDb.password))
            ) {
              return null;
            }
            const jwt = await generateJWT({
              id: userDb.id,
            });

            console.log("reached 1");
            return {
              id: JSON.stringify(userDb.id),
              email: credentials.email,
              token: jwt,
            };
          } else {
            console.log("NOT IN DB");
            const newUser = await prisma.user.create({
              data: {
                username: credentials.username,
                email: credentials.email,
                password: hashedPassword,
              },
            });
            const jwt = await generateJWT({
              id: newUser.id,
            });

            return {
              id: JSON.stringify(newUser.id),
              email: credentials.email,
              token: jwt,
            };
          }
        } catch (err) {
          console.log(err);
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "Secr3t",
  callbacks: {
    session: async ({ session, token }) => {
      const newSession: session = session as session;
      if (newSession.user && token.uid) {
        newSession.user.id = token.uid as string;
        newSession.user.jwtToken = token.jwtToken as string;
      }
      return newSession!;
    },
    jwt: async ({ token, user }): Promise<JWT> => {
      const newToken: token = token as token;

      if (user) {
        newToken.uid = user.id;
        newToken.jwtToken = (user as user).token;
      }
      return newToken;
    },
  },
  pages: {
    signIn: "/signup",
  },
});
