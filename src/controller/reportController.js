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
                if (!order.type_order) profit += order.price * order.quantity
            })

            const result = { profit }

            sendResponse(res, 200, result, new CustomSerializer(res.getHeader('Content-Type'), ['profit']));
        } catch (error) {
            next(error)
        }
    },
    getMostOperationsInsight: async (req, res, next) => {
        const user_email = req.user.email;

        try {
            let orders = await OrderRepository.findByParams({ user_email })

            let profitBySymbols = {}

            orders.forEach((order) => {
                if (!profitBySymbols.hasOwnProperty(order.name))
                    profitBySymbols[order.name] = { 'name': order.name, 'count': 0 }

                profitBySymbols[order.name].count++
            })

            let symbolsProfit = Object.values(profitBySymbols)

            symbolsProfit.sort((a, b) => { a.count - b.count })

            if (symbolsProfit.legth > 5) symbolsProfit = symbolsProfit.slice(0, 5)

            sendResponse(res, 200, symbolsProfit, new CustomSerializer(res.getHeader('Content-Type'), ['name', 'count']));
        } catch (error) {
            next(error)
        }
    },
    getMostProfitInsight: async (req, res, next) => {
        const user_email = req.user.email;

        try {
            let orders = await OrderRepository.findByParams({ user_email })

            let profitBySymbols = {}

            orders.forEach((order) => {
                if (!order.type_order) {
                    if (!profitBySymbols.hasOwnProperty(order.name))
                        profitBySymbols[order.name] = { 'name': order.name, 'profit': 0 }

                    profitBySymbols[order.name].profit += order.quantity * order.price
                }
            })

            let symbolsProfit = Object.values(profitBySymbols)

            symbolsProfit.sort((a, b) => { a.profit - b.profit })

            if (symbolsProfit.legth > 5) symbolsProfit = symbolsProfit.slice(0, 5)

            sendResponse(res, 200, symbolsProfit, new CustomSerializer(res.getHeader('Content-Type'), ['name', 'profit']));
        } catch (error) {
            next(error)
        }
    },
};
