const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    _id : {
        type : Number
    },
    discipline: {
        type: String,
        enum: ['RN', 'LPN/LVN', 'Physical Therapist']
    },
    specialty_required: {
        type: String,
        enum: ['ICU', 'PCU', 'DIALYSIS', 'CVOR'],
        min : 1,
        max : 1
    },
    job_type: {
        type: String,
        enum: ['full-time', 'part-time', 'freelance', 'contract'],
        min: 1
    },
    pay_amount: {
        type: Number,
        min : 1000,
        max : 10000
    }
})

const Jobs = mongoose.model('Job', jobSchema)

exports.Jobs = Jobs;