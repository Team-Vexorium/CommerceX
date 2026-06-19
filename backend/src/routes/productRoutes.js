const express = require('express');
const { z } = require('zod');
const validate = require('../middlewares/validate');
const { authenticate, authorize } = require('../middlewares/auth');
const productController = require('../controllers/productController');
const { protectedRouteLimiter } = require('../middlewares/rateLimiters');

const router = express.Router();

const productSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    slug: z.string().min(2),
    description: z.string().min(3),
    price: z.coerce.number().positive(),
    compareAtPrice: z.coerce.number().positive().optional(),
    sku: z.string().min(2),
    stock: z.coerce.number().int().nonnegative(),
    categoryId: z.string(),
    subcategoryId: z.string().optional(),
    imageUrls: z.array(z.string().url()).default([])
  })
});

router.get('/', productController.list);
router.get('/:slug', productController.detail);
router.post('/', protectedRouteLimiter, authenticate, authorize('ADMIN'), validate(productSchema), productController.create);
router.patch('/:id', protectedRouteLimiter, authenticate, authorize('ADMIN'), validate(productSchema), productController.update);
router.delete('/:id', protectedRouteLimiter, authenticate, authorize('ADMIN'), productController.remove);

module.exports = router;
