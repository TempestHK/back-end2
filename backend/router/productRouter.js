import express from 'express';
import { getProducts, getProductsById, createProduct, createProductReview, deleteProduct, updateProduct ,getTopProducts  } from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.get('/', getProducts);
// router.get('/:id', getProductsById);

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, createProductReview); // Corrected from router.router to router.route
router.get('/top', getTopProducts);

router
  .route('/:id')
  .get(getProductsById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;