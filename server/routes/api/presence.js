const express = require('express');
const router = express.Router();
const service = require('../../services/presence');
const { userPassport } = require("@/config/passport");

router.get('/:filter',userPassport.authenticate('jwt', {session: false}), ...service.filter)
router.post('/',userPassport.authenticate('jwt', {session: false}), ...service.create)
router.put('/:id',userPassport.authenticate('jwt', {session: false}), ...service.update)
module.exports = router;