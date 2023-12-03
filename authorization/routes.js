const router = require("express").Router();

// Controller Imports
const AuthorizationController = require("./controllers/AuthorizationController");

// JSON Schema Imports for payload verification
const loginInput= require("./schemas/loginInput");

// Middleware Imports
const SchemaValidationMiddleware = require("../common/SchemaValidationMiddleware");

router.post(
  "/login",
  [SchemaValidationMiddleware.verify(loginInput)],
  AuthorizationController.login
);

module.exports = router;