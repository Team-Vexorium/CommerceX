const couponController = {
  list: async (_req, res) => res.status(200).json({ data: [] }),
  create: async (_req, res) => res.status(201).json({ message: 'Coupon created' }),
  validate: async (_req, res) => res.status(200).json({ valid: true })
};

module.exports = couponController;
