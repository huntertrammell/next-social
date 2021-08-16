import Link from 'next/link'
import { useSession, signOut } from 'next-auth/client'

import css from './navigation.module.css'

function Navigation() {
	const [session, loading] = useSession()

	function logoutHandler() {
		signOut()
	}

	return (
		<header className={css.navbar}>
			<div>
				<Link href="/">
					<h1>Next.js Social</h1>
				</Link>
			</div>
			<nav>
				<ul>
					{!session && !loading && (
						<li>
							<Link href="/auth">Login / Register</Link>
						</li>
					)}
					{session && (
						<li>
							<a href="#" onClick={logoutHandler}>
								Logout
							</a>
						</li>
					)}
				</ul>
			</nav>
		</header>
	)
}

export default Navigation
