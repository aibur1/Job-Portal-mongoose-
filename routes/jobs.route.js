const express = require('express');
const userController = require("../controller/jobs.controller")
const authorization = require("../middleware/authorization");
const { verifyToken } = require('../middleware/verifyToken');
const router = express.Router();

router.route("/")
    .get(userController.getJobs)
    .post(verifyToken, authorization("admin", "hiring Manager"), userController.saveAJob)


router.route("/:id")
    .get(userController.getSpecificJob)
    .patch(verifyToken, authorization("hiring Manager", "admin"), userController.updateJob)

router.post("/:id/apply", verifyToken, userController.applyToJob)

module.exports = router;
