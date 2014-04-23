(function() {
	'use strict';

	angular.module('fmi.controllers.GradesCtrl', []).controller('GradesCtrl', ['$scope', '$q', 'courseService', function($scope, $q, courseService) {
		
		$scope.courses = [];
		$scope.isLoading = true;
		
		$q.all([courseService.getCourses(), courseService.getGrades()]).then(function(data) {
			var courses = data[0],
				grades = data[1];
			
			var coursesWithGrades = angular.copy(courses);
			
			angular.forEach(grades, function (grade) {
				// Find the course
				var course = null;
				for (var i = 0; i < coursesWithGrades.length; i++) {
					if (coursesWithGrades[i].id === grade.courseId) {
						course = coursesWithGrades[i];
						break;
					}
				}
				
				// Map any grades to the course
				if (course) {
					if (!course.grades)
						course.grades = [];
						
					course.grades.push(grade);
				}
			});
			
			$scope.courses = coursesWithGrades;
		}, $scope.handleGeneralError)['finally'](function() {
			$scope.isLoading = false;
		});
	}]);
})();