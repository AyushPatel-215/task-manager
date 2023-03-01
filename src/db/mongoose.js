const mongoose = require('mongoose')
// const validator = require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/task-manage-api',{
    useNewUrlParser: true,
    
})



// const user = mongoose.model('users',{
//             name:{
//                 type:String,
//                 require:true,
//                 trim:true
//             },email:{
//                 type:String,
//                 validate(value){
//                     if(!validator.isEmail(value)){
//                         throw new Error('email envalid')
//                     }
//                 }
//             }, passonst task = mongoose.model('Task', {
    // description:{
    //     type:String,
    //     require:true,
    //     trim:true

    // },completed:{
    //     type:Boolean,
    //     default:false validate(value){
//                         if(value.length<6)
//                             throw new Error("password must greater then 6 word")
//                         else if(value=='password')
//                             throw new Error("password not contain password")
//                     }
//             },age:{
//                 type:Number,
//                 default:0,
//                 validate(value){
//                     if(value<0){
//                         throw new Error('age must be provide')
//                     }
//                 }
//             }
//         })
//         
//     }
// })

// const things = new task({
//     description:'Complete node',
//     // completed:true
// })

// things.save().then( ()=>{
//     console.log(things)
// }).catch( (error) => {
//     console.log(error)
// })






// const user = mongoose.model('users',{
//     name:{
//         type:String,
//         require:true,
//         trim:true
//     },email:{
//         type:String,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('email envalid')
//             }
//         }
//     }, password:{
//             type:String,
//             trim:true,
//             validate(value){
//                 if(value.length<6)
//                     throw new Error("password must greater then 6 word")
//                 else if(value=='password')
//                     throw new Error("password not contain password")
//             }
//     },age:{
//         type:Number,
//         default:0,
//         validate(value){
//             if(value<0){
//                 throw new Error('age must be provide')
//             }
//         }
//     }
// })

// const me = new user({
//     name:'Ayush',
//     email:'Ayush322@gmail.com',
//     password:'password',
//     age:22
// })

// me.save().then( ()=> {
//     console.log(me)
// }).catch( (error) => {
//     console.log(error)
// })