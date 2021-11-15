import type { AppProps } from "next/app";

import Navbar from "../components/Navbar";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div>
            <Navbar />
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
