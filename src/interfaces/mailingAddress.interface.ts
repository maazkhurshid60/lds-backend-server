
export interface ICreateMailingAddress {
    firstName: string,
    address: string,
    apt: string,
    city: string,
    state: string,
    zip: string,
    // rRR: boolean,
}


export interface IUpdateMailingAddress extends ICreateMailingAddress {
    mailingAddressId: string
}