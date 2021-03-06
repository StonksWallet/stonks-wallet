const {ErrorMiddleware, FormatValidator} = require("./util/middlewares");
const userRoutes = require("./routes/userRoutes");
const assetRoutes = require("./routes/assetRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reportRoutes = require("./routes/reportRoutes");

module.exports = app => {
    FormatValidator(app);
    userRoutes(app);
    assetRoutes(app);
    orderRoutes(app);
    reportRoutes(app);
    ErrorMiddleware(app);
}
