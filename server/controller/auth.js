const User = require('../models/User');
const users = require('../models/User');

//@desc Register
//@desc POST /api/v1/Auth/register
//@access Public
exports.register = (async(req,res,next)=>{
    try {
        const { username , password} = req.body;
        //create user
        const user = await users.create ({
            username,
            password
        });
        //Create token
       sendTokenResponse(user,200,res)
    } catch (err) {
        res.status(400).json({message:'Please fill up all fields / Username Already Exist'})
    }
  
}); 




//@desc Log in
//@desc POST /api/v1/Auth/login
//@access Public
exports.login = (async(req,res,next)=>{
    const { username , password} = req.body;
 
    //Validate username and passowrd
    if(!username||!password) {
          return next(res.status(400).json({
            success:false,
            data:'Please provide an email and password'
        }))
    }
    //Check for user
    const user = await users.findOne({ username }).select('+password');
    if(!user) {
        return next(res.status(401).json({
            success:false,
            data:'invalid credentials'
        }))
    }
    //check if password matches
    const isMatch = await user.matchPassword(password)
    if(!isMatch) {
        return next(res.status(401).json({
            success:false,
            data:'invalid credentials'
        }))
    }
    //Create token
   sendTokenResponse(user,200,res)
}); 



// Get token from model,create cookie and send response
const sendTokenResponse = (user,statusCode,res) => {
    //Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + 30*24*60*60*1000),
        httpOnly: true,
        secure: true
    }
    res
    .status(statusCode)
    .cookie('token',token,options)
    .json({
        success:true,
        token
    })
}

//@desc Get current login user
//@desc POST /api/v1/Auth/me
//@access Private
exports.getMe = (async (req , res , newxt)=> {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
        success:true,
        data:user
    })
});