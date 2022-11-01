const { getJobsService, getSpecificJobService, saveAJobService, updateJobService, getAppliedJob } = require("../services/jobs.service");

exports.getJobs = async (req, res) => {
    try {
        let filters = { ...req.query };
        const excludeFields = ['sort', 'page', 'limit'];

        excludeFields.forEach(field => delete filters[field]);

        let filterStrings = JSON.stringify(filters);

        filterStrings = filterStrings.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        filters = JSON.parse(filterStrings);

        const queries = {};

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join();
            queries.sortBy = sortBy;
        }
        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            queries.fields = fields;
        }
        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * parseInt((limit));
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }

        const jobs = await getJobsService(filters, queries)

        res.status(200).json({
            status: "Success",
            message: " Successfully got all jobs",
            data: jobs
        })
    } catch (error) {
        res.status(200).json({
            status: "fail",
            message: "failed to get all jobs",
            error: error.message
        })
    }
}

exports.getSpecificJob = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await getSpecificJobService(id)

        if (!job) {
            res.status(400).json({
                status: "fail",
                message: "Couldn't get job with this id",
                error: "Job not found with this id"
            })
        }

        res.status(200).json({
            status: "Success",
            message: "Successfully found job",
            data: job
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Failed to get job",
            error: error.message
        })
    }
}

exports.saveAJob = async (req, res) => {
    try {
        const job = await saveAJobService(req.body);

        res.status(200).json({
            status: "Success",
            message: "Successfully saved job",
            data: job
        })
    } catch (error) {
        res.status(200).json({
            status: "fail",
            message: "Failed to get job",
            error: error.message
        })
    }
}

exports.updateJob = async (req, res) => {
    console.log("tor ki problem -->",req.body)
    const { id } = req.params;
    try {
        const result = await updateJobService(id, req.body);

        if (!result.modifiedCount) {
            return res.status(400).json({
                status: "Fail",
                message: "Failed to update job",
                error: "Couldn't update job"
            })
        }

        res.status(200).json({
            status: "Success",
            message: "Successfully updated job",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Failed to update job",
            error: error.message
        })
    }
}

exports.applyToJob = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await getSpecificJobService(id)

        if (!job) {
            res.status(400).json({
                status: "fail",
                message: "Couldn't get job with this id",
                error: "Job not found with this id"
            })
        }

        const newObject = { jobId: id, user: req.user }

        const applied = await getAppliedJob(newObject);

        res.status(200).json({
            status: "Success",
            message: "Successfully applied to job",
            data: applied
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't apply to job",
            error: error.message
        })
    }
}
