import { getSession } from 'next-auth/client'
import { useRef, useState } from 'react'
import css from './create-post.module.css'

function CreatePost() {
	const postInputRef = useRef()
	const [error, setError] = useState()

	async function handlePostCreate(e) {
		e.preventDefault()
		const session = await getSession()
		if (session) {
			const post = postInputRef.current.value
			const username = session.user.name

			const reqBody = {
				content: post,
				username: username,
			}

			const response = await fetch('/api/post/create', {
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
				postInputRef.current.value = ''
			}
		}
	}

	return (
		<section>
			<form className={css.post} onSubmit={handlePostCreate}>
				<div className={css.controls}>
					<div className={css.control}>
						<label htmlFor="post" className="sr-only">
							New Post
						</label>
						<textarea
							rows="5"
							id="post"
							placeholder="Tell the world what you have been up to"
							ref={postInputRef}
							required
						/>
					</div>
					<div className={css.action}>
						<button>Publish</button>
					</div>
				</div>
			</form>
			{error && <p className="error">{error}</p>}
		</section>
	)
}

export default CreatePost
