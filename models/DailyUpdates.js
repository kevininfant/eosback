const mongoose = require('mongoose')
const CONFIG = require('../config/config')
const Schema = mongoose.Schema

const DailyUpdatesSchema = new mongoose.Schema({
    Name: {
        type: String
    },

    description: {
        type: String
    },

    department: {
        type: String,
        
    },


}, { timestamps: true })


DailyUpdatesSchema.methods.toWeb = function() {
    let json = this.toJSON()
    json.id = this._id //this is for the front end
    return json
}

module.exports = mongoose.model('DailyUpdate', DailyUpdatesSchema)