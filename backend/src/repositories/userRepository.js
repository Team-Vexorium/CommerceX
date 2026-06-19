const prisma = require('../config/prisma');

const userRepository = {
  findByEmail: (email) => prisma.user.findUnique({ where: { email } }),
  findById: (id) => prisma.user.findUnique({ where: { id } }),
  create: (data) => prisma.user.create({ data }),
  update: (id, data) => prisma.user.update({ where: { id }, data }),
  createRefreshToken: (data) => prisma.refreshToken.create({ data }),
  revokeRefreshToken: (token) => prisma.refreshToken.updateMany({ where: { token }, data: { revokedAt: new Date() } }),
  findActiveRefreshToken: (token) => prisma.refreshToken.findFirst({ where: { token, revokedAt: null } })
};

module.exports = userRepository;
