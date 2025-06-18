import { model, Schema } from "mongoose";
import { Inotes } from "../interfaces/notes.interface";



 export const noteSchema = new Schema <Inotes>(
    {
        title: { type: String, required: true, trim: true },
        content: { type: String, default: '' },
        category: {
            type: String,
            category: ["personal", "work", "study"],
            default: 'personal'
        },
        pinned: { type: Boolean, default: false },
        tags: {
            label: { type: String, required: true },
            color: { type: String, default: 'green' }
        }
    },
    {
        versionKey: false, //removing _v field
        timestamps: true // add createdAt and updatedAt
    },

)

export const Note = model('Note', noteSchema)