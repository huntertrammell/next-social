import Head from 'next/head'
import { Provider } from 'next-auth/client'
import Layout from '../components/layout/layout'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	return (
		<Provider session={pageProps.session}>
			<Layout>
				<Head>
					<title>NextJS Social App</title>
					<meta name="description" content="Built with Next.js & MongoDB" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	)
}

export default MyApp
