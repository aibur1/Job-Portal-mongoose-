const { getAllCandidatesService, getCandidateByIdService, getAllManagersService, updateUserRoleService, getHighestPaidService, getMostAppliedJobsServices,} = require("../services/admin.service");

exports.getAllCandidates = async(req, res) => {
    try {
        const candidates = await getAllCandidatesService();

        res.status(200).json({
            status:'Success',
            message:'Successfully load all candidates!',
            data:candidates
        })
    } catch (error) {
        res.status(500).json({
            status:'fail',
            message:'Can not get candidates!'
        })
    }
}
exports.getAllManagers = async(req, res) => {
    try {
        const managers = await getAllManagersService();

        res.status(200).json({
            status:'Success',
            message:'Successfully get all managers!',
            data:managers
        })
    } catch (error) {
        res.status(500).json({
            status:'fail',
            message:'Can not get managers!'
        })
    }
}
exports.getCandidateById = async(req, res) => {
    const {id} = req.params;
    try {
        const candidate = await getCandidateByIdService(id);
        
        res.status(200).json({
            status:'Success',
            message:'Successfully get candidate details!',
            data:candidate
        })
    } catch (error) {
        res.status(500).json({
            status:'fail',
            message:'Can not get candidate!'
        })
    }
}
exports.getHighestPaidJob = async(req, res) => {
    try {
        const highestPaid = await getHighestPaidService();

        res.status(200).json({
            status:'Success',
            message:'Successfully get highest paid job!',
            data:highestPaid
        })
    } catch (error) {
        res.status(500).json({
            status:'fail',
            message:'Can not get highest Paid Job!'
        })
    }
}
exports.getMostAppliedJobs = async(req, res) => {
    try {
        const mostApplied = await getMostAppliedJobsServices();

        res.status(200).json({
            status:'Success',
            message:'Successfully get most applied jobs!',
            data:mostApplied
        })
    } catch (error) {
        res.status(500).json({
            status:'fail',
            message:'Can not get most applied Jobs!'
        })
    }
}
