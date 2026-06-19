const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createVariant = async (req, res, next) => {
  try {
    const { productId, size, color, sku, price, stock } = req.body;
    const variant = await prisma.productVariant.create({
      data: {
        productId,
        size,
        color,
        sku,
        price,
        stock
      }
    });
    
    if (stock > 0) {
      await prisma.inventoryLog.create({
        data: {
          productId,
          variantId: variant.id,
          action: 'STOCK_ADD',
          quantity: stock,
          reason: 'Initial stock creation'
        }
      });
    }

    res.status(201).json(variant);
  } catch (error) {
    next(error);
  }
};

exports.updateVariant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { size, color, sku, price, stock } = req.body;

    const existingVariant = await prisma.productVariant.findUnique({ where: { id } });
    if (!existingVariant) {
      return res.status(404).json({ message: 'Variant not found' });
    }

    const updatedVariant = await prisma.productVariant.update({
      where: { id },
      data: { size, color, sku, price, stock }
    });

    if (stock !== undefined && stock !== existingVariant.stock) {
      const diff = stock - existingVariant.stock;
      await prisma.inventoryLog.create({
        data: {
          productId: updatedVariant.productId,
          variantId: updatedVariant.id,
          action: diff > 0 ? 'STOCK_ADD' : 'STOCK_REMOVE',
          quantity: Math.abs(diff),
          reason: 'Manual adjustment via update'
        }
      });
    }

    res.json(updatedVariant);
  } catch (error) {
    next(error);
  }
};

exports.deleteVariant = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.productVariant.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.getVariantsByProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const variants = await prisma.productVariant.findMany({
      where: { productId }
    });
    res.json(variants);
  } catch (error) {
    next(error);
  }
};
