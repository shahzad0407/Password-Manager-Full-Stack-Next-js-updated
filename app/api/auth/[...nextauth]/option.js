import dbconnect from "@/dbconnection/dbConnect";
import { user } from "@/model/user";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";


const authOption = {
    session:{
        strategy:"jwt"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { email, password } = credentials
                dbconnect()
                const userModel = await user.findOne({ email })
                if (!userModel) {
                    // Any object returned will be saved in `user` property of the JWT
                    throw new error("User does not exist")
                }
                const isPasswordCorrect = await bcrypt.compare(password, userModel.password)
                if (isPasswordCorrect) {
                    return userModel
                }
            }
        })
    ],
    pages:{
        signIn:"/login"
    },
    callbacks:{
        async jwt({ token, user }) {
          if (user) {
            token._id=user._id
            token.firstName = user.firstName
            token.lastName = user.lastName
            token.email = user.email
            token.phoneNumber = user.phoneNumber

          }
          return token
        },
        async session({ session, token }) {
          session.user.firstName = token.firstName
          session.user.lastName = token.lastName
          session.user.email = token.email
          session.user._id = token._id
          session.user.phoneNumber = token.phoneNumber
          return session
        }
      }
}
export default authOption