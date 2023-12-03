const router = require("express").Router();

// Controller Imports
const MainController = require("./controllers/MainController.js");

// Middleware Imports
const isAuthenticatedMiddleware = require("../common/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/SchemaValidationMiddleware");

// JSON Schema Imports for payload verification
const recoverFileInput = require("./schemas/recoverFileInput");

router.get(
  "/",
  [isAuthenticatedMiddleware.check],
  MainController.getAllBackups
);

/*router.get(
  "/:backup/:dirName",
  [isAuthenticatedMiddleware.check],
  MainController.getBackupDir
);*/

module.exports = router;