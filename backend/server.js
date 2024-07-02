require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/userModel');
const wishRoutes = require('./routes/wishes');
const userRoutes = require('./routes/user');

// Create Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies

// CORS Configuration
app.use(cors({
  origin: 'http://wisher-xi.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
}));

// Logging middleware to log incoming requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Authentication middleware
const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      const user = await User.findById(decodedToken.userId);
      if (!user) {
        throw new Error('User not found');
      }
      req.user = user;
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ error: 'Unauthorized' });
    }
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Routes
app.use('/api/wishes', requireAuth, wishRoutes);
app.use('/api/user', userRoutes); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  // Start the server after MongoDB is connected
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = app;
