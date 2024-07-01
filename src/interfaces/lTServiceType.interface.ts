
export interface ICreateLTServiceType {
    name: string,
    isActive: boolean
}

export interface IUpdateLTServiceType extends ICreateLTServiceType {
    lTServiceTypeId: string
}