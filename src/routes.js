const {ErrorMiddleware, FormatValidator} = require("./util/middlewares");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
module.exports = app => {
    FormatValidator(app);
    userRoutes(app);
    orderRoutes(app);
    ErrorMiddleware(app);
}
