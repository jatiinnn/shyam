import { addUser } from './addUser'

async function createUsers() {
  await addUser('jatinjv9897@gmail.com', 'shreeradhey9897')
  await addUser('nikita@gmail.com', 'nikita123')
  await addUser('neetu123@bawli.com', 'pagalsi')
  // Add more users as needed
}

createUsers()