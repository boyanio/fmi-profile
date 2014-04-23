(function() {
	'use strict';

	angular.module('fmi.directives.myNavigation', []).directive('myNavigation', ['$route', function($route) {
		return {
			restrict: 'A',
			link: function($scope, $element) {
				var routes = [];
				angular.forEach($route.routes, function (route, href) {
					if (route.title) {
						routes.push({ title: route.title, href: href, route: route });
					}
				});
				$scope.routes = routes;
				
				$scope.isCurrent = function(route) {
					return route === $route.current.$$route;
				};
			},
			templateUrl: 'js/app/directives/navigation/navigation.html'
		};			
	}]);
})();