import { connectToDatabase } from '../lib/mongodb'
import User from '../models/User'
import bcrypt from 'bcrypt'

async function addUser(email: string, password: string) {
  try {
    await connectToDatabase()

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
      email,
      password: hashedPassword,
    })

    await user.save()
    console.log(`User ${email} added successfully`)
  } catch (error) {
    console.error('Error adding user:', error)
  }
}

// Usage example:
// addUser('admin@example.com', 'adminpassword')

export { addUser }