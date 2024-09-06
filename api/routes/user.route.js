const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const uploadToCloudMiddleware = require('../middlewares/uploadToCloud.middleware');
const multer  = require('multer');
const upload = multer();

router.post('/', authMiddleware.authRequired(['admin', 'user', 'staff', 'doctor']), userController.getUsers);

router.get('/:id', authMiddleware.authRequired([]), userController.getUserById);

router.patch('/temp-delete', authMiddleware.authRequired(['admin']), userController.tempDeleteUser);

router.patch('/change-status', authMiddleware.authRequired(['admin']), userController.changeStatus);

router.post('/create', authMiddleware.authRequired(['admin']), userController.createUser);

router.patch(
    '/update',
    authMiddleware.authRequired([]),
    upload.single('photo'),
    uploadToCloudMiddleware.uploadFile,
    userController.updateUser
);

module.exports = router;
