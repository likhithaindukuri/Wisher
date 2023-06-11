const express=require('express')

const router=express.Router()

//GET all wishes
router.get('/',(req,res)=>{
    res.json({mssg:'GET all wishes'})
})

//GET a single wish
router.get('/:id',(req,res)=>{
    res.json({mssg:'GET a single wish'})
})

//POST a new wish
router.get('/',(req,res)=>{
    res.json({mssg:'POST a new wish'})
})

//DELETE a wish
router.delete('/:id',(req,res)=>{
    res.json({mssg:'DELETE a wish'})
})

//UPDATE a wish
router.patch('/:id',(req,res)=>{
    res.json({mssg:'UPDATE a wish'})
})

module.exports=router