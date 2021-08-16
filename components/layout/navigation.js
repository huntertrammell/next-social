import Link from 'next/link'

import css from './navigation.module.css'

function Navigation() {
	return (
		<header className={css.navbar}>
			<div>
				<Link href="/">
					<h1>Next.js Social</h1>
				</Link>
			</div>
			<nav>
				<ul>
					<li>
						<Link href="/auth">Login / Register</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Navigation
