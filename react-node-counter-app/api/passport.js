const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, (username, password, done) => {
  if(username === 'admin' && password === '123'){
    done(null, {
      id: 123,
      firstname: 'Jon',
      lastname: 'Doe'
    });
  }
  else {
    done(null, false)
  }
}))

module.exports = passport