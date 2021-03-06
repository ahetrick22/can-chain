const Authentication = require('./controllers/authentication');
const Delivery = require('./controllers/delivery');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  app.post('/auth/signin', requireSignin, Authentication.signin)
  app.post('/auth/signup', Authentication.signup)
  app.get('/currentuser', requireAuth, Authentication.currentUser)
  app.get('/deliveries/:center', requireAuth, Delivery.getCenterDeliveries)
  app.get('/unverifieddeliveries', requireAuth, Delivery.getUnverifiedDeliveries)
  app.post('/delivery', requireAuth, Delivery.addDelivery)
}
