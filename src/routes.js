const {ErrorMiddleware, FormatValidator} = require("./util/middlewares");
const userRoutes = require("./routes/userRoutes");
const assetRoutes = require("./routes/assetRoutes");
module.exports = app => {
    FormatValidator(app);
    userRoutes(app);
    assetRoutes(app);
    ErrorMiddleware(app);
}
