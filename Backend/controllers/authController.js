const User = require('../model/User');
const {StatusCodes}= require('http-status-codes');
const customError = require('../errors');

const register = async (req,res) => {
    let {name,email,uid} = req.body;
    if(!email || !uid){
        throw new customError.BadRequestError('Please provide email and uid')
    }
    if(!name){
        name = email.split('@')[0] || 'User';
    }
    // Limit name length if too short or long
    if (name.length < 2) {
        name = name + "_user";
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            // Update uid if not set
            if (!user.uid) {
                user.uid = uid;
                await user.save();
            }
            return res.status(StatusCodes.OK).json({user});
        }
        user = await User.create({name,email,uid});
        res.status(StatusCodes.CREATED).json({user});
    } catch (error) {
        console.error('Error in register controller:', error);
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

const login = async (req,res) => {
    const {email , password} = req.body;

    if(!email || !password){
        throw new customError.BadRequestError('Please provide email and password');
    }

    const user = await User.findOne({email});
    if(!user) {
        throw new customError.UnauthenticatedError('Invalid credentials');
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if(!isPasswordCorrect){
        throw new customError.UnauthenticatedError('Invalid credentials'); 
    }

    const tokenUser = {name: user.name, userId: user._id, role: user.role};
    attachCookiesToResponse({res,user: tokenUser})
    res.status(StatusCodes.CREATED).json({user: tokenUser});
}
// const logout = async (req,res) => {
//     res.cookie('token','logout',{
//         httpOnly: true,
//         expires: new Date(Date.now()),
//     });
//     res.send('user logged out');
// }

const logout = async (req, res) => {
    // Clear the logout cookie
    res.clearCookie('token');

    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });

    
    // Send a response indicating successful logout
    res.send('User logged out');
}




// Auth controller with firebase uid
module.exports = {
    register,
    login,
    logout,
}