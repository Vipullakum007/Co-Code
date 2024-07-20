const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room-controller');

router.route("/create").post(roomController.createRoom);
router.route("/message").post(roomController.sendMessage);
// router.route("/messages/:roomId").get(roomController.getMessages);
// router.route("/users/:id").get(authMiddleware,adminMiddleware,adminController.getUserById);
module.exports = router;
