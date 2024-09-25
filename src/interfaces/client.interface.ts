

export interface ICreateClient {
    code: string,
    fullName: string,
    mi: string,
    address1: string,
    address2: string,
    city: string,
    state: string,
    zip: string,
    phone: string,
    fax: string,
    apt: string,
    isActive: boolean
}

export interface IUpdateClient extends ICreateClient {
    clientId: string
}