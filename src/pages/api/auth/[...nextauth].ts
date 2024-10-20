import NextAuth from "next-auth";

export default NextAuth({
  // 認証プロバイダを一時的に削除
  providers: [
    // 例: Googleプロバイダをコメントアウト
    // Providers.Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    // Providers.Credentials({
    //   id: "line",
    //   name: "LINE",
    //   authorize: async (credentials) => {
    //     // LINE認証ロジック
    //   },
    // }),
  ],
  // アダプターを一時的に削除
  // adapter: FirestoreAdapter(db),
  // シークレットを一時的に削除
  // secret: process.env.NEXTAUTH_SECRET,
  // セッション設定を一時的に削除
  // session: {
  //   jwt: true,
  // },
  // コールバックを一時的に削除
  // callbacks: {
  //   async jwt(token, user) {
  //     if (user) {
  //       token.id = user.id;
  //     }
  //     return token;
  //   },
  //   async session(session, token) {
  //     session.user.id = token.id;
  //     return session;
  //   },
  // },
});
