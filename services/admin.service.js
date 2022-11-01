const User = require("../models/User");
const Jobs = require('../models/Job')

exports.getAllCandidatesService = async () => {
    const candidates = await User.find({"role":{$eq:"candidate"}})
    return candidates;
}
exports.getAllManagersService = async () => {
    const managers = await User.find({"role":{$eq:"hiring Manager"}})
    return managers;
}
exports.getHighestPaidService = async () => {
    const managers = await Jobs.find({}).sort({salary:-1}).limit(10)
    return managers;
}

exports.getCandidateByIdService = async(id)=> {
    // const candidate = await User.find({_id:id});
    //nicher line ki korsi bujte parchina?
    const candidate = await Jobs.find({"_id:id":{$eq:"candidates_applied.id"}});
    return candidate;
}
exports.getMostAppliedJobsServices = async()=> {
    const mostApplied = await Jobs.find({}).sort({candidates_applied:-1}).limit(5)
    return mostApplied;
}