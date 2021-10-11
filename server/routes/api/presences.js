const express = require('express');
const router = express.Router();
const service = require('@/services/presence');
const { userPassport } = require("@/config/passport");

router.get("/",userPassport.authenticate('jwt', {session: false}), ...service.fetch);
router.get("/:id",userPassport.authenticate('jwt', {session: false}), ...service.getById);
router.put("/:id",userPassport.authenticate('jwt', {session: false}), ...service.update);
router.delete("/:id",userPassport.authenticate('jwt', {session: false}), ...service.delete);
router.post("/",userPassport.authenticate('jwt', {session: false}),...service.create)



module.exports = router;