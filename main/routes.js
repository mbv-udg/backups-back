const router = require("express").Router();

// Controller Imports
const MainController = require("./controllers/MainController.js");

// Middleware Imports
const isAuthenticatedMiddleware = require("../common/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/SchemaValidationMiddleware");

// JSON Schema Imports for payload verification
const recoverFileInput = require("./schemas/recoverFileInput");
const recoverDbInput = require("./schemas/recoverDbInput");

router.get(
  "/",
  [isAuthenticatedMiddleware.check],
  MainController.getAllBackups
);

router.get(
  "/:backup/:dirName?",
  [isAuthenticatedMiddleware.check],
  MainController.getBackupDir
);

router.post(
  "/recover/db",
  [isAuthenticatedMiddleware.check,
    SchemaValidationMiddleware.verify(recoverDbInput)],
  MainController.recoverDB
);

router.post(
  "/recover/files",
  [isAuthenticatedMiddleware.check,
    SchemaValidationMiddleware.verify(recoverFileInput)],
  MainController.recoverFiles
);

module.exports = router;