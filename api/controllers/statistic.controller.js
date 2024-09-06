const Order = require("../../models/order.model");
const User = require("../../models/user.model");
const dayjs = require("dayjs");

module.exports.getStatistic = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;
        const statistic = {
            totalOrder: 0,
            totalRevenue: 0,
            totalPatient: 0,
        };

        const totalOrder = await Order.countDocuments({
            createdAt: {
                $gte: dayjs(startDate).startOf("day").toDate(),
                $lte: dayjs(endDate).endOf("day").toDate(),
            },
        });

        const totalRevenue = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: dayjs(startDate).startOf("day").toDate(),
                        $lte: dayjs(endDate).endOf("day").toDate(),
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalPrice" },
                },
            },
        ]);

        const totalPatient = await User.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: dayjs(startDate).startOf("day").toDate(),
                        $lte: dayjs(endDate).endOf("day").toDate(),
                    },
                    userType: "user",
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                },
            },
        ]);

        const chartDataYear = [];
        for (let i = 1; i <= dayjs().month() + 1; i++) {
            const totalRevenue = await Order.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: dayjs().startOf("year").month(i - 1).toDate(),
                            $lte: dayjs().endOf("year").month(i - 1).toDate(),
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$totalPrice" },
                    },
                },
            ]);

            chartDataYear.push({
                month: `Month ${i}`,
                value: totalRevenue[0]?.total || 0,
            });
        }

        const chartDataMonth = [];
        for (let i = 1; i <= dayjs().date(); i++) {
            const totalRevenue = await Order.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: dayjs().startOf("month").date(i).toDate(),
                            $lte: dayjs().endOf("month").date(i).toDate(),
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$totalPrice" },
                    },
                },
            ]);

            chartDataMonth.push({
                day: `Day ${i}`,
                value: totalRevenue[0]?.total || 0,
            });
        }

        statistic.listTopMedicine = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: dayjs(startDate).startOf("day").toDate(),
                        $lte: dayjs(endDate).endOf("day").toDate(),
                    },
                },
            },
            {
                $unwind: "$medicines",
            },
            {
                $group: {
                    _id: "$medicines.medicineId",
                    name: { $first: "$medicines.name" },
                    price: { $first: "$medicines.price" },
                    totalQuantity: { $sum: "$medicines.quantity" },
                },
            },
            {
                $sort: { totalQuantity: -1 },
            },
            {
                $limit: 5,
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    price: 1,
                    totalQuantity: 1,
                },
            },
        ]);

        statistic.chartYear = chartDataYear;
        statistic.chartMonth = chartDataMonth;

        statistic.totalOrder = totalOrder;
        statistic.totalRevenue = totalRevenue[0]?.total || 0;
        statistic.totalPatient = totalPatient[0]?.total || 0;
        res.json({
            code: 200,
            data: statistic,
        })
    } catch (error) {
        res.json({
            code: 400,
            message: error.message
        })
    }
}