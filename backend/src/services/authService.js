const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const userRepository = require('../repositories/userRepository');
const HttpError = require('../utils/httpError');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../utils/tokens');

const sanitizeUser = (user) => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  role: user.role,
  emailVerified: user.emailVerified
});

const buildTokenPayload = (user) => ({ id: user.id, email: user.email, role: user.role });

const register = async ({ email, password, firstName, lastName }) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new HttpError(409, 'Email already in use');
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const verificationToken = crypto.randomBytes(20).toString('hex');

  const user = await userRepository.create({
    email,
    passwordHash,
    firstName,
    lastName,
    emailVerificationToken: verificationToken
  });

  const payload = buildTokenPayload(user);
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  await userRepository.createRefreshToken({
    token: refreshToken,
    userId: user.id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });

  return { user: sanitizeUser(user), accessToken, refreshToken, verificationToken };
};

const login = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new HttpError(401, 'Invalid email or password');
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    throw new HttpError(401, 'Invalid email or password');
  }

  const payload = buildTokenPayload(user);
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  await userRepository.createRefreshToken({
    token: refreshToken,
    userId: user.id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });

  return { user: sanitizeUser(user), accessToken, refreshToken };
};

const refresh = async (token) => {
  if (!token) {
    throw new HttpError(401, 'Refresh token is required');
  }

  const storedToken = await userRepository.findActiveRefreshToken(token);
  if (!storedToken || storedToken.expiresAt < new Date()) {
    throw new HttpError(401, 'Invalid refresh token');
  }

  const payload = verifyRefreshToken(token);
  const user = await userRepository.findById(payload.id);

  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  const accessToken = signAccessToken(buildTokenPayload(user));
  return { accessToken };
};

const logout = async (token) => {
  if (token) {
    await userRepository.revokeRefreshToken(token);
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout
};
