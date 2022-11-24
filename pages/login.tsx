import React from 'react';
import {useAuth0} from '@auth0/auth0-react';

export default function Login() {
    const { isLoading, loginWithRedirect } = useAuth0();
    if (isLoading) {
      return <button className="btn btn-primary">Loading...</button>;
    }
    return (
      <main className="py-4">
        <h1 className="text-center">Convex Chat</h1>
        <div className="text-center">
          <span>
            <button className="btn btn-primary" onClick={loginWithRedirect}>
              Log in
            </button>
          </span>
        </div>
      </main>
    );
  }
