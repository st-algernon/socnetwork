export interface AccountLoginRequest {
    email: string
    password: string
}

export interface AccountRegistrationRequest {
    email: string
    name: string
    username: string
    password: string
}

export interface AuthResponse {
    token: string,
    expiresIn: string
    result: string
    errors: string[]
}