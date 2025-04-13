import express from 'express';
import {
    getUsers,
    getUsersById,
    loginUser,
    registerUser,
    logoutUser,
    getInfo,
    deleteUser,
    updateUser,
    createUser,
    getUserProfile,
    updateUserProfile
} from '../controllers/userController.js';
import {
    getCustomer,
    createCustomer,
    deleteCustomer,
    updateCustomer,
} from '../controllers/admin/customer.js';

import {
    getEmployes,
    createEmployes,
    deleteEmployes,
    updateEmployes,
} from '../controllers/admin/employes.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);

router.post('/login', loginUser);
router.get('/info', getInfo);
router.post('/register', registerUser);
router.route('/logout')
    .post(protect, logoutUser);

// router
//     .route('/profile')
//     .get(protect, getUserProfile)
//     .put(protect, updateUserProfile);

// router
//     .route('/:id')
//     .get(protect, admin, getUsersById)
//     .delete(protect, admin, deleteUser) 
//     .put(protect, admin, updateUser);



export default router;