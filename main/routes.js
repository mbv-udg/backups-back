const router = require("express").Router();

// Controller Imports
const MainController = require("./controllers/MainController.js");

// Middleware Imports
const isAuthenticatedMiddleware = require("../common/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/SchemaValidationMiddleware");

// JSON Schema Imports for payload verification
const recoverFileInput = require("./schemas/recoverFileInput");
const recoverDbInput = require("./schemas/recoverDbInput");
const backupFiles = require("./schemas/getBackupFilesInput");

router.get(
  "/",
  [isAuthenticatedMiddleware.check],
  MainController.getAllBackups
);

router.get(
  "/files",
  [isAuthenticatedMiddleware.check],
  MainController.getFilesBackups
);

router.get(
  "/db",
  [isAuthenticatedMiddleware.check],
  MainController.getDbBackups
);

router.post(
  "/:backup",
  [isAuthenticatedMiddleware.check,
    SchemaValidationMiddleware.verify(backupFiles)],
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