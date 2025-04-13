import express from 'express';
import { getCustomerCompany , createCustomerCompany , deleteCustomerCompany , updateCustomerCompany} from '../controllers/finantiar/customerCompanyController.js';
import { getAdditionalFeeSettings, createAdditionalFeeSettings, updateAdditionalFeeSettings, deleteAdditionalFeeSettings } from '../controllers/finantiar/addinitionalFeeSettings.js';
import { getCanselingTicket, createCanselingTicket, updateCanselingTicket, deleteCanselingTicket } from '../controllers/finantiar/cancelingTicket.js';
import { getLedger, createLedger, updateLedger, deleteLedger } from '../controllers/finantiar/customerAccountSettlement/ledger.js';
import { getTransaction, createTransaction, updateTransaction, deleteTransaction } from '../controllers/finantiar/customerAccountSettlement/transaction.js';
import { getCategoryType, createCategoryType, updateCategoryType, deleteCategoryType } from '../controllers/finantiar/categoryType.js';
import { getForeignCompany, createForeignCompany, updateForeignCompany, deleteForeignCompany } from '../controllers/finantiar/foreignCompany.js';
import { finantial, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

//customer company
router
  .route('/customer-company/page')
  .post( finantial, getCustomerCompany)
router
  .route('/customer-company/create')
  .post(protect, finantial, createCustomerCompany)
router
  .route('/customer-company/delete/:id')
  .delete(protect, finantial, deleteCustomerCompany)
router
  .route('/customer-company/update/:id')
  .put(protect, finantial, updateCustomerCompany);

  //aditional fee settings
router
  .route('/additional-fee/page')
  .post(finantial ,getAdditionalFeeSettings)
  router
  .route('/additional-fee/create')
  .post(protect, finantial, createAdditionalFeeSettings)
router
  .route('/additional-fee/delete/:id')
  .delete(protect, finantial, deleteAdditionalFeeSettings)
router
  .route('/additional-fee/update/:id')
  .put(protect, finantial, updateAdditionalFeeSettings);

  //canceling ticket
router
  .route('/additional-fee-ticket-invalidate-request/page')
  .get(finantial, getCanselingTicket)
router
  .route('/additional-fee-ticket-invalidate-request/create')
  .post(protect, finantial, createCanselingTicket)
// router
//   .route('/additional-fee-ticket-invalidate-request/delete/:id')
//   .delete(protect, finantial, deleteCanselingTicket)
//aldaatai bh magadlaltai
router
  .route('/additional-fee-ticket-invalidate-request/update/:id')
  .put(protect, finantial, updateCanselingTicket);

  //customer account settlement-ledger

router 
  .route('/ledger/page')
  .post(finantial, getLedger)
router
  .route('/ledger/create')
  .post(protect, finantial, createLedger)
router
  .route('/ledger/delete/:id')
  .delete(protect, finantial, deleteLedger)
router
  .route('/ledger/update/:id')
  .put(protect, finantial, updateLedger);

//customer account settlement-transaction
router 
  .route('/transaction/page')
  .post(finantial, getTransaction)
router
  .route('/transaction/create')
  .post(protect, finantial, createTransaction)
router
  .route('/transaction/delete/:id')
  .delete(protect, finantial, deleteTransaction)
router
  .route('/transaction/update/:id')
  .put(protect, finantial, updateTransaction);


//category type
router 
  .route('/additional-fee-category/page')
  .post(finantial, getCategoryType)
router
  .route('/additional-fee-category/create')
  .post(protect, finantial, createCategoryType)
router
  .route('/additional-fee-category/delete/:id')
  .delete(protect, finantial, deleteCategoryType)
router
  .route('/additional-fee-category/update/:id')
  .put(protect, finantial, updateCategoryType);

//foreign company
router
  .route('/foreign-customer-company/page')
  .post(finantial, getForeignCompany)
router
  .route('/foreign-customer-company/create')
  .post(protect, finantial, createForeignCompany)
router
  .route('/foreign-customer-company/delete/:id')
  .delete(protect, finantial, deleteForeignCompany)
router
  .route('/foreign-customer-company/update/:id')
  .put(protect, finantial, updateForeignCompany);

  
export default router;