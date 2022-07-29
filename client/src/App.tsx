import { KeyboardEvent, useState } from 'react'
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	SimpleGrid,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	Text,
} from '@chakra-ui/react'
import { IUser } from '@shared/User.interface'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_USERS } from './query/getAllUsers'
import { useEffect } from 'react'
import { CREATE_USER } from './mutation/createUser'

export const App = () => {
	const { data, loading, error, refetch } = useQuery<{ getAllUsers: IUser[] }>(
		GET_ALL_USERS,
	)
	const [createUser] = useMutation(CREATE_USER)
	const [users, setUsers] = useState<IUser[]>([])
	const [username, setUsername] = useState('')
	const [age, setAge] = useState('')

	useEffect(() => {
		setUsers(data?.getAllUsers ?? [])
		console.log(data, loading, error)
	}, [data, loading, error])
	return (
		<Box width={1200} mx="auto" p="4">
			<FormControl
				mb="4"
				border="1px"
				borderColor="gray.100"
				p="4"
				borderRadius="4"
			>
				<SimpleGrid columns={2} spacing={10} my='4'>
					<Box>
						<FormLabel>Username</FormLabel>
						<Input
							type="text"
							value={username}
							onChange={(e: KeyboardEvent<HTMLInputElement>) =>
								setUsername(e.target.value)
							}
						/>
					</Box>
					<Box>
						<FormLabel>Age</FormLabel>
						<Input
							type="number"
							value={age}
							onChange={(e: KeyboardEvent<HTMLInputElement>) =>
								setAge(e.target.value)
							}
						/>
					</Box>
				</SimpleGrid>
				<Button
				w='100%'
					onClick={async () => {
						await createUser({
							variables: {
								input: {
									username,
									age: Number(age),
								},
							},
						})
						setUsername('')
						setAge('')
						refetch()
					}}
				>
					Create
				</Button>
			</FormControl>
			{loading && <Text fontSize="xl">Loading...</Text>}
			{error && (
				<Text fontSize="xl">
					{error instanceof Error ? error.message : 'Error'}
				</Text>
			)}
			{users.length > 0 && (
				<TableContainer
					border="1px"
					borderColor="gray.100"
					p="4"
					borderRadius="4"
				>
					<Table>
						<Thead>
							<Tr>
								<Th isNumeric>ID</Th>
								<Th>Username</Th>
								<Th isNumeric>Age</Th>
							</Tr>
						</Thead>
						<Tbody>
							{users.map((user) => (
								<Tr key={user.id}>
									<Td isNumeric>{user.id}</Td>
									<Td>{user.username}</Td>
									<Td isNumeric>{user.age}</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			)}
		</Box>
	)
}
