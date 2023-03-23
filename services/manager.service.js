const Job = require("../models/Job")

exports.findSpecificManagerJobs = async (data) => {
    const jobs = await Job.find({ id: data.id })
    return jobs;
}
