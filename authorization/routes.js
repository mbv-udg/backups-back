const router = require("express").Router();

// Controller Imports
const AuthorizationController = require("./controllers/AuthorizationController");

// JSON Schema Imports for payload verification
const loginInput= require("./schemas/loginInput");
const refreshTokenInput= require("./schemas/refreshTokenInput");

// Middleware Imports
const SchemaValidationMiddleware = require("../common/SchemaValidationMiddleware");

router.post(
  "/login",
  [SchemaValidationMiddleware.verify(loginInput)],
  AuthorizationController.login
);

router.post(
  "/token",
  [SchemaValidationMiddleware.verify(refreshTokenInput)],
  AuthorizationController.token
);

module.exports = router;