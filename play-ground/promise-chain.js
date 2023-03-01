require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('63edcdd8c7f99b5d3c99d3d9', {age:11}).then( (user)=>{
//     console.log(user)
//     return User.countDocuments({age:22})
// }).then( (result) => {
//     console.log(result)
// }).catch( (e) => {
//     console.log(e)
// })


const updateAgeCount = async(id,age) => {
    const user = await User.findByIdAndUpdate(id,{age})
    const count = await User.countDocuments({age:22})
    return count
}

updateAgeCount('63edcdd8c7f99b5d3c99d3d9',21).then( (count) => {
    console.log(count)
}).catch( (e)=>{
    console.log(e)
})
