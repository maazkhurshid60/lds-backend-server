import mongoose, {Schema} from "mongoose";

export interface ISettingDocument extends mongoose.Document {
    label: string,
    value: Schema.Types.Mixed
}

const settingSchema: Schema<ISettingDocument> = new Schema(
    {
        label : {
            type: String,
            required: [true, "Label is required"],
            trim: true,
        },
        value: {
            type: Schema.Types.Mixed,
            required: [true, "value is required"],
        },
    },
    {
        timestamps: true
    }
);


export const Setting = mongoose.model<ISettingDocument>("Setting", settingSchema);