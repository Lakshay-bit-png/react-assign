const mongoose = require('mongoose');
const db = require("../config/db");
const { Schema } = mongoose;

const lectureSchema = new Schema({
    name:{
        type:String,
        
    },
    ImageUrl:{
        type:String,
    },
    description:{
        type: {},
        
    },
    videoUrl:{
        type: String
    },
    course:{
        type: Schema.Types.ObjectId,
        ref: "course",
        default: []
    },
    updatedOn: { type: Date },
    createdOn: { type: Date }
});

lectureSchema.pre('save', async function(next) {
   
    this.updatedOn = new Date();
    this.createdOn = new Date();

    next();
});

lectureSchema.pre('findOneAndUpdate', function(next) {


    const update = this.getUpdate();
    delete update._id;

    this.updatedOn = new Date();

    next();
    // Hash the password
    
});


const lectureModel = db.model('lecture',lectureSchema);

module.exports = lectureModel;
