require('dotenv').config()

const express=require('express')
const mongoose=require('mongoose')
const wishRoutes=require('./routes/wishes')
const userRoutes=require('./routes/user')

//express app
const app=express()

//middleware
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

//routes
app.use('/api/wishes',wishRoutes)
app.use('/api/user',userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    //listen for requests
    app.listen(process.env.PORT,()=>{
        console.log('listening on port 4000',process.env.PORT)
    })
})
.catch((error)=>{
    console.log(error)
})


