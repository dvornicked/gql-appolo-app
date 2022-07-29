import { buildSchema } from 'graphql'

export const schema = buildSchema(`
	type User {
		id: ID
		username: String
		age: Int
	}

	input UserInput {
		id: ID
		username: String!
		age: Int!
	}

	type Query {
		getAllUsers: [User]
		getUser(id: ID): User
	}

	type Mutation {
		createUser(input: UserInput): User
	}
`)
