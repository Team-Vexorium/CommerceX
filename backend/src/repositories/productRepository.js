const prisma = require('../config/prisma');

const productRepository = {
  list: (query) => prisma.product.findMany(query),
  count: (where) => prisma.product.count({ where }),
  findBySlug: (slug) => prisma.product.findUnique({ where: { slug }, include: { reviews: true, category: true, subcategory: true, variants: true } }),
  create: (data) => prisma.product.create({ data }),
  update: (id, data) => prisma.product.update({ where: { id }, data }),
  remove: (id) => prisma.product.delete({ where: { id } })
};

module.exports = productRepository;
