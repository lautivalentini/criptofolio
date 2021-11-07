import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <link href="https://fonts.googleapis.com" rel="preconnect" />
                    <link crossOrigin="true" href="https://fonts.gstatic.com" rel="preconnect" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;500&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
