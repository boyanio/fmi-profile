(function() {
	'use strict';

	angular.module('fmi.controllers.HomeworksCtrl', []).controller('HomeworksCtrl', ['$scope', '$q', 'courseService', function($scope, $q, courseService) {
		
		$scope.courses = [];
		$scope.isLoading = true;
		
		$q.all([courseService.getCourses(), courseService.getHomeworks()]).then(function(data) {
			var courses = data[0],
				homeworks = data[1];
			
			var coursesWithHomeworks = angular.copy(courses);
			
			angular.forEach(homeworks, function (homework) {
				// Find the course
				var course = null;
				for (var i = 0; i < coursesWithHomeworks.length; i++) {
					if (coursesWithHomeworks[i].id === homework.courseId) {
						course = coursesWithHomeworks[i];
						break;
					}
				}
				
				// Map any homeworks to the course
				if (course) {
					if (!course.homeworks)
						course.homeworks = [];
						
					course.homeworks.push(homework);
				}
			});
			
			$scope.courses = coursesWithHomeworks;
		}, $scope.handleGeneralError)['finally'](function() {
			$scope.isLoading = false;
		});
	}]);
})();