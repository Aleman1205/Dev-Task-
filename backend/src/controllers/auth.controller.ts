import { Request, Response } from 'express'
import { loginUser } from '../services/auth.service.js'
import { generateToken } from '../utils/jwt.js'

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                error: 'Email y password son obligatorios',
            })
        }

        const user = await loginUser(email, password)

        if (!user) {
            return res.status(401).json({
                error: 'Credenciales inválidas',
            })
        }

        const token = generateToken({
            id: user.id,
            email: user.email,
        })

        return res.json({
            message: 'Login exitoso',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        })
    } catch (error) {
        console.error('Error login:', error)

        return res.status(500).json({
            error: 'Error interno del servidor',
        })
    }
}