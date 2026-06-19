const express = require('express');
const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');
const reviewRoutes = require('./reviewRoutes');
const couponRoutes = require('./couponRoutes');
const paymentRoutes = require('./paymentRoutes');
const adminRoutes = require('./adminRoutes');
const variantRoutes = require('./variantRoutes');
const inventoryRoutes = require('./inventoryRoutes');

const router = express.Router();

router.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }));
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/variants', variantRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/orders', orderRoutes);
router.use('/reviews', reviewRoutes);
router.use('/coupons', couponRoutes);
router.use('/payments', paymentRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
