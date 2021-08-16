import css from './create-post.module.css'

function CreatePost() {
	return (
		<section>
			<form className={css.post}>
				<div className={css.controls}>
					<div className={css.control}>
						<label htmlFor="post" className="sr-only">
							New Post
						</label>
						<textarea
							rows="5"
							id="post"
							placeholder="Tell the world what you have been up to"
							required
						/>
					</div>
					<div className={css.action}>
						<button>Publish</button>
					</div>
				</div>
			</form>
		</section>
	)
}

export default CreatePost
