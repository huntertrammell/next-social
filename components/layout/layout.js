import { Fragment } from 'react'
import Navigation from './navigation'

function Layout(props) {
	return (
		<Fragment>
			<Navigation />
			<main className="page">{props.children}</main>
		</Fragment>
	)
}

export default Layout
