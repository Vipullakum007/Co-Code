const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth-controller');
const authValidator = require('../validators/auth-validators');
const { validate } = require('../middleware/validate-middleware');
const authMiddleware = require('../middleware/auth-middleware');

router.route("/register").post(validate(authValidator.sighupSchema), authController.register);
// router.route("/register").post(authController.register);
router.route("/login").post(validate(authValidator.loginSchema), authController.login);
// router.route("/login").post(authController.login);
router.route("/user").get(authMiddleware, authController.user);

module.exports = router
