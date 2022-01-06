const mongoose = require('mongoose')

const applicantSchema = new mongoose.Schema({
    _id : {
        type : Number
    },
    candidate_id: {
        type: Number,
        ref: 'Candidate'
    },
    job_id: {
        type: Number,
        ref: 'Job'
    }
})

const Applicants = mongoose.model('Applicant', applicantSchema)

exports.Applicants = Applicants;