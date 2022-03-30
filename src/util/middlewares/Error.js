const {ErrorSerializer} = require("../../service/serializer");

module.exports = app => {
    app.use((error, req, res, next) => {
        res.status(400);
        const serializer = new ErrorSerializer(res.getHeader('Content-Type'), ['message']);
        res.send(serializer.serialize(error));
    });
}
