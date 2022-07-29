import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'
import { schema } from './schema'

const port = 3001
const app = express()
app.use(cors())

export interface IUser {
	id: number
	username: string
	age: number
	posts: IPost[]
}

export interface IPost {
	id: number
	title: string
	content: string
}

export interface IInput<T> {
	input: T
}

export type IUserInput = Omit<IUser, 'id' | 'posts'>
export type IPostInput = Omit<IUser, 'id'>

const users: IUser[] = [{ id: 1, username: 'Andrey', age: 20, posts: [] }]

const root = {
	getAllUsers: () => users,
	getUser: ({ id }: IUser) => users.find((user) => user.id === id),
	createUser: ({ input: { username, age } }: IInput<IUserInput>) => {
		const user: IUser = {
			id: Math.floor(Date.now() / 1000),
			username,
			age,
			posts: [],
		}
		users.push(user)
		return user
	},
}

app.use('/graphql', graphqlHTTP({ schema, graphiql: true, rootValue: root }))

app.listen(port, () => {
	console.log(`Server started: http://localhost:${port}`)
})
