export interface Role {
    roleId: number
    roleDescription: string
    role: string
}

export interface User {
    userId: number
    userName: string
    roles: Role[]
}
