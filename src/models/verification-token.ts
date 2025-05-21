import { resetPassword } from "../controllers/authController";

export interface VerificationToken {
    id: number,
    userId: number,
    token: string, 
    type: TokenType,
    expiresAt: Date,
    usedAt?: Date,
    createdAt: Date
}

export enum TokenType {
    SignUp = 'signup',
    TwoFA = 'twofa',
    ResetPassword = 'reset_password'
}