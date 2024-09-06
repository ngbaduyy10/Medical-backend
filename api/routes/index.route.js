const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const specialtyRoutes = require('./specialty.route');
const appointmentRoutes = require('./appointment.route');
const medicalRecordRoutes = require('./medicalRecord.route');
const passwordRoutes = require('./password.route');
const medicineRoutes = require('./medicine.route');
const orderRoutes = require('./order.route');
const meetingRoutes = require('./meeting.route');
const statisticRoutes = require('./statistic.route');

module.exports = (app) => {
    app.use('/api/user', userRoutes);

    app.use('/api/auth', authRoutes);

    app.use('/api/specialty', specialtyRoutes);

    app.use('/api/appointment', appointmentRoutes);

    app.use('/api/medical-record', medicalRecordRoutes);

    app.use('/api/medicine', medicineRoutes);

    app.use('/api/order', orderRoutes);

    app.use('/api/meeting', meetingRoutes);

    app.use('/api/statistic', statisticRoutes);

    app.use('/api/password', passwordRoutes);
}