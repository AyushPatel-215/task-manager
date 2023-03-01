const express = require('express')
const router = new express.Router()
const Tasks = require('../models/tasks')
const auth = require('../middleware/auth')

router.post('/task',auth, async (req,res) => {

    const task = new Tasks({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.send(task).status(200)
    } catch (error) {
        res.send(error).status(400)
    }

  
})


// fetch all tasks 
router.get('/tasks',auth, async (req,res)=>{

    const match ={}
    const sort ={}
   
        if(req.query.completed=='true'){
            match.completed = 'true'
        }else if(req.query.completed=='false'){
            match.completed = 'false'
        }

        if(req.query.sortBy){
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] == 'aesc'?-1:1 
        }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        })  
        res.send(req.user.tasks)
    } catch (error) {
        res.send(error).status(500)
    }

    // Tasks.find({}).then( (task) =>{
    //     res.send(task)
    // }).catch( (e)=>{
    //     res.send(e).status(500)
    // })

})

//fetch perticular task using id
router.get('/tasks/:id',auth ,async (req,res)=>{
    const _id = req.params.id

    try {
        const data = await Tasks.findById({_id,owner:req.user._id})
        res.send(data)
    } catch (error) {
        res.send(data).status(404)
    }

})




router.patch('/tasks/:id',auth, async (req,res)=> {
    
    const allowedUpdates = ['description','completed']
    const updates = Object.keys(req.body)
    const isUpdateAllowed = updates.every( (update)=> allowedUpdates.includes(update))

    if(!isUpdateAllowed)
        return res.send('invalid updates').status(301)

    try {
        const task = await Tasks.findOne({_id:req.params.id, owner:req.user._id})
       
        // const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {new:true,runValidators:true})
        if(!task)
            res.send().status(402)

        updates.forEach((update) => task[update] = req.body[update])
        task.save()
        res.send(task).status(200)

    } catch (error) {
        res.send(error)
    }

})
 

router.delete('/tasks/:id',auth, async (req,res)=>{
    try {
        const task = await Tasks.findOneAndDelete({_id:req.params.id,owner:req.user._id })
        if(!task)
            return res.send().status(403)
        res.send(task)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router
