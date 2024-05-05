const mongoose = require('mongoose');
const db = require("../config/db");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        require: true,
    },
    email:{
        type:String,
        // require:true
        default:null
    },
    password:{
        type:String,
        require:true,
    },
    phone:{
        type:Number,
        default:null
        // require:true,
        // unique: true
    },
    bio:{
        type:String,
        default:null
    },
    niche:{type:String,default:null},
    groups:{
        type: [Schema.Types.ObjectId],
        ref: "groups"
    },
    imgUrl: {
        type: String,
        default:""
    },
    saved:{
        type: [Schema.Types.ObjectId],
        ref: "posts"
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    courses:{
        type:Array
    },
    updatedOn: { type: Date },
    createdOn: { type: Date }
})

userSchema.pre('save', async function(next) {
   
    this.updatedOn = new Date();
    this.createdOn = new Date();

   
    if(!this.isModified("password")){
        console.log("hahaha")
        return
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password,salt);
        this.password = hash;
        console.log(hash)
    }catch(err){
        throw err;
    }

    // Hash the password
    
    next();
});

userSchema.pre('findOneAndUpdate', function(next) {


    const update = this.getUpdate();
    delete update._id;

    this.updatedOn = new Date();

    
     

    next();

    // Hash the password
    
});


userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        //console.log('----------------no password',this.password);
        // @ts-ignore
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
        // if(candidatePassword == this.password){
        //     return true
        // }else{
        //     return false
        // }

    } catch (error) {
        throw error;
    }
};

const userModel = db.model('users',userSchema);

module.exports = userModel;
