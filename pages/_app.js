import App from "next/app";
import { useRouter } from "next/router";
import { AuthProvider } from "react-use-auth";

import "../styles/index.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AuthProvider
      auth0_domain="travers.auth0.com"
      auth0_client_id="VUgBVSwf0REXIknvVjDtSD6uVXnjaCsV"
      auth0_params={{ screenHint: "signup" }}
      navigate={router.push}
    >
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default class _App extends App {
  render() {
    return <MyApp {...this.props} />;
  }
}
