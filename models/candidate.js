const mongoose = require('mongoose')

const candidateSchema = new mongoose.Schema({
    _id : {
        type : Number
    },
    discipline: {
        type: String,
        enum: ['RN', 'LPN/LVN', 'Physical Therapist']
    },
    specialties: {
        type: String,
        enum: ['ICU', 'PCU', 'DIALYSIS', 'CVOR'],
        min : 2,
        max : 2
    },
    job_type: {
        type: String,
        enum: ['full-time', 'part-time', 'freelance', 'contract'],
        min : 1
    },
    salary: {
        type: Number,
        min : 1000,
        max : 10000
    }
})

const Candidates = mongoose.model('Candidate', candidateSchema)

exports.Candidates = Candidates;