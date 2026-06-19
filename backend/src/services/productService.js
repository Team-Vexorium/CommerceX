const productRepository = require('../repositories/productRepository');

const buildWhere = ({ search, categoryId, subcategoryId, minPrice, maxPrice }) => {
  const where = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ];
  }

  if (categoryId) where.categoryId = categoryId;
  if (subcategoryId) where.subcategoryId = subcategoryId;
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = Number(minPrice);
    if (maxPrice) where.price.lte = Number(maxPrice);
  }

  return where;
};

const listProducts = async ({ page = 1, limit = 12, sort = 'createdAt', order = 'desc', ...filters }) => {
  const where = buildWhere(filters);
  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const [products, total] = await Promise.all([
    productRepository.list({ where, skip, take, orderBy: { [sort]: order } }),
    productRepository.count(where)
  ]);

  return {
    data: products,
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit))
    }
  };
};

module.exports = {
  listProducts
};
