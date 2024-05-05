const mongoose = require('mongoose');
const db = require("../config/db");
const { Schema } = mongoose;

const CourseSchema = new Schema({
    name:{
        type:String,
       
    },
    ImageUrl:{
        type:String,
    },
    description:{
        type: {},
    
    },
startdate:{type:String},
time:{type:String},
    users:{
        type: [Schema.Types.ObjectId],
        ref: "users",
        default: []
    },
    price:{
        type: Number
    },
    instructor:{
        type:String
    },
    lecture:{
        type: [Schema.Types.ObjectId],
        ref: "lecture",
        default: []
    },mode:{type:String},
    students:{
        type:Array
    },
    progress:{
        type:Array
    },
    updatedOn: { type: Date },
    createdOn: { type: Date }
});

CourseSchema.pre('save', async function(next) {
   
    this.updatedOn = new Date();
    this.createdOn = new Date();

    
    next();
});

CourseSchema.pre('findOneAndUpdate', function(next) {


    const update = this.getUpdate();
    delete update._id;

    this.updatedOn = new Date();

    
     

    next();

    // Hash the password
    
});


const courseModel = db.model('courses',CourseSchema);

module.exports = courseModel;
