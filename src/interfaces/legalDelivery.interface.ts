export interface ISearchService {
    dateCreated?: string | undefined | null,
    jobNo?: number | undefined | null,
    clientId?: any | undefined | null,
    serviceType?: any | undefined | null,
    caseNo?: number | undefined | null,
    fullName?: string | undefined | null,
    businessName?: string | undefined | null,
    address?: string | undefined | null,
    apt?: string | undefined | null,
    city?: string | undefined | null,
    state?: string | undefined | null,
    zip?: string | undefined | null,
    commercialDescription?: string | undefined | null,
    otherLTDescription?: string | undefined | null,
    otherOptions?: any[] | undefined | null,
    lTServiceTypes?: any[] | undefined | null
}

export interface ISearchResult {
    dateEntered: string | null | undefined,
    dateService: string | null | undefined,
    date1Attepmt: string | null | undefined,
    date2Attepmt: string | null | undefined,
    date3Attepmt: string | null | undefined,
    dateMailing: string | null | undefined, 
    resultOptions:any | undefined | null,
    serviceTypeOptions:any | undefined | null,
    corpRecipient: string | null | undefined, 
    corpRecipientTitle: string | null | undefined, 
    substituteDeliveredTo: string | null | undefined, 
}

export interface ISearchStandard {
    otherStdDescription: string | null | undefined,
    indexNumber: number | null | undefined,
    court: string | null | undefined,
    country: string | null | undefined,
    plaintiff: string | null | undefined,
    defendant: string | null | undefined,
    fullName: string | null | undefined,
    address: string | null | undefined,
    apt: string | null | undefined,
    city: string | null | undefined,
    zip: number | null | undefined,    
}