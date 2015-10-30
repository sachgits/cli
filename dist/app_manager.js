var AppManager, Authorized, Color, GitHubManager, Log, Promise, SlugManager, Urls, inquirer, path,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

inquirer = require('inquirer');

path = require('path');

Promise = require('bluebird');

inquirer = require('inquirer');

Urls = require('./urls');

SlugManager = require('./slug_manager');

Log = require('./log');

Authorized = require('./authorized');

Color = require('./color');

GitHubManager = require('./github_manager');

module.exports = AppManager = (function() {
  function AppManager() {
    this.create = bind(this.create, this);
  }

  AppManager.prototype.create = function(slug, repo) {
    console.log('crea');
    return this.execRequest(slug, repo);
  };

  AppManager.prototype.websiteExists = function() {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        return new GitHubManager().existing().then(function(existing) {});
      };
    })(this));
  };

  AppManager.prototype.backendExists = function(repo) {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        return Authorized.request({
          url: Urls.websiteExists(),
          qs: {
            repo: repo
          },
          method: 'post',
          json: true
        }, function(err, resp) {
          if (err) {
            return reject(err);
          }
          return resolve({
            exists: resp.body.exists,
            repo: repo,
            slug: resp.body.slug
          });
        });
      };
    })(this));
  };

  AppManager.prototype.execRequest = function(slug, repo) {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        return Authorized.request({
          url: Urls.publishNewWebsite(),
          qs: {
            repo: repo,
            slug: slug
          },
          method: 'post',
          json: true
        }, function(err, resp) {
          if (err) {
            return reject(err);
          }
          if (resp.body.success) {
            return resolve(opts);
          } else {
            return reject({
              slug: slug,
              repo: repo,
              error: 'app-exists'
            });
          }
        });
      };
    })(this));
  };

  return AppManager;

})();
