import "../styles/globals.css";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithAuth0 } from "convex/react-auth0";
import clientConfig from "../convex/_generated/clientConfig";
import { ThemeProvider } from "next-themes";
import { darkTheme, globalCss } from "../stitches.config";
import convexConfig from "../convex.json";
import type { AppProps } from "next/app";
import Login from "./login";
import { useEffect, useState } from "react";


const globalStyles = globalCss({
  html: {
    overflowX: "hidden",
  },

  body: {
    margin: 0,
    backgroundColor: "$mauve1",
    color: '$mauve12'
  },

  "body, button": {
    fontFamily: "$untitled",
  },

  svg: { display: "block" },

  "pre, code": { margin: 0, fontFamily: "$mono" },

  "::selection": {
    backgroundColor: "$mint11",
    color: '$sage1'
  },
  '*': {
    boxSizing: 'border-box'
  },
  'h1': {
    fontSize: '$6',
    fontWeight: 500
  },
  'h2, h3': {
    fontSize: '$5',
    fontWeight: 500

  }
});

const convex = new ConvexReactClient(clientConfig);
const authInfo = convexConfig.authInfo[0];


export default function App({ Component, pageProps }: AppProps) {

  globalStyles();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (

    <ThemeProvider
      disableTransitionOnChange
      attribute="class"
      value={{ light: "light-theme", dark: darkTheme.className }}
      defaultTheme="dark"
    >
      <ConvexProviderWithAuth0
        client={convex}
        authInfo={authInfo}
        loggedOut={<Login />}
      >
        {mounted ? <Component {...pageProps} /> :
          <div style={{ visibility: "hidden" }}>
            <Component {...pageProps} />
          </div>
        }
      </ConvexProviderWithAuth0>
    </ThemeProvider >
  );
}
