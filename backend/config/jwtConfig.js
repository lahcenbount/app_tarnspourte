module.exports = {
  secret: process.env.JWT_SECRET || 'defaultsecret',
  expiresIn: '1d',
};
