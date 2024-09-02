
export interface ICreateStandardServiceType {
    name: string,
    isActive:boolean
}

export interface IUpdateStandardServiceType extends ICreateStandardServiceType {
    standardServiceTypeId: string
}