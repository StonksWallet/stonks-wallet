const OrderRepository = require('../service/repositories/OrderRepository.js');
const CustomSerializer = require("../service/serializer/CustomSerializer.js");

function sendResponse(res, status, result, serializer) {
    res.status(status);
    res.send(serializer.serialize(result));
}

module.exports = {
    getProfit: async (req, res, next) => {
        const user_email = req.user.email;
        const { name } = req.query;

        try {
            let params = { user_email }
            if (name) params.name = name

            let orders = await OrderRepository.findByParams(params)

            let profit = 0

            orders.forEach((order) => {
                profit += getAssetProfit(user_email, asset)
                if (!order.order_type) profit += order.price * order.quantity
            })

            const result = { profit }

            sendResponse(res, 200, result, new CustomSerializer(res.getHeader('Content-Type'), 'profit'));
        } catch (error) {
            next(error)
        }
    },
};
