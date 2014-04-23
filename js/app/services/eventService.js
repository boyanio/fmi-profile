(function() {
	
	angular.module('fmi.services.eventService', []).factory('eventService', ['$http', '$q', function ($http, $q) {
		
		var api = {
			getEvents: function() {
				var def = $q.defer();
				
				setTimeout(function() {
					$http({
						url: 'js/app/data/events.json',
						method: 'GET'
					}).then(function(response) {
						var data = response.data;
						angular.forEach(data, function(evt) {
							evt.date = new Date(evt.date);
						});
						def.resolve(data);
					}, def.reject);
				}, 1500);
				
				return def.promise;
			}
		};
		return api;
	}]);
})();