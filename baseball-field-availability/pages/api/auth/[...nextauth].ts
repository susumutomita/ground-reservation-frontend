import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { FirestoreAdapter } from '@next-auth/firebase-adapter'
import { db } from '../../../lib/firebase'

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.Credentials({
      id: 'line',
      name: 'LINE',
      authorize: async (credentials) => {
        const res = await fetch('https://api.line.me/oauth2/v2.1/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: credentials.code,
            redirect_uri: process.env.LINE_REDIRECT_URI,
            client_id: process.env.LINE_CHANNEL_ID,
            client_secret: process.env.LINE_CHANNEL_SECRET,
          }),
        })
        const data = await res.json()
        if (res.ok && data.id_token) {
          return { id: data.id_token }
        } else {
          return null
        }
      },
    }),
  ],
  adapter: FirestoreAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session(session, token) {
      session.user.id = token.id
      return session
    },
  },
})
