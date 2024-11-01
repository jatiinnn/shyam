import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from 'bcrypt';
import { MongooseError } from "mongoose";

// Define a custom user type
type CustomUser = {
  _id: string;
  email: string;
  password: string;
//   name: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
    //   name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }
      
        try {
          await connectToDatabase();
          const user = await User.findOne({ email: credentials.email }) as CustomUser | null;
      
          if (!user) {
            console.log("User not found");
            return null;
          }
      
          console.log("Stored password hash:", user.password); // Debug line
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          console.log("Password valid:", isPasswordValid); // Debug line
      
          if (!isPasswordValid) {
            console.log("Invalid password");
            return null;
          }
      
          console.log("Authentication successful");
          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {
          console.error("Error during authentication:", error);
          if (error instanceof MongooseError) {
            console.error("Mongoose error:", error.message);
          }
          return null;
        }
      }
      
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth"
  },
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);
