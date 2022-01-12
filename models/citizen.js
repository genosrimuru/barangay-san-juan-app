const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const newcitizen = new Schema({
    Name:{
        type: String
    },
    Age:{
        type: Number
    },
    Gender:{
        type: String
    },
    CivilStatus:{
        type: String
    },
    Zone:{
        type: Number
    },
    Work:{
        type: String
    },
    Income:{
        type: String
    },
    Budget:{
        type: String
    },
    SocialClass:{
        type: Number
    },
    EducationalAttainment: {
        type: String
    }
})

const Citizen = mongoose.model('citizen', newcitizen)
module.exports = Citizen
