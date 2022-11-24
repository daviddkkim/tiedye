import '../styles/globals.css'
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithAuth0 } from "convex/react-auth0";
import clientConfig from "../convex/_generated/clientConfig";
import convexConfig from "../convex.json";
import type { AppProps } from 'next/app'
import Login from './login';

const convex = new ConvexReactClient(clientConfig);
const authInfo = convexConfig.authInfo[0];


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConvexProviderWithAuth0 
      client={convex}
      authInfo={authInfo}
      loggedOut={<Login />}

    >
      <Component {...pageProps} />
    </ConvexProviderWithAuth0>
  )
}
