const Order = require('../../models/order.model');

module.exports.getOrders = async (req, res) => {
    try {
        let find = {};
        if (req.body.keyword) {
            find.orderNumber = new RegExp(req.body.keyword, 'i');
        }

        const orders = await Order
            .find(find)
            .populate('patient', 'fullName phone birthday')
            .populate('sales', 'fullName phone')
            .populate({
                path: 'medicalRecord',
                select: 'doctor',
                populate: {
                    path: 'doctor',
                    select: 'fullName phone specialtyId',
                    populate: {
                        path: 'specialtyId',
                        select: 'name'
                    }
                }
            })
            .skip(req.body.skip)
            .limit(req.body.limit);


        if (orders) {
            res.json({
                code: 200,
                message: "Orders fetched successfully",
                data: orders,
            })
        } else {
            res.json({
                code: 400,
                message: "No orders found",
            })
        }
    } catch(error) {
        res.json({
            code: 400,
            message: error.message,
        })
    }
}

module.exports.createOrder = async (req, res) => {
    try {
        req.body.orderNumber = `DH-${Date.now()}`;
        req.body.totalPrice = req.body.medicines.reduce((total, cur) => total + cur.price * cur.quantity, 0);
        const order = await new Order(req.body);
        await order.save();
        res.json({
            code: 200,
            message: "Order created successfully",
        })
    } catch (error) {
        res.json({
            code: 400,
            message: error.message,
        })
    }
}

module.exports.updateOrder = async (req, res) => {
    try {
        await Order.updateOne({ _id: req.params.id }, {...req.body, status: 'paid'});
        res.json({
            code: 200,
            message: "Order updated successfully",
        })
    } catch(error) {
        res.json({
            code: 400,
            message: error.message,
        })
    }
}