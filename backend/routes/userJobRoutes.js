const { Router } = require('express');
const userJobController = require("../controllers/userJob");
const router = Router();
const protection = require('../middleware/authMiddleware');

router.patch('/user/completeProfile/:id', protection, userJobController.updateProfile);

module.exports = router;