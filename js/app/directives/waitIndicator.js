(function(exp) {
	'use strict';

	angular.module('fmi').directive('myWaitIndicator', function() {
		return {
			restrict: 'A',
			scope: {
				isLoading: '&myWaitIndicator',
				options: '&waitIndicatorOptions'
			},
			link: function($scope, $element, $attrs) {
				var spinner = null;
				
				$scope.$watch('isLoading()', function(isLoading) {
					if (isLoading) {
						if (!spinner) {
							spinner = new Spinner($scope.options());
						}
						spinner.spin($element[0]);
					} else {
						if (spinner) {
							spinner.stop();
						}
					}
				});
			}
		};
	});
})(window);