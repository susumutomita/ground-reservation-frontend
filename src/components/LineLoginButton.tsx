import { signIn } from "next-auth/client";

const LineLoginButton = () => {
  return <button onClick={() => signIn("line")}>Sign in with LINE</button>;
};

export default LineLoginButton;
