const mongoose = require('mongoose');


const NotesSchema = new mongoose.Schema(
    {

            title: {
                type:String,
                trim: true,
                required:[true,'Please add notes name']
            },

            description:
            {
                type:String,
                required:[true,'Please add a description'],
                trim: true,
                maxlength: [500,'Description cannot exceed 500 characters']
            },

            isCompleted: {
                type:Boolean,
                default:false

                } ,
            
            createdAt: {
                type:Date,
                default:Date.now
            },
            user: {
                type: mongoose.Schema.ObjectId,
                ref:'User',
                required:true
            }
    


    }
);


module.exports = mongoose.model('notes',NotesSchema);