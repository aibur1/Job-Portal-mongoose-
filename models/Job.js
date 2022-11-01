  const mongoose = require("mongoose");
const validator = require("validator")
const { ObjectId } = mongoose.Schema.Types;

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a name"],
        minLength: [3, "Name is too short"],
        maxLength: [100, "Name is too long"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please provide a description"]
    },
    salary: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    job_type: {
        type: String,
        required: true,
    },
    id: {
        type: ObjectId,
        required: true,
    },
    candidates_applied: [
        {
            id: {
                type: ObjectId
            },
            name: {
                type: String
            },
            email: {
                type: String,
                validate: [validator.isEmail, "Please provide a valid email"]
            }
        }
    ],
    deadline: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: 0,
    },
    updateAt: {
        type: Date,
        default: Date.now(),
        select: 0
    }
})

const Jobs = mongoose.model('Job', jobSchema);

module.exports = Jobs;
