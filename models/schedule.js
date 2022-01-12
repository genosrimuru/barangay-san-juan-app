const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const newschedule = new Schema({
    Zone:{
        type: String
    },
    Socialclass:{
        type: String
    },
    Scheduledate:{
        type: String
    },
    Scheduletime:{
        type: String
    },
    Amount:{
        type: Number
    },
   
})

const Schedule = mongoose.model('schedule', newschedule)
module.exports = Schedule
