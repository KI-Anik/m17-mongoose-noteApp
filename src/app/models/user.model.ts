import { Iuser } from './../interfaces/user.interface';
import { Schema } from "mongoose";

const userSchema = new Schema<Iuser>(
    {
        firstName: {
            type: String,
            require: true,
            trim: true
        },
        lastName: {
            type: String,
            require: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            trim: true
        },
        password: {
            type: String,
            require: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },

    }
)