import Login from '../components/auth/login'
import Register from '../components/auth/register'
function Auth(props) {
	console.log(props)
	return (
		<section>
			<div className="flex-container">
				<div className="flex-50">
					<h2 className="center">Login</h2>
					<Login />
				</div>
				<div className="flex-50">
					<h2 className="center">New Account</h2>
					<Register />
				</div>
			</div>
		</section>
	)
}

export default Auth
