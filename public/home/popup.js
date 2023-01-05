var app = angular.module('home', ['ngRoute']);

app.config(function($routeProvider){

	$routeProvider
	.when('/', {
		templateUrl: '/Student/grievances.ejs'
	})

	.otherwise({
		template: 'Not found'
	});

});