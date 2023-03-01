const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/users')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000


const multer = require('multer')
const upload = multer({
    dest:'images'
})
app.post('/upload/me', upload.single('avatar'), (req,res)=>{
    res.send()
})
       

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, ()=>{
    console.log('Server is up on port '+port)
})























// const Task = require('./models/tasks')
// const User = require('./models/user')
// const main = async () =>{
//     // const task = await Task.findById('63f85c7e7fa7185cf597db66')
//     // await task.populate('owner')
//     // console.log(task.owner)
//     // const user = await Userss.findById('63f856eadc80257b0ef89ef9')
//     // console.log(user.name)

//     const user =  await User.findById('63f856eadc80257b0ef89ef9')
//     await user.populate('tasks')
//     console.log(user.tasks)
// }
// main()  














// const jwt = require('jsonwebtoken')
// const myfun = async () =>{
//     const token = jwt.sign({_id:'acb43' },'thisismycourse', {expiresIn:'1 seconds'})
//     console.log(token)
    
//     const data =jwt.verify(token,'thisismycourse')
//     console.log(data)
// }
// myfun()
  






// const bcrypt = require('bcryptjs')

// const myFunction = async () =>{
//     const password = 'Ayush123'
//     const hashPass = await bcrypt.hash(password,8)

//     console.log(password)
//     console.log(hashPass)

//     const isMatch = await bcrypt.compare(password,hashPass)
//     console.log(isMatch)
// }

// myFunction()