const express = require('express');
const middleware = require('../../Functions/Middlewares');
const Controller = require('./controller');

const router = express.Router();

router.post('/', Controller.Create);
router.post('/login', Controller.Login);
router.post('/sociallogin', Controller.socialLogin);
router.get('/', middleware.authenticateToken, Controller.List);
router.post('/forgotpassword', Controller.forgotPassword);
router.post('/changepassword', middleware.decryptPasswordToken, Controller.changePassword);
router.post('/verify', middleware.authenticateToken, Controller.Verify);
router.patch('/:id', middleware.authenticateToken, Controller.Update);
router.delete('/:id', middleware.authenticateToken, Controller.Remove);
router.get('/:id', middleware.authenticateToken, Controller.View);
router.patch('/updatepassword/:id', middleware.authenticateToken, Controller.updatePassword);
router.patch('/register/:token', Controller.updatePasswordByLink);

module.exports = router;