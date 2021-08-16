import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { signIn } from 'next-auth/client'

import css from './form.module.css'

function Login() {
	const router = useRouter()
	const usernameInputRef = useRef()
	const passwordInputRef = useRef()

	const [error, setError] = useState()

	async function handleSubmit(e) {
		e.preventDefault()

		const username = usernameInputRef.current.value
		const password = passwordInputRef.current.value

		const result = await signIn('credentials', {
			redirect: false,
			username: username,
			password: password,
			name: username,
		})

		if (!result.error) {
			router.replace('/')
		} else {
			setError(result.error)
		}
	}

	return (
		<form onSubmit={handleSubmit} className={css.form}>
			<div className={css.controls}>
				{error && <p>{error}</p>}
				<div className={css.control}>
					<label htmlFor="username" className="sr-only">
						Username
					</label>
					<input
						type="text"
						id="username"
						required
						ref={usernameInputRef}
						placeholder="Username"
					/>
				</div>
				<div className={css.control}>
					<label htmlFor="password" className="sr-only">
						Password
					</label>
					<input
						type="password"
						id="password"
						required
						ref={passwordInputRef}
						placeholder="Password"
					/>
				</div>
				<div className={css.action}>
					<button>Register</button>
				</div>
			</div>
		</form>
	)
}

export default Login
