const mongoose = require('mongoose')

// image
// flight number
// name
// details
// date UTC.

const Joi = require('Joi')

const launchSchema = new mongoose.Schema({
    image:{
        small:{
            type: String
        },
        large: {
            type: String
        }
    },
    flight_no: {
        type: Number
    },
    name: {
        type: String
    },
    details: {
        type: String
    },
    date_utc: {
        type: String
    },
    id: {
        type: String    }
})

const Launch = mongoose.model('Launch', launchSchema)

exports.Launch = Launch;