notes.directive('onFinishRender',['$timeout', '$rootScope', function ($timeout, $rootScope) {
	var elements = {};
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			if (scope.$first === true) {
				elements[attr.onFinishRender] = [];
			}
			elements[attr.onFinishRender].push(element.get(0));
			if (scope.$last === true) {
				$timeout(function () {
					$rootScope.$broadcast('ngRepeatFinished.' + attr.onFinishRender, elements[attr.onFinishRender]);
					elements[attr.onFinishRender] = [];
				});
			}
		}
	}
}]);