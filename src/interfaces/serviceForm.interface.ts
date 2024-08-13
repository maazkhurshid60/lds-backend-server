
export interface ICreateServiceForm {
    jobNo: number,
    inputDate: string,
    clientId: string,
    serviceType?: string,
    caseNo: number,
    caption?: string,
    lTServiceType?: string,
    // otherLTServiceTypeData?: any,
    oLTIndexNo?: any,
    oLTDescription?: string,
    // lTServiceDetail?: any,
    lTSFirstName?: string,
    lTSBusinessName?: string,
    lTSZip?: string,
    lTSState?: string,
    lTSCity?: string,
    lTSApt?: string,
    lTSAddress?: string,
    lTSDescription?: string,
    noOfAddLMailings?: number,
    mailingAddresses?: any,
    standardServiceType?: any,
    // otherStandardServiceTypeData?: any,
    oSSTIndexNo?: number,
    oSSTDescription?: string,
    // standardServiceDetail?: any,
    sSDCourt?: string,
    sSDDefendants?: string,
    sSDPlaintiff?: string,
    sSDCountry?: string,
    firstNameServe?: string,
    addressServe?: string,
    cityServe?: string,
    stateServe?: string,
    aptServe?: string,
    zipServe?: string
}

export interface IUpdateServiceForm extends ICreateServiceForm {
    serviceFormId: string
}