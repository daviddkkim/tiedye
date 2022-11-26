import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../components";
export default function Login() {
  const { isLoading, loginWithRedirect } = useAuth0();
  if (isLoading) {
    return <button>Loading...</button>;
  }
  return (
    <main>
      <span>
        <Button onClick={loginWithRedirect}>Log in</Button>
      </span>
    </main>
  );
}
