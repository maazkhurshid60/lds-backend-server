
export interface IServiceType {
    serviceTypeCode: string,
    serviceTypeDescription: string
}

export interface IUpdateServiceType extends IServiceType {
    serviceTypeId: string
}