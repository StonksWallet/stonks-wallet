const reportController = require('../controller/reportController');
const { Auth } = require('../util/middlewares');

module.exports = app => {
    app.route('/report/profit')
        .get(
            Auth.bearer,
            reportController.getProfit
        );
    app.route('/report/insight/operation')
        .get(
            Auth.bearer,
            reportController.getMostOperationsInsight
        );
    app.route('/report/insight/profit')
        .get(
            Auth.bearer,
            reportController.getMostProfitInsight
        );
};
