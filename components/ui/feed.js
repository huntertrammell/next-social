const { default: Post } = require('../posts/post')

function Feed() {
	const FAKE_POST = [
		{
			_id: 'asdaaggaegrrgerdGBESGdads',
			content: 'This is a test post, please disregard and have a wonderful day',
			meta: {
				username: 'Hunter Trammell',
				likes: {
					totalLikes: 2,
					likedBy: ['sam', 'jim'],
				},
			},
		},
		{
			_id: 'asdaasfafsawgrshadads',
			content:
				'This is another riveting test post, please disregard and have a wonderful day',
			meta: {
				username: 'sam',
				likes: {
					totalLikes: 0,
					likedBy: [],
				},
			},
		},
		{
			_id: 'asdaewrq212rrgerdGBESGdads',
			content:
				'This is a third riveting test post, please disregard and have a wonderful day',
			meta: {
				username: 'jim',
				likes: {
					totalLikes: 1,
					likedBy: ['Hunter Trammell'],
				},
			},
		},
	]
	return (
		<section>
			{FAKE_POST.map((post) => (
				<Post post={post} key={post._id} />
			))}
		</section>
	)
}

export default Feed
