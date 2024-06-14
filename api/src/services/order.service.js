import Order from '../database/model/orderModel.js';
import OrderItem from '../database/model/orderItemModel.js';
import handleError from '../untils/handleError.js';

export const createOrder = async (req, res) => {
    // map các orderItems và lưu các id sản phẩm vào database
    // Dùng promise xữ lí bất đồng bộ
    const orderItemsIds = Promise.all(
        req.body.orderItems.map(async (orderItem) => {
            let newOderItem = new OrderItem({
                quantity: orderItem.quantity,
                product: orderItem.product,
            });
            // lưu database
            newOderItem = await newOderItem.save();
            // trả về giá giá id sản phẩm
            return newOderItem._id;
        }),
    );
    const orderItemsIdResovled = await orderItemsIds;
    // map qua các sản phảm và tính tổng giá
    const totalPrices = await Promise.all(
        orderItemsIdResovled.map(async (orderItemId) => {
            const orderItem = await OrderItem.findById(orderItemId).populate('product');
            const totalPrice = orderItem.product.price * orderItem.quantity;
            //trả về array tổng giá cho mỗi sản phẩm
            return totalPrice;
        }),
    );
    //dùng reduce tính tổng giá sản phẩm
    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
    // lưu database
    const newOrder = new Order({
        ...req.body,
        orderItems: orderItemsIdResovled,
        totalPrice: totalPrice,
    });
    try {
        const order = await newOrder.save();
        if (!order) return res.json(handleError(false, 404, "Order can't not created!"));
        res.status(200).json(newOrder);
    } catch (err) {
        res.json(handleError(false, 500, err.message, 'Server ERROR'));
    }
};

export const getDetailOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name')
            .populate({
                path: 'orderItems',
                populate: {
                    path: 'product',
                    populate: 'categories',
                },
            });
        if (!order) return res.json(handleError(false, 404, 'Order not found!'));
        res.status(200).json(order);
    } catch (err) {
        res.json(handleError(false, 500, err.message, 'Server ERROR'));
    }
};

export const getOrders = async (req, res) => {
    if (req.user.admin === true) {
        try {
            const orders = await Order.find().populate('user', 'name').sort({ dateOrdered: -1 });
            if (!orders) return res.json(handleError(false, 404, 'Order not found!'));
            return res.status(200).json(orders);
        } catch (err) {
            res.json(handleError(false, 500, err.message, 'Server ERROR'));
        }
    } else {
        return res.json(handleError(false, 403, 'You are not admin!'));
    }
};

export const updateOrder = async (req, res) => {
    if (req.user.admin === true) {
        try {
            const order = await Order.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true },
            );
            if (!order) return res.json(handleError(false, 404, 'Order not found!'));
            return res.status(200).json(order);
        } catch (err) {
            res.json(handleError(false, 500, err.message, 'Server ERROR'));
        }
    } else {
        return res.json(handleError(false, 403, 'You are not admin!'));
    }
};

export const deleteOrder = async (req, res) => {
    if (req.user.admin === true) {
        try {
            const order = await Order.findByIdAndDelete(req.params.id);
            if (!order) return res.json(handleError(false, 404, 'Order not found!'));
            await order.orderItems.map(async (orderItem) => {
                await OrderItem.findByIdAndDelete(orderItem);
                return res.status(200).json({ suscess: true, message: 'Order deleted!' });
            });
        } catch (err) {
            return res.json(handleError(false, 500, err.message, 'Server ERROR'));
        }
    } else {
        return res.json(handleError(false, 403, 'You are not admin!'));
    }
};

export const getTotalSalesOrder = async (req, res) => {
    try {
        const totalSales = await Order.aggregate([{ $group: { _id: null, totalSales: { $sum: '$totalPrice' } } }]);
        if (!totalSales) return res.json(handleError(false, 400, 'The order sales cannot be generated!'));

        return res.status(200).json({ totalSales: totalSales.pop().totalSales });
    } catch (err) {
        return res.json(handleError(false, 500, err.message, 'Server ERROR'));
    }
};
export const countOrders = async (req, res) => {
    try {
        const countOrder = await Order.countDocuments();
        if (!countOrder) return res.json(handleError(false, 404, 'Order not found!'));
        return res.status(200).json({ success: true, countOrder });
    } catch (error) {
        return res.json(handleError(false, 500, error.message, 'Server error!!'));
    }
};

export const userOders = async (req, res) => {
    try {
        const userOrder = await Order.find({ user: req.params.userId })
            .populate({
                path: 'orderItems',
                populate: {
                    path: 'product',
                    populate: 'categories',
                },
            })
            .sort({ dateOrdered: -1 });
        if (!userOrder) return res.json(handleError(false, 404, 'Order not found!'));
        return res.status(200).json(userOrder)
    } catch (error) {
        return res.json(handleError(false, 500, error.message, 'Server error!!'));
    }
};
