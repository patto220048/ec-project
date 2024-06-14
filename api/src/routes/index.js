import authRoute from './auth.routes.js';
import authUser from './user.routes.js';
import productRoute from './product.routes.js';
import categoryRoute from './category.routes.js';
import orderRoute from "./order.routes.js"
function route(app) {
    app.use('/api/auth', authRoute);
    app.use('/api/product', productRoute);
    app.use('/api/users', authUser);
    app.use('/api/category', categoryRoute);
    app.use('/api/order', orderRoute);
}
export default route;
