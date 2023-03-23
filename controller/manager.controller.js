const jwt = require("jsonwebtoken")
const { promisify } = require("util");
const { findSpecificManagerJobs } = require("../services/manager.service");

exports.getJobs = async (req, res) => {
    try {
        const token = req?.headers?.authorization?.split(" ")?.[1];

        const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET)
        req.user = decoded;

        const managerJobs = await findSpecificManagerJobs(req.user);

        res.status(200).json({
            status: "Success",
            message: "Successfully fetched jobs",
            data: managerJobs
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Couldn't get jobs",
            error: error.message
        })
    }
}
