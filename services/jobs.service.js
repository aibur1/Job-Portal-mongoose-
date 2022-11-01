const Jobs = require("../models/Job")
const User = require("../models/User")

exports.getJobsService = async (filter, queries) => {
    const jobs = await Jobs.find(filter)
        .skip(queries.skip)
        .limit(queries.limit)
        .sort(queries.sortBy)
        .select(queries.fields)
    return jobs;
}

exports.getSpecificJobService = async (id) => {
    const job = await Jobs.findOne({ _id: id });
    return job;
}

exports.saveAJobService = async (data) => {
    const job = await Jobs.create(data);
    return job;
}

exports.updateJobService = async (id, data) => {
    const Job = await Jobs.updateOne({ _id: id }, data, {
        runValidators: true
    });
    return Job;
}

exports.getAppliedJob = async (data) => {
    const user = await User.findOne({ email: data.user.email });
    const { jobId } = data;

    const res = await Jobs.updateOne(
        { _id: jobId },
        { $push: { candidates_applied: { id: user._id, name: user.name, email: user.email } } }
    )

    return res;
}
