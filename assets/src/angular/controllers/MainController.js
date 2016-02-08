notes.controller('MainController', ['$scope', '$rootScope', '$routeParams', '$window', '$location', 'userSvc', 
	function($scope, $rootScope, $routeParams, $window, $location, userSvc){

	$scope.isTouch = 'ontouchstart' in document.documentElement;

	$scope.$on('$viewContentLoaded', function () {

		if($rootScope.name == 'login') {
	    	$scope.bodyClass = 'login-page';
	    } else {
	    	$scope.bodyClass = '';
	    }
			
		if(typeof window.localStorage.access_token != 'undefined'
		&& window.localStorage.access_token != '') {
			userSvc.getUser().then(function(response) {
				$rootScope.user = response;
			});
		} else {
			$location.path('/login');
		}

	});

	$scope.toggleSideMenu = function() {
		$scope.sideMenuState = $scope.sideMenuState ? '' : 'active';
	}

}]);