const express = require('express');
const managerController = require("../controller/manager.controller")
const jobsController = require('../controller/jobs.controller')
const { verifyToken } = require("../middleware/verifyToken")
const authorization = require("../middleware/authorization")

const router = express.Router();

router.get("/jobs", verifyToken, authorization("hiring Manager", "admin"), managerController.getJobs)
router.get("/jobs/:id", verifyToken, authorization("hiring Manager", "admin"), jobsController.getSpecificJob)

module.exports = router;
