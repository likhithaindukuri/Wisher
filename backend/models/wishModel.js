const { getTime } = require('date-fns')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const wishSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  load: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  user_id:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  }
}, { timestamps: true })

module.exports = mongoose.model('Wish', wishSchema)