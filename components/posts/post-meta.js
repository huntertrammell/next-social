import { useState } from 'react'
import { getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import css from './post-meta.module.css'

function PostMeta(props) {
	const router = useRouter()
	const { _id } = props
	const { username } = props.meta
	const { likedBy } = props.meta.likes
	const totalLikes = likedBy.length
	const [likedByUser, setLikedByUser] = useState(false)

	async function getUser() {
		const session = await getSession()
		if (session) {
			const liked = likedBy.includes(session.user.name)
			if (liked) {
				setLikedByUser(true)
			}
		}
	}

	getUser()

	let likeClass = css.heart
	if (likedByUser) {
		likeClass = `${css.heart} ${css.liked}`
	}

	let likeTxt
	if (!totalLikes) {
		likeTxt = '0 Likes'
	} else if (totalLikes === 1) {
		likeTxt = '1 Like'
	} else {
		likeTxt = totalLikes + ' Likes'
	}

	async function likeHandler() {
		const session = await getSession()
		if (!session) {
			router.push('/auth')
			return
		}
		const currentUser = session.user.name
		if (!likedByUser) {
			likedBy.push(currentUser)

			fetch('/api/post/like', {
				method: 'PATCH',
				body: JSON.stringify({
					postId: _id,
					username: currentUser,
					type: 'like',
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data)
				})
		} else {
			const index = likedBy.indexOf(currentUser)
			likedBy.splice(index, 1)
			fetch('/api/post/like', {
				method: 'PATCH',
				body: JSON.stringify({
					postId: _id,
					username: currentUser,
					type: 'unlike',
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data)
				})
		}
		setLikedByUser(!likedByUser)
	}

	return (
		<ul className={css.meta}>
			<li>
				<ul className={css.likes}>
					<li className={css.action}>
						<button onClick={likeHandler}>
							<svg className={likeClass} viewBox="0 0 32 29.6">
								<path
									d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
								/>
							</svg>
						</button>
					</li>
					<li className={css.count}>{likeTxt}</li>
				</ul>
			</li>
			<li className={css.user}>
				<div>{username}</div>
			</li>
		</ul>
	)
}

export default PostMeta
