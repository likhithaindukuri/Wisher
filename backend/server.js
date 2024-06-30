require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const wishRoutes = require('./routes/wishes');
const userRoutes = require('./routes/user');

// Express app
const app = express();

// Middleware
app.use(express.json());

// Add CORS middleware before your routes
app.use(cors({
  origin: ['https://wisher-tau.vercel.app','https://wisher-m7mm0h7y3-indukuri-likhithas-projects.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/wishes', wishRoutes);
app.use('/api/user', userRoutes);

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log('listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
