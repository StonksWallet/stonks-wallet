const {ErrorMiddleware, FormatValidator} = require("./util/middlewares");

module.exports = app => {
    FormatValidator(app);
    ErrorMiddleware(app);
}
