notes.controller('MainController', ['$scope', '$rootScope', '$routeParams', '$window', '$location', 'userSvc', 'authSvc', 'notesSvc', '$mdSidenav', '$log', 'ngProgressFactory', '$timeout',
	function($scope, $rootScope, $routeParams, $window, $location, userSvc, authSvc, notesSvc, $mdSidenav, $log, ngProgressFactory, $timeout){

	$scope.isTouch = 'ontouchstart' in document.documentElement;

	$scope.$on('$routeChangeStart', function(next, current) {
		$scope.progressbar = ngProgressFactory.createInstance();
  	$scope.progressbar.setColor('rgb(213, 0, 0)');
  	$scope.progressbar.setHeight('2px');
  	$scope.progressbar.start();
 	});

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

		$timeout(function() {
			$scope.progressbar.complete();
		}, 1000);
	});

	$rootScope.locate = function(link) {
		$location.path(link);
	}

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
		var overlay = angular.element('.side-menu md-backdrop');
		if(overlay.length) {
			$scope.toggleRight();
		}
		$location.path('/login');
	}

	$rootScope.toggleRight = buildToggler('right');

	$scope.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };

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
