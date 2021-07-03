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

function validateLaunch(launch){
    const schema = {
        small: Joi.string(),
        large: Joi.string(),
        name: Joi.string(),
        details: Joi.string(),
        name: Joi.string(),
        date_utc: Joi.string(),
        flight_no: Joi.number().integer().positive(),
        id: Joi.string()
    }
    return Joi.validate(launch, schema)
}

exports.Launch = Launch;
exports.validate = validateLaunch;