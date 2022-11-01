const express = require('express');
const adminController = require("../controller/admin.controller")

const { verifyToken } = require("../middleware/verifyToken")

const router = express.Router();

router.get("/candidates/:id", verifyToken, adminController.getCandidateById)
router.get("/candidates", verifyToken, adminController.getAllCandidates)
router.get("/managers", verifyToken, adminController.getAllManagers)
router.get("/highest-paid", verifyToken, adminController.getHighestPaidJob)
router.get("/most-applied", verifyToken, adminController.getMostAppliedJobs)

module.exports = router;
