const mongoose =require('mongoose')

const Schema=mongoose.Schema

const wishSchema=new Schema({
    Wish:{
        type:String,
        required:true                                                       
    },
    
})