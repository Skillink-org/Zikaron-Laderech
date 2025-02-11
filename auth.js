import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getUserByEmail, createUser } from "./server/service/user.service";
import CredentialsProvider from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await getUserByEmail(credentials.email);
        if (!user) {
          throw new Error("User Not Found");
        }
        const isMatch = credentials.password == user.password;
        if (!isMatch) {
          throw new Error("Invalid password");
        }
        return user;
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        let existingUser = await getUserByEmail(user.email);
        if (!existingUser) {
          existingUser = await createUser({
            email: user.email,
            firstName: user.name.split(" ")[0],
            lastName: user.name.split(" ")[1] || "",
            role: "user",
          });
        }
        user.id = existingUser.id;
        user.role = existingUser.role;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName || user.name?.split(" ")[0];
        token.lastName = user.lastName || user.name?.split(" ")[1] || "";
        token.image = user.image;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.image = token.image;
      session.user.role = token.role;
      return session;
    },
  },
});