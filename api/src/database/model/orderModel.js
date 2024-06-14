import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        orderItems: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'OrderItem',
                required: true,
            },
        ],
        shippingAddress1: {
            type: String,
        },
        shippingAddress2: {
            type: String,
        },
        city: {
            type: String,
        },
        phone: {
            type: Number,
        },
        status: {
            type: String,
            require: true,
            default: 'Pending',
        },
        totalPrice: {
            type: Number,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        dateOrdered: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Order', orderSchema);
