var Authorizer,Color,Config,Log,Promise,Urls,fs,inquirer,request;fs=require("fs"),inquirer=require("inquirer"),request=require("request"),Promise=require("bluebird"),Log=require("./log"),Urls=require("./urls"),Color=require("./color"),Config=require("./config"),module.exports=Authorizer=function(){function o(){}return o.prototype.saveToken=function(o){var e;return e={access_token:o},Config.update("access_token",o),Log=require("./log"),Log.doneLine("Access token saved.")},o.prototype.accessToken=function(){return Config.fileContents().access_token},o.prototype.login=function(o){var e;return null==o&&(o=function(){}),e=[{message:"Your email address",name:"email",type:"input"},{message:"Your password",name:"password",type:"password"}],inquirer.prompt(e,function(e){return function(r){return e.getToken(r).then(function(){return Log.br(),o()})["catch"](function(r){return 401===r.code?(Log=require("./log"),"locked"===r.status?(Log.error("Too many invalid logins. Account locked for 1 hour.",!1),Log.innerError("Check your email for unlock instructions or contact the support at "+Color.violet("closeheat.com/support")+".")):(Log.error("Wrong password or email. Please try again",!1),e.login(o))):Log.backendError()})}}(this))},o.prototype.getToken=function(o){return new Promise(function(e){return function(r,t){return request({url:Urls.getToken(),qs:o,method:"post",json:!0},function(o,n){return o&&Log.error(o),200===n.statusCode?(e.saveToken(n.body.access_token),r()):t({code:n.statusCode,status:n.body.status})})}}(this))},o.prototype.forceLogin=function(o){return Log.stop(),Log.br(),Log.p(Color.redYellow("Please login to closeheat.com to check out your app list.")),this.login(o)},o.prototype.unauthorized=function(o){return 401===o.statusCode},o.prototype.checkLoggedIn=function(o,e){return this.unauthorized(o)?this.forceLogin(e):void 0},o}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGhvcml6ZXIuY29mZmVlIiwiYXV0aG9yaXplci5qcyJdLCJuYW1lcyI6WyJBdXRob3JpemVyIiwiQ29sb3IiLCJDb25maWciLCJMb2ciLCJQcm9taXNlIiwiVXJscyIsImZzIiwiaW5xdWlyZXIiLCJyZXF1ZXN0IiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJwcm90b3R5cGUiLCJzYXZlVG9rZW4iLCJhY2Nlc3NfdG9rZW4iLCJjb25maWciLCJ1cGRhdGUiLCJkb25lTGluZSIsImFjY2Vzc1Rva2VuIiwiZmlsZUNvbnRlbnRzIiwibG9naW4iLCJjYiIsImxvZ2luX3F1ZXN0aW9ucyIsIm1lc3NhZ2UiLCJuYW1lIiwidHlwZSIsInByb21wdCIsIl90aGlzIiwiYW5zd2VycyIsImdldFRva2VuIiwidGhlbiIsImJyIiwicmVzcCIsImNvZGUiLCJzdGF0dXMiLCJlcnJvciIsImlubmVyRXJyb3IiLCJ2aW9sZXQiLCJiYWNrZW5kRXJyb3IiLCJ0aGlzIiwicmVzb2x2ZSIsInJlamVjdCIsInVybCIsInFzIiwibWV0aG9kIiwianNvbiIsImVyciIsInN0YXR1c0NvZGUiLCJib2R5IiwiZm9yY2VMb2dpbiIsInN0b3AiLCJwIiwicmVkWWVsbG93IiwidW5hdXRob3JpemVkIiwiY2hlY2tMb2dnZWRJbiJdLCJtYXBwaW5ncyI6IkFBQUEsR0FBQUEsWUFBQUMsTUFBQUMsT0FBQUMsSUFBQUMsUUFBQUMsS0FBQUMsR0FBQUMsU0FBQUMsT0FBQUYsSUFBS0csUUFBUSxNQUFiRixTQUNXRSxRQUFRLFlBRG5CRCxRQUVVQyxRQUFRLFdBRmxCTCxRQUdVSyxRQUFRLFlBSGxCTixJQUtNTSxRQUFRLFNBTGRKLEtBTU9JLFFBQVEsVUFOZlIsTUFPUVEsUUFBUSxXQVBoQlAsT0FRU08sUUFBUSxZQVJqQkMsT0FVT0MsUUFDRFgsV0FBQSxXQ1FKLFFBQVNBLE1Ba0dULE1EekdBQSxHQUFBWSxVQUFBQyxVQUFXLFNBQUNDLEdBQ1YsR0FBQUMsRUNlQSxPRGZBQSxJQUFXRCxhQUFjQSxHQUN6QlosT0FBT2MsT0FBTyxlQUFnQkYsR0FDOUJYLElBQU1NLFFBQVEsU0FDZE4sSUFBSWMsU0FBUyx3QkFKZmpCLEVBQUFZLFVBTUFNLFlBQWEsV0NjWCxNRGJBaEIsUUFBT2lCLGVBQWVMLGNBUHhCZCxFQUFBWSxVQVNBUSxNQUFPLFNBQUNDLEdBQ04sR0FBQUMsRUM2QkEsT0FkVSxPQUFORCxJRGhCRUEsRUFBSyxjQUNYQyxJQUVJQyxRQUFTLHFCQUNUQyxLQUFNLFFBQ05DLEtBQU0sVUFHTkYsUUFBUyxnQkFDVEMsS0FBTSxXQUNOQyxLQUFNLGFBSVZsQixTQUFTbUIsT0FBT0osRUFBaUIsU0FBQUssR0NpQi9CLE1EakIrQixVQUFDQyxHQ2tCOUIsTURqQkZELEdBQUNFLFNBQVNELEdBQVNFLEtBQUssV0NtQnBCLE1EbEJGM0IsS0FBSTRCLEtBQ0pWLE1BQ0EsU0FBTSxTQUFDVyxHQUNQLE1BQWdCLE9BQWJBLEVBQUtDLE1BQ045QixJQUFNTSxRQUFRLFNBRUksV0FBZnVCLEVBQUtFLFFBQ04vQixJQUFJZ0MsTUFBTSx1REFBdUQsR0FDakVoQyxJQUFJaUMsV0FBWSxzRUFBcUVuQyxNQUFNb0MsT0FBTyx5QkFBeUIsT0FFM0hsQyxJQUFJZ0MsTUFBTSw2Q0FBNkMsR0FDdkRSLEVBQUNQLE1BQU1DLEtBR1RsQixJQUFJbUMsbUJBaEJ1QkMsUUF2Qm5DdkMsRUFBQVksVUF5Q0FpQixTQUFVLFNBQUNELEdDc0JULE1EckJJLElBQUF4QixTQUFRLFNBQUF1QixHQ3NCVixNRHRCVSxVQUFDYSxFQUFTQyxHQ3VCbEIsTUR0QkZqQyxVQUFRa0MsSUFBS3JDLEtBQUt3QixXQUFZYyxHQUFJZixFQUFTZ0IsT0FBUSxPQUFRQyxNQUFNLEdBQU0sU0FBQ0MsRUFBS2QsR0FHM0UsTUFGa0JjLElBQWxCM0MsSUFBSWdDLE1BQU1XLEdBRVksTUFBbkJkLEVBQUtlLFlBQ05wQixFQUFDZCxVQUFVbUIsRUFBS2dCLEtBQUtsQyxjQUNyQjBCLEtBRUFDLEdBQU9SLEtBQU1ELEVBQUtlLFdBQVliLE9BQVFGLEVBQUtnQixLQUFLZCxhQVIxQ0ssUUExQ2R2QyxFQUFBWSxVQW9EQXFDLFdBQVksU0FBQzVCLEdDd0NYLE1EdkNBbEIsS0FBSStDLE9BQ0ovQyxJQUFJNEIsS0FDSjVCLElBQUlnRCxFQUFFbEQsTUFBTW1ELFVBQVUsOERBQ3RCYixLQUFDbkIsTUFBTUMsSUF4RFRyQixFQUFBWSxVQTBEQXlDLGFBQWMsU0FBQ3JCLEdDc0NiLE1EckNtQixPQUFuQkEsRUFBS2UsWUEzRFAvQyxFQUFBWSxVQTZEQTBDLGNBQWUsU0FBQ3RCLEVBQU1YLEdBQ3BCLE1BQUdrQixNQUFDYyxhQUFhckIsR0FDZk8sS0FBQ1UsV0FBVzVCLEdBRGQsUUMyQ0tyQiIsImZpbGUiOiJhdXRob3JpemVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnMgPSByZXF1aXJlICdmcydcbmlucXVpcmVyID0gcmVxdWlyZSAnaW5xdWlyZXInXG5yZXF1ZXN0ID0gcmVxdWlyZSAncmVxdWVzdCdcblByb21pc2UgPSByZXF1aXJlICdibHVlYmlyZCdcblxuTG9nID0gcmVxdWlyZSAnLi9sb2cnXG5VcmxzID0gcmVxdWlyZSAnLi91cmxzJ1xuQ29sb3IgPSByZXF1aXJlICcuL2NvbG9yJ1xuQ29uZmlnID0gcmVxdWlyZSAnLi9jb25maWcnXG5cbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIEF1dGhvcml6ZXJcbiAgc2F2ZVRva2VuOiAoYWNjZXNzX3Rva2VuKSAtPlxuICAgIGNvbmZpZyA9IHsgYWNjZXNzX3Rva2VuOiBhY2Nlc3NfdG9rZW4gfVxuICAgIENvbmZpZy51cGRhdGUoJ2FjY2Vzc190b2tlbicsIGFjY2Vzc190b2tlbilcbiAgICBMb2cgPSByZXF1aXJlICcuL2xvZydcbiAgICBMb2cuZG9uZUxpbmUoJ0FjY2VzcyB0b2tlbiBzYXZlZC4nKVxuXG4gIGFjY2Vzc1Rva2VuOiAtPlxuICAgIENvbmZpZy5maWxlQ29udGVudHMoKS5hY2Nlc3NfdG9rZW5cblxuICBsb2dpbjogKGNiID0gLT4pIC0+XG4gICAgbG9naW5fcXVlc3Rpb25zID0gIFtcbiAgICAgIHtcbiAgICAgICAgbWVzc2FnZTogJ1lvdXIgZW1haWwgYWRkcmVzcydcbiAgICAgICAgbmFtZTogJ2VtYWlsJ1xuICAgICAgICB0eXBlOiAnaW5wdXQnXG4gICAgICB9XG4gICAgICB7XG4gICAgICAgIG1lc3NhZ2U6ICdZb3VyIHBhc3N3b3JkJ1xuICAgICAgICBuYW1lOiAncGFzc3dvcmQnXG4gICAgICAgIHR5cGU6ICdwYXNzd29yZCdcbiAgICAgIH1cbiAgICBdXG5cbiAgICBpbnF1aXJlci5wcm9tcHQgbG9naW5fcXVlc3Rpb25zLCAoYW5zd2VycykgPT5cbiAgICAgIEBnZXRUb2tlbihhbnN3ZXJzKS50aGVuKC0+XG4gICAgICAgIExvZy5icigpXG4gICAgICAgIGNiKClcbiAgICAgICkuY2F0Y2ggKHJlc3ApID0+XG4gICAgICAgIGlmIHJlc3AuY29kZSA9PSA0MDFcbiAgICAgICAgICBMb2cgPSByZXF1aXJlICcuL2xvZydcblxuICAgICAgICAgIGlmIHJlc3Auc3RhdHVzID09ICdsb2NrZWQnXG4gICAgICAgICAgICBMb2cuZXJyb3IoJ1RvbyBtYW55IGludmFsaWQgbG9naW5zLiBBY2NvdW50IGxvY2tlZCBmb3IgMSBob3VyLicsIGZhbHNlKVxuICAgICAgICAgICAgTG9nLmlubmVyRXJyb3IoXCJDaGVjayB5b3VyIGVtYWlsIGZvciB1bmxvY2sgaW5zdHJ1Y3Rpb25zIG9yIGNvbnRhY3QgdGhlIHN1cHBvcnQgYXQgI3tDb2xvci52aW9sZXQoJ2Nsb3NlaGVhdC5jb20vc3VwcG9ydCcpfS5cIilcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJXcm9uZyBwYXNzd29yZCBvciBlbWFpbC4gUGxlYXNlIHRyeSBhZ2FpblwiLCBmYWxzZSlcbiAgICAgICAgICAgIEBsb2dpbihjYilcblxuICAgICAgICBlbHNlXG4gICAgICAgICAgTG9nLmJhY2tlbmRFcnJvcigpXG5cbiAgZ2V0VG9rZW46IChhbnN3ZXJzKSAtPlxuICAgIG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICByZXF1ZXN0IHVybDogVXJscy5nZXRUb2tlbigpLCBxczogYW5zd2VycywgbWV0aG9kOiAncG9zdCcsIGpzb246IHRydWUsIChlcnIsIHJlc3ApID0+XG4gICAgICAgIExvZy5lcnJvcihlcnIpIGlmIGVyclxuXG4gICAgICAgIGlmIHJlc3Auc3RhdHVzQ29kZSA9PSAyMDBcbiAgICAgICAgICBAc2F2ZVRva2VuKHJlc3AuYm9keS5hY2Nlc3NfdG9rZW4pXG4gICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICByZWplY3QoY29kZTogcmVzcC5zdGF0dXNDb2RlLCBzdGF0dXM6IHJlc3AuYm9keS5zdGF0dXMpXG5cbiAgZm9yY2VMb2dpbjogKGNiKSAtPlxuICAgIExvZy5zdG9wKClcbiAgICBMb2cuYnIoKVxuICAgIExvZy5wIENvbG9yLnJlZFllbGxvdygnUGxlYXNlIGxvZ2luIHRvIGNsb3NlaGVhdC5jb20gdG8gY2hlY2sgb3V0IHlvdXIgYXBwIGxpc3QuJylcbiAgICBAbG9naW4oY2IpXG5cbiAgdW5hdXRob3JpemVkOiAocmVzcCkgLT5cbiAgICByZXNwLnN0YXR1c0NvZGUgPT0gNDAxXG5cbiAgY2hlY2tMb2dnZWRJbjogKHJlc3AsIGNiKSAtPlxuICAgIGlmIEB1bmF1dGhvcml6ZWQocmVzcClcbiAgICAgIEBmb3JjZUxvZ2luKGNiKVxuIixudWxsXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=