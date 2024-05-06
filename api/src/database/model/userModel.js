import { type } from 'doctrine';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserModel = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwords: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        avatar: {
            type: String,
        },
        phoneNumber : {
            type: Number,
        },
        addresses: [
            {
                streets: {
                    type: String
                },
                city:{
                    type: String
                },
            },
            
        ],
        history: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('User', UserModel);
