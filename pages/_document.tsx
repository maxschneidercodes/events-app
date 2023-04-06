import { Html, Head, Main, NextScript } from 'next/document'
import Notification from '../components/notification/notification'

export default function Document() {
    return (
        <Html lang='de'>
            <Head />
            <body>
                <Main />
                <NextScript />
                <Notification title={"asd"} message={"asd"} status={"success"} />
            </body>
        </Html>
    )
}