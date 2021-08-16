# NextJS Like Simulator

> Create a Facebook-like scalable "Like" system with the following in mind: You have two entities: posts and users

Deployed Project -> [https://next-social.vercel.app/](https://next-social.vercel.app/)

## Assumptions

1. A user can like many posts, and every post can be liked by many users
2. I can like, and unlike a post
3. It should scale well with millions of posts and users

## Key Things to Demonstrate

- What happens if I rapidly like and unlike. Will it make the system inconsistent?
- How would you apply some sort of rate limit? We don't want people to like many posts too fast.

## Tech Requirements

- Please create a Next.js project to demonstrate your solution, and deploy it on Vercel
- MongoDB and Redis are our preferred data store, but if you feel the current choices are not good for this type of data structure, feel free to introduce a different database.
- Use Node.js as your backend.


## Solution formulation

In order to maintain consistent likes between users, getting authentication was a must. I opted to just use usernames instead of email as there is no point in storing PII data unless i intend to use it (i.e. if i were to add password resets etc)

I kept user and posts in seperate collections with most of the post data under a meta object, this was built with the intention of being able to add more to the post in the future such as comments, etc that would otherwise make the post object a bit cluttered.

The like system was the most challenging. I opted to keep the client session open on the server as I feel like the server would be hit hard if everytime a post was liked/unliked the server needed to create a new session.

Since i chose MongoDB Atlas, rate-limiting is pre-built into the service. like and unlike visually would still be handled via the client, but once the server blocks the request the actual data update would no longer happen

I chose to render the feed using serverside props for SEO purposes, however if the project scope were larger I would use static props and revalidate every x amount of time in addition to refreshing client data on page load (really only rendering it statically for SEO, real users would see a loader then new data would be pulled)

## Libraries/Tools used

* NextJS
* MongoDB Atlas
* Next-auth
* bcryptjs

## How to setup

Run the following commands to setup, given `node` and `npm` is available:

1. git clone git@github.com:huntertrammell/next-social.git
2. cd next-social
3. npm install
4. create ```next.config.js``` file with the following key values:
```
module.exports = {
    env: {
        mongo_user: <username>,
        mongo_pass: <pass>,
        mongo_cluster: <cluster>,
        mongo_database: <database>,
        baseurl: 'http://localhost:3000',
        NEXTAUTH_URL: 'http://localhost:3000',
    },
}
```

5. npm run dev


## If it was a bigger project

This is a coding challenge and scope is quite small. If it was a bigger real project, doing the following would be better:

- Implement live reloads via websockets or a similar realtime data system
- Dynamically fetch posts as page scroll happens
- Edit and remove posts
- Better error handling
- Improve security on text inputs
- Use sitewide state for user authentication
- Implement pwr library for data sync
- Add testing to run at build time

