import express from 'express';
import {
    getCustomerCompany,
    createCustomerCompany,
    deleteCustomerCompany,
    updateCustomerCompany,
} from '../controllers/finantiar/customerCompanyController.js';

import {
    getEmployes,
    createEmployes,
    deleteEmployes,
    updateEmployes,
} from '../controllers/admin/employes.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router 
    .route('/customer-company')
    .post(protect,  getCustomerCompany)
router
    .route('/customer-company/create')
    .post(protect,  createCustomerCompany)
router
    .route('/customer-company/delete/:id')
    .delete(protect,  deleteCustomerCompany)
router
    .route('/customer-company/update/:id')
    .put(protect,  updateCustomerCompany);

    //workers-employes
router 
    .route('/user/page')
    .post(  getEmployes)
router
    .route('/user/create')
    .post(protect,  createEmployes)
router
    .route('/user/delete/:id')
    .delete(protect,  deleteEmployes)
router
    .route('/user/update/:id')
    .put(protect,  updateEmployes);

    
export default router;