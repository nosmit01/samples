const jwt = require('jsonwebtoken')
const passport = require('passport')

exports.authenticate = (req, res) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Invalid user',
        user: user
      });
    }
    req.login(user, {session: false}, (err) => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(user, 'raininspain');
      return res.json({user, token});
    });
  })(req, res);
}

exports.increment = (req, res) => {
  const count = req.params.count || 0
  const isZero = count === 0 || count === "0"
  const updatedCount = isZero ? 1 : count * 2
  res.json({count: updatedCount})
}