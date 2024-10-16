import { signIn, signOut, useSession } from 'next-auth/client';

const AuthButton = () => {
  const [session] = useSession();

  return (
    <div>
      {!session ? (
        <button onClick={() => signIn()}>Sign in</button>
      ) : (
        <button onClick={() => signOut()}>Sign out</button>
      )}
    </div>
  );
};

export default AuthButton;
