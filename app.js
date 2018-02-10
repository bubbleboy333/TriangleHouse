var app = angular.module('TriangleHouse', ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl: "templates/main.html",
		controller: "MainController"
	})
	.when("/add", {
		templateUrl: "templates/addMeal.html",
		controller: "AddMealController"
	})
	.when("/request", {
		templateUrl: "templates/request.html",
		controller: "RequestController"
	})
	.when("/view", {
		templateUrl: "templates/view.html",
		controller: "ViewController"
	})
	.otherwise({
        template: '<h1>Route not Found</h1><h3>This is an incorrect route<h3><p>take me back <a href="#!">HOME</a></p>'
    });
});

app.controller('MainController', [ '$scope', function($scope) {
	$scope.mainHeader = "";

	$scope.addMeal = function() {
		alert("addMeal");
	}
}]);
