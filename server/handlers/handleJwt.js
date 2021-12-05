const jwt = require('jsonwebtoken');
exports.generateToken = function (res, user, exp) {
  jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: exp },
    function (err, token) {
      if (token) {
        res.cookie('jwt', token);
        res.status(200).json({
          status: 'success',
          data: {
            user,
          },
        });
      }
    }
  );
};
