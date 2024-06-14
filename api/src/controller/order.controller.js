import {
    countOrders,
    createOrder,
    deleteOrder,
    getDetailOrder,
    getOrders,
    getTotalSalesOrder,
    updateOrder,
    userOders,
} from '../services/order.service.js';
import isValidObjectId from '../untils/isValidOjectId.js';

class order {
    create(req, res) {
        createOrder(req, res);
    }
    get(req, res) {
        getDetailOrder(req, res);
    }
    gets(req, res) {
        getOrders(req, res);
    }
    update(req, res) {
        updateOrder(req, res);
    }
    delete(req, res) {
        deleteOrder(req, res);
    }
    getTotalSales(req, res) {
        getTotalSalesOrder(req, res);
    }
    getCountOder(req, res) {
        countOrders(req, res);
    }
    getUserOrders(req, res) {
        userOders(req, res);
    }
}

export default new order();
