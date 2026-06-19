const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const { validate } = require('../middlewares/validate');
const {
  createVariant,
  updateVariant,
  deleteVariant,
  getVariantsByProduct
} = require('../controllers/variantController');
const { z } = require('zod');

const router = express.Router();

const variantSchema = z.object({
  body: z.object({
    productId: z.string().uuid(),
    size: z.string().optional().nullable(),
    color: z.string().optional().nullable(),
    sku: z.string().optional().nullable(),
    price: z.number().min(0).optional().nullable(),
    stock: z.number().int().min(0).default(0)
  })
});

router.post('/', protect, authorize('ADMIN'), validate(variantSchema), createVariant);
router.get('/product/:productId', getVariantsByProduct);
router.put('/:id', protect, authorize('ADMIN'), updateVariant);
router.delete('/:id', protect, authorize('ADMIN'), deleteVariant);

module.exports = router;
