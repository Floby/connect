/**
 * Module dependencies
 */

var util          = require('util')
  , LocalStrategy = require('passport-local').Strategy
  , User          = require('../models/User')
  , mailer        = require('../boot/mailer')
  ;


/**
 * Verifier
 */

function verifier (req, email, password, done) {
  User.authenticate(email, password, function (err, user, info) {
    if (user) {
      // throw password value away so isn't included in URLs/logged
      delete req.connectParams.password;
      delete req.connectParams.email;
    }

    done(err, user, info);
  });
};

LocalStrategy.verifier = verifier;


/**
 * Initialize
 */

function initialize (provider, configuration) {
  if (configuration.verifyEmail && !mailer) {
    throw new Error("verifyEmail is true but no mailer defined");
  }
  return new LocalStrategy(provider, verifier);
}

LocalStrategy.initialize = initialize;


/**
 * Exports
 */

module.exports = LocalStrategy;
