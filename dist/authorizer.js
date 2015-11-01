var Authorized, Authorizer, Color, Config, Promise, Urls, fs, inquirer, open, pkg, request;

fs = require('fs');

inquirer = require('inquirer');

request = require('request');

pkg = require('../package.json');

Promise = require('bluebird');

open = require('open');

Urls = require('./urls');

Color = require('./color');

Config = require('./config');

Authorized = require('./authorized');

module.exports = Authorizer = (function() {
  function Authorizer() {}

  Authorizer.prototype.saveToken = function(access_token) {
    var Log, config, overriden;
    overriden = this.accessTokenExists();
    config = {
      access_token: access_token
    };
    Config.update('access_token', access_token);
    Log = require('./log');
    if (overriden) {
      return Log.doneLine('Login successful. New access token saved.');
    } else {
      return Log.doneLine('Login successful. Access token saved.');
    }
  };

  Authorizer.prototype.accessToken = function() {
    return Config.fileContents().access_token;
  };

  Authorizer.prototype.accessTokenExists = function() {
    return Config.fileContents().access_token && Config.fileContents().access_token !== 'none';
  };

  Authorizer.prototype.login = function(token) {
    if (token) {
      return this.saveToken(token);
    }
    if (this.accessTokenExists()) {
      return this.youreLoggedIn();
    } else {
      return this.openLogin();
    }
  };

  Authorizer.prototype.youreLoggedIn = function() {
    var Log;
    Log = require('./log');
    Log.doneLine('You are already logged in.');
    return Log.inner("Log in with another account here: " + (Urls.loginInstructions()));
  };

  Authorizer.prototype.openLogin = function() {
    var Log;
    Log = require('./log');
    Log.doneLine("Log in at " + (Urls.loginInstructions()) + " in your browser.");
    if (!process.env.CLOSEHEAT_TEST) {
      return open(Urls.loginInstructions());
    }
  };

  Authorizer.forceLogin = function() {
    var Log;
    Log = require('./log');
    Log.stop();
    Log.p(Color.redYellow('You need to log in for that.'));
    Log.p("Type " + (Color.violet('closeheat login')) + " or open " + (Color.violet(Urls.loginInstructions())) + " to do it swiftly.");
    return process.exit();
  };

  Authorizer.unauthorized = function(resp) {
    return resp.statusCode === 401;
  };

  Authorizer.checkUserLoggedIn = function(resp) {
    if (!resp[0]) {
      return;
    }
    if (this.unauthorized(resp[0])) {
      return this.forceLogin();
    }
  };

  Authorizer.prototype.ensureGitHubAuthorized = function() {
    return new Promise(function(resolve, reject) {
      return Authorized.request({
        url: Urls.githubAuthorized(),
        method: 'get'
      }, function(err, resp) {
        var Log, authorized;
        authorized = JSON.parse(resp.body).authorized;
        if (authorized) {
          return resolve();
        } else {
          Log = require('./log');
          Log.error('GitHub not authorized', false);
          Log.innerError("We cannot set you up for deployment because you did not authorize GitHub.", false);
          Log.br();
          return Log.innerError("Visit " + (Urls.authorizeGitHub()) + " and rerun the command.");
        }
      });
    });
  };

  return Authorizer;

})();
