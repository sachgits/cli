#!/usr/bin/env node

var Log, Server, _, fs, path, pkg, program;

program = require('commander');

_ = require('lodash');

fs = require('fs');

path = require('path');

pkg = require('../../package.json');

Log = require('../log');

program.version(pkg.version).usage('<keywords>');

program.command('create [app-name]').description('Creates a new app with clean setup and directory structure.').option('-f, --framework [name]', 'Framework').option('-t, --template [name]', 'Template').option('--javascript [name]', 'Javascript precompiler').option('--html [name]', 'HTML precompiler').option('--css [name]', 'CSS precompiler').option('--tmp [path]', 'The path of temporary directory when creating').option('--dist [path]', 'Path of destination of where to create app dir').option('--no-deploy', 'Do not create GitHub repo and closeheat app').action(function(name, opts) {
  var Creator, includes_template_settings, settings, template_settings;
  Creator = require('../creator');
  settings = _.pick.apply(_, [opts, 'framework', 'template', 'javascript', 'html', 'css', 'dist', 'tmp', 'deploy']);
  settings.name = name;
  Log.logo();
  template_settings = ['framework', 'template', 'javascript', 'html', 'css'];
  includes_template_settings = _.any(_.keys(settings), function(setting) {
    return _.contains(template_settings, setting);
  });
  if (includes_template_settings) {
    return new Creator().createFromSettings(settings);
  } else {
    return new Creator().createFromPrompt(settings);
  }
});

program.command('server').description('Runs a server which builds and LiveReloads your app.').option('--ip [ip]', 'IP to run LiveReload on (default - localhost)').option('-p, --port [port]', 'Port to run server on (default - 4000)').action(function(opts) {
  var Updater;
  Updater = require('../updater');
  return new Updater().update().then(function() {
    var Server;
    Server = require('../server');
    return new Server().start(opts);
  });
});

program.command('deploy').description('Deploys your app to closeheat.com via GitHub.').action(function() {
  var Deployer;
  Deployer = require('../deployer');
  Log.logo();
  return new Deployer().deploy();
});

program.command('log').description('Polls the log of the last deployment. Usable: git push origin master && closeheat log').action(function() {
  var DeployLog;
  DeployLog = require('../deploy_log');
  Log.logo();
  return new DeployLog().fromCurrentCommit();
});

program.command('open').description('Opens your deployed app in the browser.').action(function() {
  var Deployer;
  Deployer = require('../deployer');
  return new Deployer().open();
});

program.command('apps').description('Shows a list of your deployed apps.').action(function() {
  var Updater;
  Updater = require('../updater');
  return new Updater().update().then(function() {
    var Apps;
    Apps = require('../apps');
    return new Apps().list();
  });
});

program.command('login').option('-t, --token [access-token]', 'Access token from closeheat.com.').description('Log in to closeheat.com with this computer.').action(function(opts) {
  var Authorizer;
  Authorizer = require('../authorizer');
  if (opts.token) {
    return new Authorizer().saveToken(opts.token);
  } else {
    return new Authorizer().login();
  }
});

program.command('clone [app-name]').description('Clones the closeheat app files.').action(function(app_name) {
  var Apps, Cloner;
  if (app_name) {
    Cloner = require('../cloner');
    return new Cloner().clone(app_name);
  } else {
    Apps = require('../apps');
    return new Apps().list();
  }
});

program.command('transform [type] [language]').description('Transforms files in current dir to other language (Experimental).').action(function(type, language) {
  var Dirs, Transformer, dirs, dist_type, settings, source_type, transformer;
  _ = require('lodash');
  Dirs = require('../dirs');
  Transformer = require('../transformer');
  Log.logo();
  settings = {};
  settings[type] = language;
  source_type = _.first(_.keys(settings));
  dist_type = _.first(_.values(settings));
  Log.spin("Transforming " + source_type + " to " + dist_type + ".");
  dirs = new Dirs({
    name: 'transforming',
    src: process.cwd(),
    dist: process.cwd()
  });
  settings = {};
  settings[type] = language;
  transformer = new Transformer(dirs);
  return transformer.transform(settings).then((function(_this) {
    return function() {
      Log.stop();
      Log.inner('Files transformed.');
      Log.spin("Removing old " + source_type + " files.");
      return transformer.remove(source_type).then(function(paths) {
        Log.stop();
        _.each(paths, Log.inner);
        return Log.inner(source_type + " files removed.");
      })["catch"](function(e) {
        return Log.error(e);
      });
    };
  })(this));
});

program.command('help').description('Displays this menu.').action(function() {
  var Updater;
  Updater = require('../updater');
  return new Updater().update().then(function() {
    Log.logo(0);
    return program.help();
  });
});

program.command('postinstall').description('This is run after the install for easy instructions.').action(function() {
  var Color;
  Color = require('../color');
  Log.br();
  Log.p('Installation successful.');
  Log.p('------------------------');
  return Log.p("Run " + (Color.violet('closeheat apps')) + " command for the list of your apps.");
});

program.parse(process.argv);

if (!program.args.length) {
  if (fs.existsSync('index.html') || fs.existsSync('index.jade')) {
    Server = require('../server');
    new Server().start();
  } else {
    Log.logo(0);
    program.help();
  }
}
