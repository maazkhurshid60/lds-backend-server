

export interface IRegisterUser {
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    roles: string[]
}

export interface IUpdateUserDetails extends IRegisterUser {
    userId: string
}

export interface ILoginUser {
    userName: string,
    password: string
}

