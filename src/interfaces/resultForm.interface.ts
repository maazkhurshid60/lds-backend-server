

export interface ICreateResultForm {
    queryInformationLT: any,
    queryInformationStandard: any,
    serviceResults: any
}

export interface IUpdateResultForm extends ICreateResultForm {
    resultFormId: string
}