const express = require('express')
const {
  getWishes, 
  getWish, 
  createWish, 
  deleteWish, 
  updateWish
} = require('../controllers/wishController')
const requireAuth=require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// GET all wishes
router.get('/', getWishes)

// GET a single wish
router.get('/:id', getWish)

// POST a new wish
router.post('/', createWish)

// DELETE a wish
router.delete('/:id', deleteWish)

// UPDATE a wish
router.patch('/:id', updateWish)

module.exports = router