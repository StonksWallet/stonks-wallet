const reportController = require('../controller/reportController');
const { Auth } = require('../util/middlewares');

module.exports = app => {
    app.route('/report/profit')
        .get(
            Auth.bearer,
            reportController.getProfit
        );
};
