const express = require('express')

const { getNotes , createNotes, getNote, deleteNote, updateNote} = require('../controller/note')
const { protect } = require('../middleware/auth')
const router = express.Router();

router.route('/')
.get(protect,getNotes)
.post(protect,createNotes)

router.route('/:id')
.get(protect,getNote)
.delete(protect,deleteNote)
.put(protect,updateNote)

module.exports=router;