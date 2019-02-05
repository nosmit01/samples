const jwt = require('jsonwebtoken')

const db = {
  updateOrCreate: function(user, cb){
    // db dummy, we just cb the user
    cb(null, user);
  }
}

function serialize(req, res, next) {
  db.updateOrCreate(req.user, function(err, user){
    if(err) {return next(err);}
    // we store the updated information in req.user again
    req.user = {
      id: user.id
    };
    next();
  });
}

function generateToken(req, res, next) {
  req.token = jwt.sign({
    id: req.user.id,
  }, 'server secret', {
    expiresInMinutes: 120
  });
  next();
}

function respond(req, res) {
  res.status(200).json({
    user: req.user,
    token: req.token
  });
}