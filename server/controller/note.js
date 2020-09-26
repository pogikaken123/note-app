const notes = require('../models/Note');

//@desc Get all Note
//@desc Get /api/v1/Note
//@access Private
exports.getNotes = (async(req,res,next)=>{
        try {
            console.log(req.user.id)
            const id = req.user.id
            const note = await notes.find({user: id});
            // if(!note){
            //     return next(res.status(200).json({
            //         success:true,
            //         data:'no note found by that id'
            //     }))
            // }
            res.status(200).json({success: true ,count:note.length, data: note});
        } catch (err) {
            console.log(err);
        }
      
});


//@desc Create notes of id
//@desc POST /api/v1/notes
//@access Private


exports.createNotes = (async(req,res,next ) => {
    //Add User
    try {

        req.body.user = req.user.id;
        const note = await notes.create(req.body);
        res.status(201).json({
            success:true,
            data:note
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success:false,
            data:"Please fillup the required fields"
        })
    }

})


//@desc Get all notes of one id
//@desc Get /api/v1/notes/:id
//@access Private
exports.getNote = (async(req,res,next)=> {
    try {
        const note = await notes.findById(req.params.id);
        if(!note) {
            return next(res.status(404).json({
                success:false,
                data:'no note found by that id'
            }))
        }
        res.status(200).json({success: true , data: note});
        
    } catch (err) {
        res.status(400).json({success:false,error:'Please check your id length'})
    }
  
});
//@desc Delete all notes of one id
//@desc Delete /api/v1/notes/:id
//@access Private

exports.deleteNote= (async(req,res,next)=>{

    try {
        const note = await notes.findByIdAndDelete(req.params.id);
        if(!note) {
            return next(res.status(404).json({
                success:false,
                data:'no note found by that id'
            }))
        }
        res.status(200).json({success:true,data:{}});
    } catch (err) {
        res.status(400).json({success:false,error:'Please check your id length'})
    }
   

    
});

//@desc update notes of id
//@desc Put /api/v1/notes/:id
//@access Private
exports.updateNote = (async(req,res,next)=>{

    try {
        const note = await notes.findByIdAndUpdate(req.params.id,req.body,{
         new:true,
         runValidators:true
        });
        if(!note) {
            return next(res.status(404).json({
                success:false,
                data:'no note found by that id'
            }))
        }
        res.status(200).json({success:true,data:note})

    } catch (err) {
        res.status(400).json({success:false,error:'Please check your id length'})
    }
     
 });
 
