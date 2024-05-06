import authRoute from "./auth.routes.js"
import authUser from "./user.routes.js"
function route(app) {
    app.use('/api/auth', authRoute);
    app.use('/api/users', authUser);
 
}
export default route;