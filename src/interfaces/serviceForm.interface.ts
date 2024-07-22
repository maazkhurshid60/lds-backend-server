
export interface ICreateServiceForm {
    jobNo: number,
    inputDate: string,
    clientId: string,
    serviceType?: string,
    caseNo?: number,
    caption?: string,
    lTServiceType?: string,
    otherLTServiceTypeData?: any,
    lTServiceDetail?: any,
    noOfAddLMailings?: number,
    mailingAddresses?: any,
    standardServiceType?: string,
    otherStandardServiceTypeData?: any,
    standardServiceDetail?: any,
}

export interface IUpdateServiceForm extends ICreateServiceForm {
    serviceFormId: string
}