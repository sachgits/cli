var Authorized,Color,DeployLog,Deployer,Git,Initializer,Log,Promise,Urls,fs,inquirer,open,_;Promise=require("bluebird"),Git=require("git-wrapper"),inquirer=require("inquirer"),_=require("lodash"),open=require("open"),fs=require("fs.extra"),Initializer=require("./initializer"),Authorized=require("./authorized"),Urls=require("./urls"),DeployLog=require("./deploy_log"),Log=require("./log"),Color=require("./color"),module.exports=Deployer=function(){function e(){this.git=new Git}var t;return e.prototype.deploy=function(){return Log.spin("Deploying the app to closeheat.com via GitHub."),this.initGit().then(function(e){return function(){return e.addEverything().then(function(){return Log.stop(),Log.inner("All files added."),e.commit("Deploy via CLI").then(function(){return Log.inner("Files commited."),Log.inner("Pushing to GitHub."),e.pushToMainBranch().then(function(e){return Log.inner("Pushed to "+e+" branch on GitHub."),(new DeployLog).fromCurrentCommit().then(function(e){var t;return t="http://"+e+".closeheatapp.com",Log.p("App deployed to "+Color.violet(t)+"."),Log.p("Open it quicker with:"),Log.code("cd "+e),Log.code("closeheat open")})})})})}}(this))["catch"](function(e){return Log.error(e)})["finally"](function(){return process.exit(0)})},e.prototype.initGit=function(){return new Promise(function(e){return function(t){return fs.existsSync(".git")?t():e.git.exec("init",function(){return t()})}}(this))},e.prototype.addEverything=function(){return new Promise(function(e){return function(t,n){return e.git.exec("add",["."],function(e){return e?n(e):t()})}}(this))},e.prototype.commit=function(e){return new Promise(function(t){return function(n){return t.git.exec("commit",{m:!0},["'"+e+"'"],function(){return n()})}}(this))},e.prototype.pushToMainBranch=function(){return new Promise(function(e){return function(t){return e.ensureAppAndRepoExist().then(function(){return e.getMainBranch().then(function(n){return e.push(n).then(function(){return t(n)})})})}}(this))},e.prototype.ensureAppAndRepoExist=function(){return new Promise(function(e){return function(t){return e.repoExist().then(function(n){return n?t():e.askToCreateApp().then(t)})}}(this))},e.prototype.askToCreateApp=function(){return new Promise(function(){return function(e){return inquirer.prompt({message:"This app is not deployed yet. Would you like create a new closeheat app and deploy via GitHub?",type:"confirm",name:"create"},function(t){return t.create?(new Initializer).init().then(e):Log.error("You cannot deploy this app without the closeheat backend and GitHub setup")})}}(this))},e.prototype.repoExist=function(){return new Promise(function(e){return function(t,n){return e.git.exec("remote",function(e,r){var o;return e?n(e):(o=r.match(/origin/),t(o))})}}(this))},e.prototype.getMainBranch=function(){return new Promise(function(e){return function(t,n){return e.git.exec("symbolic-ref",["--short","HEAD"],function(e,r){return e?n(e):t(r.trim())})}}(this))},e.prototype.push=function(e){return new Promise(function(t){return function(n,r){return t.git.exec("push",["origin",e],function(e){return e?r(e):n()})}}(this))},t=/origin*.+:(.+\/.+).git \(push\)/,e.prototype.getOriginRepo=function(){return new Promise(function(e){return function(n,r){return e.git.exec("remote",["--verbose"],function(e,o){return e?r(e):n(o.match(t)[1])})}}(this))},e.prototype.open=function(){return this.getOriginRepo().then(function(e){return function(t){return e.getSlug(t).then(function(e){var t;return t="http://"+e+".closeheatapp.com",Log.p("Opening your app at "+t+"."),open(t)})}}(this))},e.prototype.getSlug=function(e){return new Promise(function(t,n){return Authorized.request({url:Urls.deployedSlug(),qs:{repo:e},method:"post",json:!0},function(r,o){var i;return r?n(r):_.isUndefined(o.body.slug)?(i="Could not find your closeheat app with GitHub repo '"+e+"'. Please deploy the app via UI",Log.error(i)):t(o.body.slug)})})},e}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlcGxveWVyLmNvZmZlZSIsImRlcGxveWVyLmpzIl0sIm5hbWVzIjpbIkF1dGhvcml6ZWQiLCJDb2xvciIsIkRlcGxveUxvZyIsIkRlcGxveWVyIiwiR2l0IiwiSW5pdGlhbGl6ZXIiLCJMb2ciLCJQcm9taXNlIiwiVXJscyIsImZzIiwiaW5xdWlyZXIiLCJvcGVuIiwiXyIsInJlcXVpcmUiLCJtb2R1bGUiLCJleHBvcnRzIiwidGhpcyIsImdpdCIsIkdJVEhVQl9SRVBPX1JFR0VYIiwicHJvdG90eXBlIiwiZGVwbG95Iiwic3BpbiIsImluaXRHaXQiLCJ0aGVuIiwiX3RoaXMiLCJhZGRFdmVyeXRoaW5nIiwic3RvcCIsImlubmVyIiwiY29tbWl0IiwicHVzaFRvTWFpbkJyYW5jaCIsImJyYW5jaCIsImZyb21DdXJyZW50Q29tbWl0IiwiZGVwbG95ZWRfbmFtZSIsInVybCIsInAiLCJ2aW9sZXQiLCJjb2RlIiwiZXJyIiwiZXJyb3IiLCJwcm9jZXNzIiwiZXhpdCIsInJlc29sdmUiLCJleGlzdHNTeW5jIiwiZXhlYyIsInJlamVjdCIsIm1zZyIsIm0iLCJlbnN1cmVBcHBBbmRSZXBvRXhpc3QiLCJnZXRNYWluQnJhbmNoIiwibWFpbl9icmFuY2giLCJwdXNoIiwicmVwb0V4aXN0IiwiZXhpc3QiLCJhc2tUb0NyZWF0ZUFwcCIsInByb21wdCIsIm1lc3NhZ2UiLCJ0eXBlIiwibmFtZSIsImFuc3dlciIsImNyZWF0ZSIsImluaXQiLCJvcmlnaW4iLCJtYXRjaCIsInRyaW0iLCJnZXRPcmlnaW5SZXBvIiwicmVzcCIsInJlcG8iLCJnZXRTbHVnIiwic2x1ZyIsInJlcXVlc3QiLCJkZXBsb3llZFNsdWciLCJxcyIsIm1ldGhvZCIsImpzb24iLCJpc1VuZGVmaW5lZCIsImJvZHkiXSwibWFwcGluZ3MiOiJBQUFBLEdBQUFBLFlBQUFDLE1BQUFDLFVBQUFDLFNBQUFDLElBQUFDLFlBQUFDLElBQUFDLFFBQUFDLEtBQUFDLEdBQUFDLFNBQUFDLEtBQUFDLENBQUFM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QUFLLFVBQVcsYUFBYyxTQUFDTixFQUFLNEIsR0FDdkMsTUFBc0I1QixHQUFmTyxFQUFPUCxHQUVkSSxFQUFRd0IsRUFBS0gsTUFBTTVDLEdBQW1CLFFBSjlCRixRQWpHZGIsRUFBQWdCLFVBdUdBUixLQUFNLFdDc0ZKLE1EckZBSyxNQUFDZ0QsZ0JBQWdCekMsS0FBSyxTQUFBQyxHQ3NGcEIsTUR0Rm9CLFVBQUMwQyxHQ3VGbkIsTUR0RkYxQyxHQUFDMkMsUUFBUUQsR0FBTTNDLEtBQUssU0FBQzZDLEdBQ25CLEdBQUFuQyxFQ3lGRSxPRHpGRkEsR0FBTyxVQUFTbUMsRUFBSyxvQkFDckI5RCxJQUFJNEIsRUFBRyx1QkFBc0JELEVBQUksS0FDakN0QixLQUFLc0IsT0FKYWpCLFFBeEd4QmIsRUFBQWdCLFVBOEdBZ0QsUUFBUyxTQUFDRCxHQzRGUixNRDNGSSxJQUFBM0QsU0FBUSxTQUFDa0MsRUFBU0csR0M0RnBCLE1EM0ZBNUMsWUFBV3FFLFNBQVFwQyxJQUFLekIsS0FBSzhELGVBQWdCQyxJQUFNTCxLQUFNQSxHQUFRTSxPQUFRLE9BQVFDLE1BQU0sR0FBTSxTQUFDcEMsRUFBSzRCLEdBQ2pHLEdBQUFwQixFQUFBLE9BQXNCUixHQUFmTyxFQUFPUCxHQUVYekIsRUFBRThELFlBQVlULEVBQUtVLEtBQUtQLE9BQ3pCdkIsRUFBTyx1REFBc0RxQixFQUFLLGtDQUMzRDVELElBQUlnQyxNQUFNTyxJQUVuQkosRUFBUXdCLEVBQUtVLEtBQUtQLFdDeUdqQmpFIiwiZmlsZSI6ImRlcGxveWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiUHJvbWlzZSA9IHJlcXVpcmUgJ2JsdWViaXJkJ1xuR2l0ID0gcmVxdWlyZSAnZ2l0LXdyYXBwZXInXG5pbnF1aXJlciA9IHJlcXVpcmUgJ2lucXVpcmVyJ1xuXyA9IHJlcXVpcmUgJ2xvZGFzaCdcbm9wZW4gPSByZXF1aXJlICdvcGVuJ1xuZnMgPSByZXF1aXJlICdmcy5leHRyYSdcblxuSW5pdGlhbGl6ZXIgPSByZXF1aXJlICcuL2luaXRpYWxpemVyJ1xuQXV0aG9yaXplZCA9IHJlcXVpcmUgJy4vYXV0aG9yaXplZCdcblVybHMgPSByZXF1aXJlICcuL3VybHMnXG5EZXBsb3lMb2cgPSByZXF1aXJlICcuL2RlcGxveV9sb2cnXG5cbkxvZyA9IHJlcXVpcmUgJy4vbG9nJ1xuQ29sb3IgPSByZXF1aXJlICcuL2NvbG9yJ1xuXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBEZXBsb3llclxuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBAZ2l0ID0gbmV3IEdpdCgpXG5cbiAgZGVwbG95OiAtPlxuICAgIExvZy5zcGluKCdEZXBsb3lpbmcgdGhlIGFwcCB0byBjbG9zZWhlYXQuY29tIHZpYSBHaXRIdWIuJylcbiAgICBAaW5pdEdpdCgpLnRoZW4oPT5cbiAgICAgIEBhZGRFdmVyeXRoaW5nKCkudGhlbiA9PlxuICAgICAgICBMb2cuc3RvcCgpXG4gICAgICAgIExvZy5pbm5lcignQWxsIGZpbGVzIGFkZGVkLicpXG4gICAgICAgIEBjb21taXQoJ0RlcGxveSB2aWEgQ0xJJykudGhlbiA9PlxuICAgICAgICAgIExvZy5pbm5lcignRmlsZXMgY29tbWl0ZWQuJylcbiAgICAgICAgICBMb2cuaW5uZXIoJ1B1c2hpbmcgdG8gR2l0SHViLicpXG4gICAgICAgICAgQHB1c2hUb01haW5CcmFuY2goKS50aGVuIChicmFuY2gpIC0+XG4gICAgICAgICAgICBMb2cuaW5uZXIoXCJQdXNoZWQgdG8gI3ticmFuY2h9IGJyYW5jaCBvbiBHaXRIdWIuXCIpXG4gICAgICAgICAgICBuZXcgRGVwbG95TG9nKCkuZnJvbUN1cnJlbnRDb21taXQoKS50aGVuIChkZXBsb3llZF9uYW1lKSAtPlxuICAgICAgICAgICAgICB1cmwgPSBcImh0dHA6Ly8je2RlcGxveWVkX25hbWV9LmNsb3NlaGVhdGFwcC5jb21cIlxuICAgICAgICAgICAgICBMb2cucChcIkFwcCBkZXBsb3llZCB0byAje0NvbG9yLnZpb2xldCh1cmwpfS5cIilcbiAgICAgICAgICAgICAgTG9nLnAoJ09wZW4gaXQgcXVpY2tlciB3aXRoOicpXG4gICAgICAgICAgICAgIExvZy5jb2RlKFwiY2QgI3tkZXBsb3llZF9uYW1lfVwiKVxuICAgICAgICAgICAgICBMb2cuY29kZSgnY2xvc2VoZWF0IG9wZW4nKVxuICAgICkuY2F0Y2goKGVycikgLT5cbiAgICAgIExvZy5lcnJvcihlcnIpXG4gICAgKS5maW5hbGx5IC0+XG4gICAgICBwcm9jZXNzLmV4aXQoMClcblxuICBpbml0R2l0OiAtPlxuICAgIG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICBpZiBmcy5leGlzdHNTeW5jKCcuZ2l0JylcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICBlbHNlXG4gICAgICAgIEBnaXQuZXhlYyAnaW5pdCcsIChlcnIsIHJlc3ApIC0+XG4gICAgICAgICAgcmVzb2x2ZSgpXG5cbiAgYWRkRXZlcnl0aGluZzogLT5cbiAgICBuZXcgUHJvbWlzZSAocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgQGdpdC5leGVjICdhZGQnLCBbJy4nXSwgKGVyciwgcmVzcCkgLT5cbiAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpIGlmIGVyclxuXG4gICAgICAgIHJlc29sdmUoKVxuXG4gIGNvbW1pdDogKG1zZykgLT5cbiAgICBuZXcgUHJvbWlzZSAocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgQGdpdC5leGVjICdjb21taXQnLCBtOiB0cnVlLCBbXCInI3ttc2d9J1wiXSwgKGVyciwgcmVzcCkgLT5cbiAgICAgICAgcmVzb2x2ZSgpXG5cbiAgcHVzaFRvTWFpbkJyYW5jaDogLT5cbiAgICBuZXcgUHJvbWlzZSAocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgQGVuc3VyZUFwcEFuZFJlcG9FeGlzdCgpLnRoZW4gPT5cbiAgICAgICAgQGdldE1haW5CcmFuY2goKS50aGVuIChtYWluX2JyYW5jaCkgPT5cbiAgICAgICAgICBAcHVzaChtYWluX2JyYW5jaCkudGhlbiAtPlxuICAgICAgICAgICAgcmVzb2x2ZShtYWluX2JyYW5jaClcblxuICBlbnN1cmVBcHBBbmRSZXBvRXhpc3Q6IC0+XG4gICAgbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgPT5cbiAgICAgIEByZXBvRXhpc3QoKS50aGVuIChleGlzdCkgPT5cbiAgICAgICAgaWYgZXhpc3RcbiAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgZWxzZVxuICAgICAgICAgIEBhc2tUb0NyZWF0ZUFwcCgpLnRoZW4ocmVzb2x2ZSlcblxuICBhc2tUb0NyZWF0ZUFwcDogLT5cbiAgICBuZXcgUHJvbWlzZSAocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgaW5xdWlyZXIucHJvbXB0KHtcbiAgICAgICAgbWVzc2FnZTogJ1RoaXMgYXBwIGlzIG5vdCBkZXBsb3llZCB5ZXQuIFdvdWxkIHlvdSBsaWtlIGNyZWF0ZSBhIG5ldyBjbG9zZWhlYXQgYXBwIGFuZCBkZXBsb3kgdmlhIEdpdEh1Yj8nXG4gICAgICAgIHR5cGU6ICdjb25maXJtJ1xuICAgICAgICBuYW1lOiAnY3JlYXRlJ1xuICAgICAgfSwgKGFuc3dlcikgLT5cbiAgICAgICAgaWYgYW5zd2VyLmNyZWF0ZVxuICAgICAgICAgIG5ldyBJbml0aWFsaXplcigpLmluaXQoKS50aGVuKHJlc29sdmUpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBMb2cuZXJyb3IgJ1lvdSBjYW5ub3QgZGVwbG95IHRoaXMgYXBwIHdpdGhvdXQgdGhlIGNsb3NlaGVhdCBiYWNrZW5kIGFuZCBHaXRIdWIgc2V0dXAnXG4gICAgICApXG5cbiAgcmVwb0V4aXN0OiAtPlxuICAgIG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICBAZ2l0LmV4ZWMgJ3JlbW90ZScsIChlcnIsIG1zZykgLT5cbiAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpIGlmIGVyclxuXG4gICAgICAgIG9yaWdpbiA9IG1zZy5tYXRjaCgvb3JpZ2luLylcbiAgICAgICAgcmVzb2x2ZShvcmlnaW4pXG5cbiAgZ2V0TWFpbkJyYW5jaDogLT5cbiAgICBuZXcgUHJvbWlzZSAocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgQGdpdC5leGVjICdzeW1ib2xpYy1yZWYnLCBbJy0tc2hvcnQnLCAnSEVBRCddLCAoZXJyLCBtc2cpIC0+XG4gICAgICAgIHJldHVybiByZWplY3QoZXJyKSBpZiBlcnJcblxuICAgICAgICByZXNvbHZlKG1zZy50cmltKCkpXG5cbiAgcHVzaDogKGJyYW5jaCkgLT5cbiAgICBuZXcgUHJvbWlzZSAocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgQGdpdC5leGVjICdwdXNoJywgWydvcmlnaW4nLCBicmFuY2hdLCAoZXJyLCBtc2cpIC0+XG4gICAgICAgIHJldHVybiByZWplY3QoZXJyKSBpZiBlcnJcblxuICAgICAgICByZXNvbHZlKClcblxuICBHSVRIVUJfUkVQT19SRUdFWCA9IC9vcmlnaW4qLis6KC4rXFwvLispLmdpdCBcXChwdXNoXFwpL1xuICBnZXRPcmlnaW5SZXBvOiAtPlxuICAgIG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICBAZ2l0LmV4ZWMgJ3JlbW90ZScsIFsnLS12ZXJib3NlJ10sIChlcnIsIHJlc3ApIC0+XG4gICAgICAgIHJldHVybiByZWplY3QoZXJyKSBpZiBlcnJcblxuICAgICAgICByZXNvbHZlKHJlc3AubWF0Y2goR0lUSFVCX1JFUE9fUkVHRVgpWzFdKVxuXG4gIG9wZW46IC0+XG4gICAgQGdldE9yaWdpblJlcG8oKS50aGVuIChyZXBvKSA9PlxuICAgICAgQGdldFNsdWcocmVwbykudGhlbiAoc2x1ZykgLT5cbiAgICAgICAgdXJsID0gXCJodHRwOi8vI3tzbHVnfS5jbG9zZWhlYXRhcHAuY29tXCJcbiAgICAgICAgTG9nLnAgXCJPcGVuaW5nIHlvdXIgYXBwIGF0ICN7dXJsfS5cIlxuICAgICAgICBvcGVuKHVybClcblxuICBnZXRTbHVnOiAocmVwbykgLT5cbiAgICBuZXcgUHJvbWlzZSAocmVzb2x2ZSwgcmVqZWN0KSAtPlxuICAgICAgQXV0aG9yaXplZC5yZXF1ZXN0IHVybDogVXJscy5kZXBsb3llZFNsdWcoKSwgcXM6IHsgcmVwbzogcmVwbyB9LCBtZXRob2Q6ICdwb3N0JywganNvbjogdHJ1ZSwgKGVyciwgcmVzcCkgLT5cbiAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpIGlmIGVyclxuXG4gICAgICAgIGlmIF8uaXNVbmRlZmluZWQocmVzcC5ib2R5LnNsdWcpXG4gICAgICAgICAgbXNnID0gXCJDb3VsZCBub3QgZmluZCB5b3VyIGNsb3NlaGVhdCBhcHAgd2l0aCBHaXRIdWIgcmVwbyAnI3tyZXBvfScuIFBsZWFzZSBkZXBsb3kgdGhlIGFwcCB2aWEgVUlcIlxuICAgICAgICAgIHJldHVybiBMb2cuZXJyb3IobXNnKVxuXG4gICAgICAgIHJlc29sdmUocmVzcC5ib2R5LnNsdWcpXG4iLG51bGxdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==