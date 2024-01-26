const Wish= require('../models/wishModel')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer');

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
  const {title, text, date,time,email} = req.body

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
  if(!time){
    emptyFields.push('time')
  }
  
  if(emptyFields.length>0){
    const user_id = req.user._id;
    return res.status(400).json({error:'Please fill in all the fields',emptyFields})
  }


  
  // add to the database
  try {
    const user_id=req.user._id
    const wish = await Wish.create({ title, text, date,time,user_id,email})
  

    // Send email to the specified recipient
    sendEmailNotification(email, title, date, time);

    res.status(200).json(wish);

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const sendEmailNotification = (email, title, date, time) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'likhithaindukuri117@gmail.com',
      pass: 'uioi jihe iygm zxgm',
    },
  });

  const mailOptions = {
    from: 'likhithaindukuri07@gmail.com',
    to: email,
    subject: 'New Wish Notification',
    text: ` ${text}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

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