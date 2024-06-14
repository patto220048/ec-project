import { type } from 'doctrine';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const productModel = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        sku: {
            type: String,
        },
        quantity: {
            type: Number,
            default: 0,
        },
        description: {
            type: String,
        },
        color: {
            type: String,
        },
        size: {
            type: String,
        },
        price: {
            type: Number,
        },
        priceNew: {
            type: Number,
        },
        image: {
            type: String,
        },
        images: {
            type: Array,
            default: [],
        },
        instock: {
            type: Boolean,
            default: true,
        },
        categories: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'categories',
            require: true,
        },
        countInstock: {
            type: Number,
            required: true,
            min: 0,
            max: 255,
        },
        brand: {
            type: String,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Product', productModel);
