require('../src/db/mongoose')
const Tasks = require('../src/models/tasks')

// Tasks.findByIdAndDelete('63edd65b575808eb1a945ece') .then((task)=> {
//     console.log(task)
//     return Tasks.countDocuments({completed:false})
// }).then( (task) => {
//     console.log(task)
// }).catch( (e) => {
//     console.log(e)
// })

const taskDeleteCount = async (id) =>{

    await Tasks.findByIdAndDelete(id)
    const count= await Tasks.countDocuments({completed:false})
    return count
}

taskDeleteCount('63edcdbd2a278d29c6a14eee').then( (result)=>{
    console.log(result)
}).catch( (e) => {
    console.log(e)
})

