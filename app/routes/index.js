'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
//var timeHandler = require(path + '/app/controllers/timekHandler.server.js');


module.exports = function(app, passport) {

  /*	function isLoggedIn (req, res, next) {
  		if (req.isAuthenticated()) {
  			return next();
  		} else {
  			res.redirect('/timestamp');
  		}
  	}*/


  var clickHandler = new ClickHandler();

  app.route('/')
    .get(function(req, res) {
    	var headers = req.headers
    	var solutionHeaders = {};
    	console.log(headers["host"]);
    	solutionHeaders["ipaddress"]= headers["x-forwarded-for"];
    	var language = headers["accept-language"];
    	language = language.split(',');
    	language = language[0];
    	solutionHeaders["language"] = language;
    	var software = headers["user-agent"];
    	software = software.split('(');
    	software = software[1];
    	software = software.split(')');
    	software = software[0];
    	solutionHeaders["software"] = software;
    	solutionHeaders["language"] = language;
      res.send(solutionHeaders);
    });


  /*	app.route('/timestamp')
		 .post(function(req, res) {
		 	var x = req.body.split('');
     //console.log(res.send(req.body.str.split('').reverse().join('')));
     console.log(x);
     res.sendFile(path + '/public/timestamp.html');
    })*/

  /*	app.route('/login')
  		.get(function (req, res) {
  			res.sendFile(path + '/public/login.html');
  		});*/
/*  app.route('/timestamp/')

  .get(function(req, res) {

    res.sendFile(path + '/public/timestamp.html');
  });*/


  app.route('/logout')
    .get(function(req, res) {

      res.redirect('/login');
    });

  app.route('/profile')
    .get(function(req, res) {
      res.sendFile(path + '/public/profile.html');
    });

  app.route('/api/:id')
    .get(function(req, res) {
      res.json(req.user.github);
    });

  app.route('/auth/github')
    .get(passport.authenticate('github'));

  app.route('/auth/github/callback')
    .get(passport.authenticate('github', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));

  /*app.route('/api/:id/clicks')
  	.get(isLoggedIn, clickHandler.getClicks)
  	.post(isLoggedIn, clickHandler.addClick)
  	.delete(isLoggedIn, clickHandler.resetClicks);*/
};