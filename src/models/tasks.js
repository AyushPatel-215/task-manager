const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    description:{
        type:String,
        require:true,
        trim:true

    },completed:{
        type:Boolean,
        default:false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref : 'users'
    }
},{
    timestamps:true
})  

taskSchema.pre('save',async function (next){
    const task = this
    console.log("task is modified..")
    next()
})





const task = mongoose.model('Task', taskSchema)

module.exports = task