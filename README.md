# NextJS Like Simulator

> Create a Facebook-like scalable "Like" system with the following in mind: You have two entities: posts and users

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



## Libraries/Tools used

* NextJS
* MongoDB Atlas

## How to setup

Run the following commands to setup, given `node` and `npm` is available:

1. git clone git@github.com:huntertrammell/next-social.git
1. cd next-social
1. npm install
1. npm run dev

## Running tests


## Decisions and tradeoffs


## If it was a bigger project

This is a coding challenge and scope is quite small. If it was a bigger real project, doing the following would be better:

