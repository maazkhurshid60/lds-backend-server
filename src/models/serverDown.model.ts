import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the document type
interface IServerDown extends Document {
    serverDownStatus: boolean;
}

// Define the schema
const serverDownSchema = new Schema<IServerDown>({
    serverDownStatus: {
        type: Boolean,
        trim: true,
        default: false
    }
});

// Create the model with the interface
export const serverDown = mongoose.model<IServerDown>("serverDown", serverDownSchema);
