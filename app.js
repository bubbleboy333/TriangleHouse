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
	$scope.day = moment();
	$scope.addMeal = function() {
		alert("addMeal");
	}
}]);

app.directive("calendar", function() {
    return {
        restrict: "E",
        templateUrl: "templates/calendar.html",
        scope: {
            selected: "="
        },
        link: function(scope) {
            scope.selected = _removeTime(scope.selected || moment());
            scope.month = scope.selected.clone();

            var start = scope.selected.clone();
            start.date(1);
            _removeTime(start.day(0));

            _buildMonth(scope, start, scope.month);

            scope.select = function(day) {
                scope.selected = day.date;  
            };

            scope.next = function() {
                var next = scope.month.clone();
                _removeTime(next.month(next.month()+1)).date(1);
                scope.month.month(scope.month.month()+1);
                _buildMonth(scope, next, scope.month);
            };

            scope.previous = function() {
                var previous = scope.month.clone();
                _removeTime(previous.month(previous.month()-1).date(1));
                scope.month.month(scope.month.month()-1);
                _buildMonth(scope, previous, scope.month);
            };
        }
    };
    
    function _removeTime(date) {
        return date.day(0).hour(0).minute(0).second(0).millisecond(0);
    }

    function _buildMonth(scope, start, month) {
        scope.weeks = [];
        var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
        while (!done) {
            scope.weeks.push({ days: _buildWeek(date.clone(), month) });
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }
    }

    function _buildWeek(date, month) {
        var days = [];
        for (var i = 0; i < 7; i++) {
            days.push({
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date
            });
            date = date.clone();
            date.add(1, "d");
        }
        return days;
    }
});