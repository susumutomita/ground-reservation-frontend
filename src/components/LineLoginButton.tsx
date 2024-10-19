import { signIn } from "next-auth/react";

const LineLoginButton = () => {
  return <button onClick={() => signIn("line")}>Sign in with LINE</button>;
};

export default LineLoginButton;
