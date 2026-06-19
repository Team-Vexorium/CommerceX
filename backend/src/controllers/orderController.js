const orderController = {
  create: async (_req, res) => res.status(201).json({ message: 'Order created' }),
  listMyOrders: async (_req, res) => res.status(200).json({ data: [] }),
  listAllOrders: async (_req, res) => res.status(200).json({ data: [] }),
  updateStatus: async (_req, res) => res.status(200).json({ message: 'Order status updated' })
};

module.exports = orderController;
