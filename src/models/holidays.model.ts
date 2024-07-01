import mongoose, {Schema} from "mongoose";

export interface IHolidayDocument extends mongoose.Document {
    holidayYear: number,
    holidayDate: string,
    holidayDescription: string
}

const holidaySchema: Schema<IHolidayDocument> = new Schema(
    {
        holidayYear : {
            type: Number,
            required: [true, "Year is required"],
        },
        holidayDate: {
            type: String,
            required: [true, "Date is required"],
            trim: true,
        },
        holidayDescription: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);


export const Holiday = mongoose.model<IHolidayDocument>("Holiday", holidaySchema);