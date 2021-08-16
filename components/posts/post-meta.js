import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import css from './post-meta.module.css'

function PostMeta(props) {
	const [session] = useSession()

	const router = useRouter()
	const { username } = props.meta
	const { totalLikes, likedBy } = props.meta.likes
	const [likedByUser, setLikedByUser] = useState(false)

	useEffect(() => {
		if (session) {
			const currentUser = session.user.name
			setLikedByUser(false)
			const liked = likedBy.includes(currentUser)
			if (liked) {
				setLikedByUser(true)
			}
		}
	}, [likedBy])

	let likes = css.heart
	if (likedByUser) {
		likes = `${css.heart} ${css.liked}`
	}

	let likeTxt
	if (!totalLikes) {
		likeTxt = '0 Likes'
	} else if (totalLikes === 1) {
		likeTxt = '1 Like'
	} else {
		likeTxt = totalLikes + ' Likes'
	}

	function likeHandler() {
		if (!session) {
			router.push('/auth')
			return
		}
		if (!likedByUser) {
			likedBy.push(currentUser)
		} else {
			const index = likedBy.indexOf(currentUser)
			likedBy.splice(index, 1)
		}
		setLikedByUser(!likedByUser)
		console.log(likedBy)
	}

	return (
		<ul className={css.meta}>
			<li>
				<ul className={css.likes}>
					<li className={css.action}>
						<button onClick={likeHandler}>
							<svg className={likes} viewBox="0 0 32 29.6">
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
