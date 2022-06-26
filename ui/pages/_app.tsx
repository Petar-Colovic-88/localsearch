import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container">
      <main className="main">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
