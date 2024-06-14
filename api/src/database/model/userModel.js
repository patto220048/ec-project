
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserModel = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
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
        phoneNumber: {
            type: Number,
        },
        addresses: [
            {
                streets: {
                    type: String,
                },
                city: {
                    type: String,
                },
            },
        ],
        history: {
            type: Array,
            default: [],
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('User', UserModel);
