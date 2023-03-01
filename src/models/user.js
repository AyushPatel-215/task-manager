const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./tasks')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },email:{   
        type:String, 
        unique: true,
        useCreateIndex: true, 
        autoIndex: true, 
        required:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email envalid')
            }
        }
    }, password:{
            type:String,
            trim:true,
            required:true,
            validate(value){
                if(value.length<6)
                    throw new Errorusers("password must greater then 6 word")
                else if(value=='password')
                    throw new Error("password not contain password")
            }
    },age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('age must be provide')
            }
        }
    },tokens:[{
        token: {
            type:String,
            required:true
        }
    }],avatar:{
        type: Buffer
    }
},{
    timestamps:true
})

userSchema.virtual('tasks',{
    ref:'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function(){
    const user  = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {password
        throw new Error('Unable to login')
    }
    return user
}

userSchema.methods.genrateAuthToken = async function () {
    
    const user = this
    const token =  jwt.sign({_id:user._id.toString()},'thisismine')
    console.log(token)
    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

// hash the plain text password beafore save
userSchema.pre('save',async function (next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    
    console.log('just before saving !.')

    next()
})

// delete user task when user is delete
userSchema.pre('remove',async function(next){
    const user = this
    await Task.deleteMany({owner: user._id})
    next()
})



const User = mongoose.model('users',userSchema)

module.exports = User