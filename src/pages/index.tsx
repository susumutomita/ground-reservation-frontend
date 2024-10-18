import { useSession, signIn, signOut } from "next-auth/client";
import AuthButton from "../components/AuthButton";
import Dashboard from "../components/Dashboard";

export default function Home() {
  const [session, loading] = useSession();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {!session ? (
        <div>
          <h1>Welcome to Baseball Field Availability</h1>
          <AuthButton />
        </div>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}
