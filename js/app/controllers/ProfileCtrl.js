(function() {
	'use strict';

	angular.module('fmi.controllers.ProfileCtrl', []).controller('ProfileCtrl', ['$scope', 'profileService', function($scope, profileService) {
	
		$scope.profile = {
			about: null
		};
		
		$scope.isLoadingProfile = true;
		
		profileService.getProfile().then(function(profile) {
			$scope.profile = profile;
		}, $scope.handleGeneralError)['finally'](function() {
			$scope.isLoadingProfile = false;
		});
		
		$scope.updateProfile = function() {
			$scope.isLoadingProfile = true;
			profileService.updateProfile($scope.profile)
				['catch']($scope.handleGeneralError)
				['finally'](function() {
					$scope.isLoadingProfile = false;
				});
		};
	
		//
		// Interests
		//
		$scope.interests = [];
		
		var resetInterest = function() {
			$scope.interest = {
				name: null
			};
		};
		resetInterest();
		
		$scope.addInterest = function() {
			var interest = angular.copy($scope.interest);
			if (interest.name) {
				$scope.isLoadingInterests = true;
				profileService.addInterest(interest).then(function() {
					$scope.interests.push(interest);
					resetInterest();
				}, $scope.handleGeneralError)['finally'](function() {
					$scope.isLoadingInterests = false;
				});
			}
		};
		
		$scope.removeInterest = function(interest) {
			var index = $scope.interests.indexOf(interest);
			if (index >= 0) {
				profileService.removeInterest(interest).then(function() {
					$scope.interests.splice(index, 1);
				}, $scope.handleGeneralError)['finally'](function() {
					$scope.isLoadingInterests = false;
				});
			}
		};
		
		$scope.isLoadingInterests = true;
		profileService.getInterests().then(function(interests) {
			$scope.interests = interests;
		}, $scope.handleGeneralError)['finally'](function() {
			$scope.isLoadingInterests = false;
		});
		
		//
		// Languages
		//
		$scope.languages = [];
		
		var resetLanguageFields = function() {
			$scope.language = {
				name: null,
				skills: 0
			};
		};
		resetLanguageFields();
		
		$scope.addLanguage = function() {
			var lang = angular.copy($scope.language);
			if (lang.name) {
				$scope.isLoadingLanguages = true;
				
				profileService.addLanguage(lang).then(function() {
					$scope.languages.push(lang);
					resetLanguageFields();
				}, $scope.handleGeneralError)['finally'](function() {
					$scope.isLoadingLanguages = false;
				});
			}
		};
		
		$scope.removeLanguage = function(lang) {
			var index = $scope.languages.indexOf(lang);
			if (index >= 0) {
				$scope.isLoadingLanguages = true;
				
				profileService.removeLanguage(lang).then(function() {
					$scope.languages.splice(index, 1);
				}, $scope.handleGeneralError)['finally'](function() {
					$scope.isLoadingLanguages = false;
				});
			}
		};
		
		$scope.isLoadingLanguages = true;
		profileService.getLanguages().then(function(languages) {
			$scope.languages = languages;
		}, $scope.handleGeneralError)['finally'](function() {
			$scope.isLoadingLanguages = false;
		});
	}]);
})();