import authRoute from "./auth.routes.js"

function route(app) {
    app.use('/api/auth', authRoute);
 
}
export default route;