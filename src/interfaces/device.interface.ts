
export interface ICreateDevice {
    deviceCode: string,
    deviceName: string,
    productType: string,
    isActive: boolean
}

export interface IUpdateDevice extends ICreateDevice {
    id: string,
    deviceId: string,
}