import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'devtask_secret'

export function generateToken(payload: object) {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: '1d',
    })
}