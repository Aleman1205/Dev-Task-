import bcrypt from 'bcryptjs'
import { User } from '../types/user.js'

const mockUser: User = {
    id: '1',
    email: 'admin@devtask.com',
    name: 'Admin',
    password: bcrypt.hashSync('123456', 10),
}

export async function loginUser(email: string, password: string) {
    if (email !== mockUser.email) {
        return null
    }

    const validPassword = await bcrypt.compare(password, mockUser.password)

    if (!validPassword) {
        return null
    }

    return mockUser
}