const jwt = require('jsonwebtoken');
const User = require('../models/User')

//protect routes

exports.protect = (async(req ,res ,next)=> {
    let token;


 if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
 }

 else if(req.cookies.token){
     token = req.cookies.token
 }

 if(!token) {
     return next(res.status(401).json({success:false,Message:'Not Authorize to access this route'}))
 }
 try {
     //verify token
     const decoded= jwt.verify(token,'shhhh')
     console.log(decoded);
     req.user = await User.findById(decoded.id);
     next();
 } catch (err) {
    return next(res.status(401).json({success:false ,Message:'Not Authorize to access this route'}))
 }
});