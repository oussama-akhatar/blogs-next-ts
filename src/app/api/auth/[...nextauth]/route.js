import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),

    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        try {
          const usersResponse = await fetch('http://localhost:9900/users');
          const users = await usersResponse.json();

          const user = users.find(u => u.email === credentials.email);

          if (user) {
            const isPasswordCorrect = credentials.password === user.password;

            if (isPasswordCorrect) {
              return user
            } else {
              throw new Error("Wrong Credentials !")
            }
          } else {
            throw new Error("User not found !")
          }

        } catch (error) {
          console.log(credentials);
          throw new Error("An error occurred during authentication.");
        }
      },
    })
  ]
})

export { handler as GET, handler as POST }