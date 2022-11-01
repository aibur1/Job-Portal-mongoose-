const Job = require("../models/Job")

exports.findSpecificJobs = async (data) => {
    const jobs = await Job.find({ id: data.id })
    console.log(data, jobs);
    return jobs;
}
