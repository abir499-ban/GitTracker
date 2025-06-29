import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export async function genToken(payload: UserJWTPayload) {
    const token = jwt.sign(payload, process.env.TOKEN_SECRET!, {
        expiresIn: "1d"
    })
    return token
}


export async function verifyToken(token: string) {
    try {
        const payload = jwt.verify(token, process.env.TOKEN_SECRET!) as UserJWTPayload
        return payload
    } catch (error) {
        throw new Error('Invalid Token')
    }
}

export function verifyJwt(token: string) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
        console.error('JWT verification failed:', error);
        return null;
    }
}