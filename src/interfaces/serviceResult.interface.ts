
export interface IServiceResult {
    serviceResultCode: string,
    serviceResultDescription: string
}

export interface IUpdateServiceResult extends IServiceResult {
    serviceResultId: string
}