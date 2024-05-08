import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login, loginWithoutCookie } from "@/lib/users";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      // credentials: {
      //   _id: { label: "_id", type: "text", placeholder: "" },
      //   email: { label: "email", type: "email", placeholder: "" },
      //   communityId: { label: "communityId", type: "text", placeholder: "" },
      //   photoURL: { label: "photoURL", type: "text", placeholder: "" },
      // },

      async authorize(credentials: any) {
        const { username, password } = credentials;
        try {
          const user = await login(username, password);
          return user;
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user, session }) {
  //     console.log("jwt callback", { token, user, session });
  //     if (user) {
  //       return {
  //         ...token,
  //         _id: user._id,
  //         username: user.username,
  //         communityId: user.communityId,
  //         photoURL: user.photoURL,
  //       };
  //     }
  //     return token;
  //   },
  //   async session({ session, token, user }) {
  //     console.log("session callback", { session, token, user });
  //     return {
  //       ...session,
  //       user: {
  //         ...session.user,
  //         _id: token._id,
  //         username: token.username,
  //         communityId: token.communityId,
  //         image: token.photoURL,
  //       },
  //     };
  //   },
  // },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};
export default authOptions;
