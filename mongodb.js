// const  mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
const {MongoClient,ObjectID, ObjectId} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


const id = new ObjectId()
console.log(id.id.length)


MongoClient.connect(connectionURL, {'useNewUrlParser':true}, (error,client)=>{
    if(error)
        return console.log(error)
    console.log("conection successfull")

    const db = client.db(databaseName)

    db.collection('users').deleteMany({
        age:28
    }).then( (result) => {
        console.log(result)
    }).then ( (error) => {
        console.log(error)
    })


   
    
})

// ------------ Delete User -----------

// const xyz = db.collection('documents').updateMany({
//     completed:false
// },{
//     $set:{
//         completed:true
//     }
// }).then( (result)=> {
//     console.log(result)
// }).catch( (error) => {
//     console.log(error)
// })

// -------------- find user -------------------

// db.collection('documents').find({completed:true}).toArray((error,users)=>{
//     console.log(users)
// })



// -------------- Insert data ------------------

    // db.collection('users').insertOne({
    //     name:'Ayush patel',
    //     age:22
    // }, (error,result) => {
    //     if(error) 
    //         console.log(error)
    //     console.log(result)
    // })

//     db.collection('documents').insertMany([=> {

   
//         {
//         description: 'java script',
//         completed: true
//     },{
//        description: 'node js',
//        completed: true 
//     },{
//         description:'mongo db',
//         completed:false
//     }],
//      (error,result) =>{
//         if(error) console.log(error)

//         console.log(result)
//     })




