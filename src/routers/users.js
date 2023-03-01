const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')


router.post('/users' ,async (req,res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.genrateAuthToken()
        res.send({user,token}).status(201)
    } catch (error) {
        res.send(error).status(400)
    }

})


// fetch all the data
router.get('/users/me',auth, async (req,res)=>{

    console.log("this is me")
    res.send(req.user)

   
})
router.post('/users/logout',auth ,async (req,res) =>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }

})

router.post('/users/logoutAll', async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    } 
})

router.post('/users/login', async (req,res) => {
    try {
        console.log(req.body)
        const user = await User.findByCredentials(req.body.email ,req.body.password )
        const token = await user.genrateAuthToken()
        console.log(token)
        res.send({user,token})
    } catch (error) {
        console.log(error)
        res.status(400).send()
    }
})
 

router.patch('/users/me',auth, async(req,res)=> {
    
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every( (update)=> allowedUpdates.includes(update))

    if(!isValidOperation)
        return res.status(400).send({ error:'invlid updates'})
 
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        req.user.save()
        res.send(req.user)

    } catch (error) {
        res.send(error)
    }

})

router.delete('/users/me',auth, async (req,res) => {
        
    try {
        await req.user.remove()
        res.send(req.user)

    } catch (error) {
        res.send(error)
    }
})


const upload = multer({
    limits:{
        fileSize:300000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpge)/)){
           
            return cb(new Error("Upload only jpg."))
        }
        cb(undefined,true)
    }
})

router.post('/users/me/avatar',auth,upload.single('avatar') ,async (req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
    // req.user.avatar =   req.file.buffer 
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error: error.message })
})

router.delete('/users/me/avatar',auth, async(req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})


router.get('/users/:id/avatar', async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        
        if (!user || !user.avatar) {
            throw new Error()
        }
        
        res.set('Content-Type','image/jpg')
        res.send(user.avatar)

    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router