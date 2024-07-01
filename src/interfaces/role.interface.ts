
export interface ICreateRole {
    name: string,
    description: string, 
    isActive: boolean
}

export interface IUpdateRole extends ICreateRole {
    roleId: string
}
