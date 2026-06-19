const reviewController = {
  listByProduct: async (_req, res) => res.status(200).json({ data: [] }),
  create: async (_req, res) => res.status(201).json({ message: 'Review created' })
};

module.exports = reviewController;
