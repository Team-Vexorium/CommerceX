const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.adjustInventory = async (req, res, next) => {
  try {
    const { productId, variantId, quantity, reason } = req.body;

    if (quantity === 0) {
      return res.status(400).json({ message: 'Quantity cannot be zero' });
    }

    let updatedEntity;
    if (variantId) {
      updatedEntity = await prisma.productVariant.update({
        where: { id: variantId },
        data: { stock: { increment: quantity } }
      });
    } else {
      updatedEntity = await prisma.product.update({
        where: { id: productId },
        data: { stock: { increment: quantity } }
      });
    }

    const log = await prisma.inventoryLog.create({
      data: {
        productId,
        variantId,
        action: 'MANUAL_ADJUSTMENT',
        quantity,
        reason
      }
    });

    res.status(201).json({ updatedEntity, log });
  } catch (error) {
    next(error);
  }
};

exports.getInventoryLogs = async (req, res, next) => {
  try {
    const { productId, variantId, limit = 50, offset = 0 } = req.query;

    const filter = {};
    if (productId) filter.productId = productId;
    if (variantId) filter.variantId = variantId;

    const logs = await prisma.inventoryLog.findMany({
      where: filter,
      orderBy: { createdAt: 'desc' },
      take: Number(limit),
      skip: Number(offset),
      include: {
        product: { select: { name: true } },
        variant: { select: { sku: true, size: true, color: true } }
      }
    });

    res.json(logs);
  } catch (error) {
    next(error);
  }
};
