notes.controller('MainController', ['$scope', '$rootScope', '$routeParams', '$window', '$location', 'userSvc', 'authSvc', 'notesSvc', '$mdSidenav', '$log',  
	function($scope, $rootScope, $routeParams, $window, $location, userSvc, authSvc, notesSvc, $mdSidenav, $log){

	$scope.isTouch = 'ontouchstart' in document.documentElement;

	$scope.$on('$viewContentLoaded', function () {

		if($rootScope.name == 'login') {
			$scope.bodyClass = 'login-page';
		} else {
			$scope.bodyClass = '';

			//token check
			authSvc.ping().then(function(response) {
				$scope.main();
			}, function(error) {
				if(error.code == 401) { // Not authorized
					authSvc.refreshToken().then(function(response) {
						$scope.main();
					}, function(error) {
						$scope.logout();
					});
				}
			});
		}
	});

	$scope.main = function() {
		$rootScope.$broadcast('auth.checked');
		if(typeof $rootScope.data == 'undefined') {
			$rootScope.data = {
				user: [],
				tags: [],
				categories: [],
				notes: [],
				colors: []
			};
		}

		userSvc.getUser().then(function(userInfo) {
			$rootScope.data.user = userInfo;
		});
		notesSvc.getTags().then(function(tagsList) {
			$rootScope.data.tags = tagsList || [];
		});
		notesSvc.getCategories().then(function(categoriesList) {
			$rootScope.data.categories = categoriesList || [];
		});
		notesSvc.getNotes().then(function(notesList) {
			$rootScope.data.notes = notesList || [];
			$rootScope.$broadcast('notes.loaded');
		});
		notesSvc.getColors().then(function(colorsList) {
			$rootScope.data.colors = colorsList || [];
		});
	}

	$scope.logout = function() {
		$scope.toggleRight();
		$location.path('/login');
	}

	$scope.toggleRight = buildToggler('right');

	function buildToggler(navID) {
	  return function() {
		$mdSidenav(navID)
		  .toggle()
		  .then(function () {
			if(navID == 'right') {
				var overlay = angular.element('.side-menu md-backdrop');
				if(overlay.length) {
					angular.element('body').addClass('locked-scroll');
					overlay.click(function() {
						angular.element('body').removeClass('locked-scroll');
					});
				} else {
					angular.element('body').removeClass('locked-scroll');
				}
			}
		  });
	  }
	}

}]);