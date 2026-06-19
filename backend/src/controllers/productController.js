const productService = require('../services/productService');
const productRepository = require('../repositories/productRepository');
const HttpError = require('../utils/httpError');

const productController = {
  list: async (req, res, next) => {
    try {
      const result = await productService.listProducts(req.query);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  },
  detail: async (req, res, next) => {
    try {
      const product = await productRepository.findBySlug(req.params.slug);
      if (!product) {
        throw new HttpError(404, 'Product not found');
      }
      return res.status(200).json(product);
    } catch (error) {
      return next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const product = await productRepository.create(req.validated.body);
      return res.status(201).json(product);
    } catch (error) {
      return next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const product = await productRepository.update(req.params.id, req.validated.body);
      return res.status(200).json(product);
    } catch (error) {
      return next(error);
    }
  },
  remove: async (req, res, next) => {
    try {
      await productRepository.remove(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
};

module.exports = productController;
