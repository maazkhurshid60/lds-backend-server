
import { Schema } from "mongoose"

export interface ICreateSetting {
    label: string,
    value: Schema.Types.Mixed
}

export interface IUpdateSetting {
    settings: ICreateSetting[]
}