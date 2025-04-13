import User from '../models/userModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

async function matchPassword(enteredPassword, storedHashedPassword) {
    try {
        const isMatch = await bcrypt.compare(enteredPassword, storedHashedPassword);
        return isMatch;
    } catch (error) {
        console.error("Error while comparing passwords:", error);
        return false;
    }
}

function generateToken(res, id) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development',
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });
    return token;
}

const getInfo = asyncHandler(async (req, res) => {
   console.log("info of user", req.user);
   if (!req.user) {
       return res.status(401).json({ message: 'Unauthorized' });
   }else{
         res.json(req.user); 
   }
   
});

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

const getUsersById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password , web } = req.body;
   
    const user = await User.findOne({ email });

    if (user && (await matchPassword(password, user.password))) {

        const token = generateToken(res, user._id);

        res.json({
            body: {
                user: {
                email: user.email,
                password: password,
                role_name: user.role_name,
              },
            token: token,
            }
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password lol in back' });
    }
});

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, 10)
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role_name: user.role_name,
            token: generateToken(res, user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie('jwt');  
    res.status(200).json({ message: 'Logged out successfully' });
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await user.deleteOne();
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log("user", user);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role_name = req.body.role_name || user.role_name;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role_name: updatedUser.role_name,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const createUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
    });
    
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role_name: user.role_name,
            token: generateToken(user),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role_name: user.role_name,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role_name: updatedUser.role_name,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export {
    getUsers,
    getUsersById,
    registerUser,
    loginUser,
    logoutUser,
    deleteUser,
    updateUser,
    createUser,
    getUserProfile,
    updateUserProfile,
    getInfo,
};