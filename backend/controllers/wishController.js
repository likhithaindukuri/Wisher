const Wish= require('../models/wishModel')
const mongoose = require('mongoose')

// get all wishes
const getWishes = async (req, res) => {

  const user_id=req.user._id
  const wishes = await Wish.find({user_id}).sort({date: 1})

  res.status(200).json(wishes)
}

// get a single wish
const getWish = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such wish'})
  }

  const wish = await Wish.findById(id)

  if (!wish) {
    return res.status(404).json({error: 'No such wish'})
  }

  res.status(200).json(wish)
}

// create a new wish
const createWish = async (req, res) => {
  const {title, text, date,email} = req.body

  let emptyFields=[]

  if(!title){
    emptyFields.push('title')
  }
  if(!text){
    emptyFields.push('load')
  }
  if(!date){ 
    emptyFields.push('reps')
  }
  if(!email){
    emptyFields.push('email')
  }
  
  if(emptyFields.length>0){
    return res.status(400).json({error:'Please fill in all the fields',emptyFields})
  }


  
  // add to the database
  try {
    const user_id=req.user._id
    const wish = await Wish.create({ title, load, date,user_id,email })
  
    res.status(200).json(wish)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a wish
const deleteWish = async (req, res) => {
    const {id}=req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such wish'})
    }

    const wish=await Wish.findOneAndDelete({_id:id})

    if (!wish) {
        return res.status(400).json({error: 'No such wish'})
    }

    res.status(200).json(wish)
}

// update a wish
const updateWish = async (req, res) => {
    const {id}=req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such wish'})
    }

    const wish=await Wish.findOneAndDelete({_id:id},{
        ...req.body
    })

    if (!wish) {
        return res.status(400).json({error: 'No such wish'})
    }

    res.status(200).json(wish)
}

module.exports = {
  getWishes,
  getWish,
  createWish,
  deleteWish,
  updateWish,
  createWish
}