module.exports = (app) => {
  const controller = require('./controller')
  const expressJwt = require('express-jwt');
  const authenticate = expressJwt({secret : 'raininspain'});

  app.route('/api/auth')
    .post(controller.authenticate)

  app.route('/api/increment/:count')
    .post(authenticate, controller.increment)
}