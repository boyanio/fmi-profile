(function(exp) {
	'use strict';
	
	var appModule = angular.module('fmi', [
		'ngRoute',
		'ui.bootstrap',
		'fmi.controllers.WallCtrl',
		'fmi.controllers.HomeworksCtrl',
		'fmi.controllers.GradesCtrl',
		'fmi.controllers.ProfileCtrl',
		'fmi.directives.myNavigation',
		'fmi.directives.stars',
		'fmi.services.eventService',
		'fmi.services.courseService',
		'fmi.services.profileService'
	]);
	
	// Configuration
	appModule.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider.when('/', {templateUrl: 'js/app/partials/wall.html', controller: 'WallCtrl', title: 'Лична стена'});
		$routeProvider.when('/homeworks', {templateUrl: 'js/app/partials/homeworks.html', controller: 'HomeworksCtrl', title: 'Домашни'});
		$routeProvider.when('/grades', {templateUrl: 'js/app/partials/grades.html', controller: 'GradesCtrl', title: 'Оценки'});
		$routeProvider.when('/profile', {templateUrl: 'js/app/partials/profile.html', controller: 'ProfileCtrl', title: 'Профил'});
		$routeProvider.otherwise({redirectTo: '/'});
	}]);
	
	appModule.run(['$rootScope', function($rootScope) {
		
		$rootScope.handleGeneralError = function() {
			alert('Опа! Случи се нещо кофти. Опитай да заредиш страницата отново.');
		};
	}]);
})(window);