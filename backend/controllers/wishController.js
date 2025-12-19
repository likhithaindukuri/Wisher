const Wish = require('../models/wishModel');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');

// Get all wishes
const getWishes = async (req, res) => {
  const user_id = req.user._id;
  try {
    const wishes = await Wish.find({ user_id }).sort({ date: 1 });
    res.status(200).json(wishes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single wish
const getWish = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such wish' });
  }

  try {
    const wish = await Wish.findById(id);
    if (!wish) {
      return res.status(404).json({ error: 'No such wish' });
    }
    res.status(200).json(wish);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new wish
const createWish = async (req, res) => {
  const { title, text, date, time, email } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!text) {
    emptyFields.push('load');
  }
  if (!date) {
    emptyFields.push('reps');
  }
  if (!email) {
    emptyFields.push('email');
  }
  if (!time) {
    emptyFields.push('time');
  }

  if (emptyFields.length > 0) {
    const user_id = req.user._id;
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
  }

  // Check if the specified time is greater than the current time
  const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
  const selectedDateTime = new Date(`${date}T${time}`);

  // Check if the date is in the past
  if (selectedDateTime < new Date()) {
    return res.status(400).json({ error: 'Selected date should be greater than current date' });
  }

  // Create the wish in the database
  try {
    const user_id = req.user._id;
    const wish = await Wish.create({ title, text, date, time, user_id, email });

    // Schedule the email at the specified date and time
    const scheduledDate = new Date(`${date}T${time}`);
    schedule.scheduleJob(scheduledDate, async function () {
      try {
        await sendEmailNotification(email, text, title, date, time);
        console.log('Email notification sent successfully');
      } catch (error) {
        console.error('Error sending email notification:', error);
      }
    });

    res.status(200).json(wish);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to send email notification
const sendEmailNotification = async (email, text, title, date, time) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'New Wish Notification',
      text: `${text}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email notification');
  }
};

// Delete a wish
const deleteWish = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such wish' });
  }

  try {
    const wish = await Wish.findOneAndDelete({ _id: id });
    if (!wish) {
      return res.status(400).json({ error: 'No such wish' });
    }
    res.status(200).json(wish);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a wish
const updateWish = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such wish' });
  }

  try {
    const wish = await Wish.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
    if (!wish) {
      return res.status(400).json({ error: 'No such wish' });
    }
    res.status(200).json(wish);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getWishes,
  getWish,
  createWish,
  deleteWish,
  updateWish,
};