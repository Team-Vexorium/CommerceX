import express from 'express';
import { protect, authorize } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import {
  adjustInventory,
  getInventoryLogs
} from '../controllers/inventoryController.js';
import Joi from 'joi';

const router = express.Router();

const adjustmentSchema = Joi.object({
  productId: Joi.string().uuid().required(),
  variantId: Joi.string().uuid().allow(null),
  quantity: Joi.number().integer().required(),
  reason: Joi.string().allow('', null)
});

router.post('/adjust', protect, authorize('ADMIN'), validate(adjustmentSchema), adjustInventory);
router.get('/', protect, authorize('ADMIN'), getInventoryLogs);

export default router;
