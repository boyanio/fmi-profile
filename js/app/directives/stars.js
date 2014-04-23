(function() {
	'use strict';
	
	angular.module('fmi.directives.stars', []).directive('myStars', function() {
		return {
			restrict: 'A',
			scope: {
				number: '=myStars',
				readOnly: '=starsReadOnly',
				selected: '=starsSelected'
			},
			template: '<span class="stars" ng-mouseenter="isMouseOver = true" ng-mouseleave="isMouseOver = false"><a ng-href="" ng-repeat="i in numbers" ng-click="selectStar(i)" ng-class="{ selected: !isMouseOver && i < selected }" ng-mouseenter="fillStars(i)" ng-mouseleave="unfillStars(i)"><i class="glyphicon glyphicon-star"></i></a></span>',
			link: function($scope, $element, $attrs) {
				$scope.selectStar = function(i) {
					if ($scope.readOnly)
						return;
					
					$scope.selected = i + 1;
				};
				
				$scope.$watch('number', function(number) {
					var numbers = [];
					for (var i = 0; i < number; i++) {
						numbers.push(i);
					}
					$scope.numbers = numbers;
				});
				
				$scope.fillStars = function(i) {
					angular.forEach($element.find('a'), function(anchor, index) {
						if (index <= i) {
							$(anchor).addClass('active');
						}
					});
				};
				
				$scope.unfillStars = function(i) {
					angular.forEach($element.find('a'), function(anchor) {
						$(anchor).removeClass('active');
					});
				};
			}
		};
	});
})();