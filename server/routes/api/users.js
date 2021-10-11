const express = require('express');
const router = express.Router();
const service = require('@/services/users');
const authService = require('@/services/auth')
const { userPassport } = require("@/config/passport");

router.get("/",userPassport.authenticate('jwt', {session: false}),  ...service.fetch);
router.get("/:id",userPassport.authenticate('jwt', {session: false}), ...service.getById);
router.put("/:id",userPassport.authenticate('jwt', {session: false}), ...service.update);
router.delete("/:id",userPassport.authenticate('jwt', {session: false}), ...service.remove);
router.post("/",userPassport.authenticate('jwt', {session: false}),...authService.create)

module.exports = router;
