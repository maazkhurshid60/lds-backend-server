
export interface ICreateServer {
    serverCode: string,
    firstName: string,
    lastName: string,
    deviceCode: string,
    licenseNo: number,
    address1: string,
    address2: string,
    country: string,
    state: string,
    zip: number,
    phone: string,
    fax: string,
    apt: string,
    isActive: boolean
}

export interface IUpdateServer extends ICreateServer {
    serverId: string
}