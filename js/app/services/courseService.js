(function() {
	
	angular.module('fmi.services.courseService', []).factory('courseService', ['$http', '$q', function ($http, $q) {
		
		var api = {
			getCourses: function() {
				var def = $q.defer();
				
				setTimeout(function() {
					$http({
						url: 'js/app/data/courses.json',
						method: 'GET'
					}).then(function(response) {
						var data = response.data;
						def.resolve(data);
					}, def.reject);
				}, 1000);
				
				return def.promise;
			},
			
			getHomeworks: function() {
				var def = $q.defer();
				
				setTimeout(function() {
					$http({
						url: 'js/app/data/homeworks.json',
						method: 'GET'
					}).then(function(response) {
						var data = response.data;
						angular.forEach(data, function(d) {
							d.deadline = new Date(d.deadline);
						});
						def.resolve(data);
					}, def.reject);
				}, 1000);
				
				return def.promise;
			},
			
			getGrades: function() {
				var def = $q.defer();
				
				setTimeout(function() {
					$http({
						url: 'js/app/data/grades.json',
						method: 'GET'
					}).then(function(response) {
						var data = response.data;
						angular.forEach(data, function(d) {
							d.date = new Date(d.date);
						});
						def.resolve(data);
					}, def.reject);
				}, 1000);
				
				return def.promise;
			}
		};
		return api;
	}]);
})();