declare type UserCreationRequestPaylod = {
    name: string,
    email: string,
    password: string
}
declare type SendMailParams = {
    email: string,
    emailType: string,
    userId: number
}

declare type UserLoginPayload = {
    email: string,
    password: string
}

declare type UserFetched = {
    id: number,
    name: string,
    email: string,
    password: string,
    isVerified: boolean,
    isAdmin: boolean,
    verifyPasswordToken: string,
    verfiyPasswordTokenExpiry: any,
    verifyToken: string,
    verifyTokenExpiry: any
}

declare type UserJWTPayload = {
    id : number,
    name: string,
    email : string
}