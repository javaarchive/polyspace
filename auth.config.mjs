import GitHub from '@auth/core/providers/github';
import Discord from '@auth/core/providers/discord';

import { defineConfig } from 'auth-astro';

import { fetch } from "cross-fetch"

const BACKEND_URL = import.meta.env.BACKEND_URL;
const SHARED_SECRET= import.meta.env.SHARED_SECRET;

let providers = [];
if(import.meta.env.DISCORD_CLIENT_ID && import.meta.env.DISCORD_CLIENT_SECRET){
    providers.push(Discord({
        clientId: import.meta.env.DISCORD_CLIENT_ID,
        clientSecret: import.meta.env.DISCORD_CLIENT_SECRET,
        /*async profile(profile){ // this doesnt actually help afaik
            return {
                id: profile.id,
                name: profile.username,
                email: profile.email,
                avatar: profile.avatar,
                verfiied: profile.verified,
                flags: profile.flags
            }
        }*/
        /*profile: async (profile) => {
            console.log("Profile",profile);
            return {
                ...profile,
                "discord_id": profile.id
            };
        }*/
    }));
}

// GitHub
if(import.meta.env.GITHUB_CLIENT_ID && import.meta.env.GITHUB_CLIENT_SECRET){
    providers.push(GitHub({
        clientId: import.meta.env.GITHUB_CLIENT_ID,
        clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
        /*profile: async (profile) => {
            console.log("Profile",profile);
            return {
                ...profile,
                "github_id": profile.id
            };
        }*/
    }));
}

export default defineConfig({
  providers: providers,
  callbacks: {
        // this puts the id back
        session(userInfo) {
            console.log("User info",userInfo);
            const { session, token } = userInfo;
            // console.log(session, token, userInfo);
            if (session.user && token && !session.user.id && token.provider_id) {
                session.user.id = token.provider_id;
            }
            if(token.provider_id){
                
            }
            return session;
        },
        jwt(tokenInfo){
            const {token, account} = tokenInfo;
            console.log("Token info",tokenInfo);
            if(!account) return token;
            if(account.providerAccountId){
                token["provider_id"] = account.providerAccountId;
                token["univerisal_id"] = account.provider + ":" + account.providerAccountId;
            }
            if(account.jwt){ // include backend jwt
                token["jwt"] = account.jwt;
            }
            return token;
        },
        async signIn(details){
            // sign and approve profile
            // approve server
            console.log("Sign in details",details);
            if(details.account){
                if(details.account.providerAccountId && details.account.provider){
                    const univerisal_id = details.account.provider + ":" + details.account.providerAccountId;
                    // add to details.account
                    const resp = await fetch(`${BACKEND_URL}/api/token`, {
                        headers: {
                            "Authorization": `Bearer ${SHARED_SECRET}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "univerisal_id": univerisal_id
                        })
                    });
                    
                }
            }
            return true;
            // return false;
        }
    }
});