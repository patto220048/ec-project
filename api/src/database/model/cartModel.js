

const cartModel = new Schema(
    {
        userId: {
            type: String,
        },
        products: {
            type: Array,
            default: [],
        },
        total: {
            type: String,
        },
        quantity: {
            type: Number,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('order', cartModel);
