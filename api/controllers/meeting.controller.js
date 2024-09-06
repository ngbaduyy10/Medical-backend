const Meeting = require('../../models/meeting.model');
const dayjs = require("dayjs");

module.exports.getMeetings = async (req, res) => {
    try {
        let find = {deleted: false};
        if (req.body.startDate) {
            find.startDate = {
                $gte: dayjs(req.body.startDate, "DD/MM/YYYY").startOf("day").toISOString(),
                $lt: dayjs(req.body.startDate, "DD/MM/YYYY").endOf("day").toISOString(),
            };
        }

        find.$or = [
            {participants: req.body.userId},
            {owner: req.body.userId}
        ]

        const meetings = await Meeting.find(find).populate('owner', '_id fullName phone birthday');
        res.json({
            code: 200,
            data: meetings,
        })
    } catch (error) {
        res.json({
            code: 400,
            message: error.message
        })
    }
}

module.exports.createMeeting = async (req, res) => {
    try {
        const meeting = await new Meeting(req.body);
        await meeting.save();
        res.json({
            code: 200,
            message: 'Create meeting successfully',
        });
    } catch (error) {
        res.json({
            code: 400,
            message: error.message
        });
    }
}

module.exports.updateMeeting = async (req, res) => {
    try {
        await Meeting.updateOne({_id: req.params.id}, req.body);
        res.json({
            code: 200,
            message: 'Update meeting successfully',
        });
    } catch (error) {
        res.json({
            code: 400,
            message: error.message
        })
    }
}

module.exports.deleteMeeting = async (req, res) => {
    try {
        await Meeting.updateOne({_id: req.params.id}, {deleted: true});
        res.json({
            code: 200,
            message: 'Delete meeting successfully',
        });
    } catch (error) {
        res.json({
            code: 400,
            message: error.message
        })
    }
}