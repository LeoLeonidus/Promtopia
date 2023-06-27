import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'

import { connectToDB } from "@utils/database";

import User from "@models/user";
/*
console.log({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
});
*/
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({session}) {
            console.log("route.js session---------");
            const sessionUser = await User.findOne({
                email: session.user.email
            })
    
            session.user.id = sessionUser._id.toString();
    
            return session;
    
        },
        async signIn({profile}) {

            try {
                console.log("route.js signIn---------");
                //console.log("profile=",profile);
                await connectToDB()
    
                // check if user exist
                const userExist = await User.findOne({
                    email: profile.email
                })
                // if not create
                let userData = {}
                if (!userExist) {
                    if ( !profile.name ) {
                        // GitHub
                        userData = {
                            email: profile.email,
                            username: profile.login,
                            image: profile.avatar_url
                        } 
                    } else {
                        // Google
                        userData = {
                            email: profile.email,
                            username: profile.name.replace(" ","").toLowerCase(),
                            image: profile.picture 
                        }
                    }
                await User.create(userData)

                }  
    
                return true
    
            } catch (err) {
                console.log("connectToDB KO ! error=",err);
                return false;
            }
        }
    }
    
})

export { handler as GET , handler as POST}