import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'
import { schema } from './schema'
import { IUser } from '@shared/User.interface'
import { IInput } from '@shared/Input.interface'

const port = 3001
const app = express()
app.use(cors())

const users: IUser[] = [{ id: 1, username: 'Andrey', age: 20 }]

const root = {
	getAllUsers: () => users,
	getUser: ({ id }: IUser) => users.find((user) => user.id === id),
	createUser: ({ input: { username, age } }: IInput<IUser, 'id'>) => {
		const user: IUser = {
			id: Math.floor(Date.now() / 1000),
			username,
			age,
		}
		users.push(user)
		return user
	},
}

app.use('/graphql', graphqlHTTP({ schema, graphiql: true, rootValue: root }))

app.listen(port, () => {
	console.log(`Server started: http://localhost:${port}/graphql`)
})
