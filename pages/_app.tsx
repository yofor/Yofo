import type { AppProps } from "next/app";
import { AuthProvider } from "../lib/auth";
import { ListingProvider } from "../lib/listings";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ListingProvider>
        <Component {...pageProps} />
      </ListingProvider>
    </AuthProvider>
  );
}
