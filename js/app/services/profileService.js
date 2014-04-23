(function() {

	var arrayCopy = function(src) {
		var result = [];
		angular.forEach(src, function(value) {
			result.push(value);
		});
		return result;
	};
	
	angular.module('fmi.services.profileService', []).factory('profileService', ['$http', '$q', function ($http, $q) {
		var profile = null, interests = null, languages = null;
		
		var api = {
			getProfile: function() {
				var def = $q.defer();
				
				setTimeout(function() {
					if (profile) {
						def.resolve(profile);
						return;
					}
					
					$http({
						url: 'js/app/data/profile.json',
						method: 'GET'
					}).then(function(response) {
						var data = response.data;
						profile = data;
						def.resolve(data);
					}, def.reject);
				}, 500);
				
				return def.promise;
			},
			
			updateProfile: function(newProfile) {
				var def = $q.defer();
				
				setTimeout(function() {
					profile = newProfile;
					def.resolve();
				}, 500);
				
				return def.promise;
			},
			
			getInterests: function() {
				var def = $q.defer();
				
				setTimeout(function() {
					if (interests) {
						def.resolve(arrayCopy(interests));
						return;
					}
					
					$http({
						url: 'js/app/data/interests.json',
						method: 'GET'
					}).then(function(response) {
						var data = response.data;
						interests = data;
						def.resolve(arrayCopy(interests));
					}, def.reject);
				}, 500);
				
				return def.promise;
			},			
			addInterest: function(interest) {
				var def = $q.defer();
				
				setTimeout(function() {
					interests.push(interest);
					def.resolve();
				}, 500);
				
				return def.promise;
			},
			removeInterest: function(interest) {
				var def = $q.defer();
				
				setTimeout(function() {
					var index = interests.indexOf(interest);
					if (index >= 0) {
						interests.splice(index, 1);
						def.resolve();
					} else {
						def.reject();
					}
				}, 500);
				
				return def.promise;
			},
			
			getLanguages: function() {
				var def = $q.defer();
				
				setTimeout(function() {
					if (languages) {
						def.resolve(arrayCopy(languages));
						return;
					}
					
					$http({
						url: 'js/app/data/languages.json',
						method: 'GET'
					}).then(function(response) {
						var data = response.data;
						languages = data;
						def.resolve(arrayCopy(languages));
					}, def.reject);
				}, 500);
				
				return def.promise;
			},			
			addLanguage: function(language) {
				var def = $q.defer();
				
				setTimeout(function() {
					languages.push(language);
					def.resolve();
				}, 500);
				
				return def.promise;
			},
			removeLanguage: function(language) {
				var def = $q.defer();
				
				setTimeout(function() {
					var index = languages.indexOf(language);
					if (index >= 0) {
						languages.splice(index, 1);
						def.resolve();
					} else {
						def.reject();
					}
				}, 500);
				
				return def.promise;
			}
		};
		return api;
	}]);
})();