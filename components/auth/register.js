import { useRef, useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import { signIn } from 'next-auth/client'

import css from './form.module.css'

function Register() {
	const usernameInputRef = useRef()
	const passwordInputRef = useRef()

	const [error, setError] = useState()

	const router = useRouter()

	async function handleSubmit(e) {
		e.preventDefault()

		const reqBody = {
			username: usernameInputRef.current.value,
			password: passwordInputRef.current.value,
		}

		const response = await fetch('/api/auth/new', {
			method: 'POST',
			body: JSON.stringify(reqBody),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const data = await response.json()

		if (!response.ok) {
			setError(data.message)
		} else {
			const result = await signIn('credentials', {
				redirect: false,
				username: reqBody.username,
				password: reqBody.password,
			})

			if (!result.error) {
				router.replace('/')
			} else {
				setError(result.error)
			}
		}

		return data
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

export default Register
