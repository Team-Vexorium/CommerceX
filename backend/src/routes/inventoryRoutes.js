const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const { validate } = require('../middlewares/validate');
const {
  adjustInventory,
  getInventoryLogs
} = require('../controllers/inventoryController');
const { z } = require('zod');

const router = express.Router();

const adjustmentSchema = z.object({
  body: z.object({
    productId: z.string().uuid(),
    variantId: z.string().uuid().optional().nullable(),
    quantity: z.number().int(),
    reason: z.string().optional().nullable()
  })
});

router.post('/adjust', protect, authorize('ADMIN'), validate(adjustmentSchema), adjustInventory);
router.get('/', protect, authorize('ADMIN'), getInventoryLogs);

module.exports = router;
