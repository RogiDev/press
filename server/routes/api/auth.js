const express = require('express');
const router = express.Router();
const service = require('@/services/auth');
const middlewares = require('@/middlewares');
const { userPassport } = require("@/config/passport");

router.post('/login', ...service.login);
router.post('/register', ...service.create);
router.post('/logout',userPassport.authenticate('jwt', {session: false}), ...service.logout);

module.exports = router;
