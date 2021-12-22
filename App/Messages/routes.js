const express = require('express');
const middleware = require('../../Functions/Middlewares');
const Controller = require('./controller');

const router = express.Router();

router.post('/',middleware.authenticateToken, Controller.Create);
router.get('/', middleware.authenticateToken, Controller.List);
router.get('/:id', middleware.authenticateToken, Controller.Read);
router.patch('/:id', middleware.authenticateToken, Controller.Update);
router.delete('/:id', middleware.authenticateToken, Controller.Delete);
router.patch('/read/:id', middleware.authenticateToken, Controller.readMessages);

module.exports = router;