import express from 'express';
import { protect, authorize } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import {
  createVariant,
  updateVariant,
  deleteVariant,
  getVariantsByProduct
} from '../controllers/variantController.js';
import Joi from 'joi';

const router = express.Router();

const variantSchema = Joi.object({
  productId: Joi.string().uuid().required(),
  size: Joi.string().allow('', null),
  color: Joi.string().allow('', null),
  sku: Joi.string().allow('', null),
  price: Joi.number().min(0).allow(null),
  stock: Joi.number().integer().min(0).default(0)
});

router.post('/', protect, authorize('ADMIN'), validate(variantSchema), createVariant);
router.get('/product/:productId', getVariantsByProduct);
router.put('/:id', protect, authorize('ADMIN'), updateVariant);
router.delete('/:id', protect, authorize('ADMIN'), deleteVariant);

export default router;
