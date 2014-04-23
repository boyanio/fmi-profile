(function() {
	'use strict';

	angular.module('fmi.controllers.WallCtrl', []).controller('WallCtrl', ['$scope', '$timeout', '$route', 'eventService', function($scope, $timeout, $route, eventService) {
		
		$scope.events = [];
		$scope.isLoading = false;
		
		var loadEvents = function() {
			$scope.isLoading = true;
		
			eventService.getEvents().then(function(events) {
				$scope.events = events;
				
				// Load again only if we are still at the same page
				if ($route.current.$$route.controller === 'WallCtrl') {
					$timeout(loadEvents, 2000);
				}
			}, $scope.handleGeneralError)['finally'](function() {
				$scope.isLoading = false;
			});
		};
		loadEvents();
	}]);
})();