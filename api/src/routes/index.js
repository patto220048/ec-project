import testRoute from './test11.js'

function route(app) {

    app.use('/test', testRoute);
}
export default route;
