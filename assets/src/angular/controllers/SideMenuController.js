notes.controller('SideMenuController', ['$scope', '$rootScope', '$location', 'userSvc', 'notesSvc', '$mdDialog', '$mdMedia', '$timeout',
	function($scope, $rootScope, $location, userSvc, notesSvc, $mdDialog, $mdMedia, $timeout) {

	$rootScope.$on('auth.checked', function() {

	});

	$(".block .list").niceScroll({
		scrollspeed: 100,
		mousescrollstep: 38,
		cursorwidth: 5,
		cursorborder: 0,
		cursorcolor: '#333',
		autohidemode: true,
		zindex: 999999999,
		horizrailenabled: false,
		cursorborderradius: 0,
	});

	var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  || $scope.customFullscreen;
	$scope.$watch(function() {
		return $mdMedia('xs') || $mdMedia('sm');
	}, function(wantsFullScreen) {
		$scope.customFullscreen = (wantsFullScreen === true);
	});

	$scope.removeCategory = function(ev, ind, category) {
		ev.stopPropagation();
		var confirm = $mdDialog.confirm()
			.title('Would you like to delete "' + category.name + '"?')
			.textContent('The category will be deleted permanently.')
			.targetEvent(ev)
			.ok('Delete!')
			.cancel('I\'ve changed my mind');
		$mdDialog.show(confirm).then(function() {
			notesSvc.deleteCategory(category).then(function() {
				$rootScope.data.categories.splice(ind, 1);
			});
		}, function() {

		});
	};

	$scope.removeTag = function(ev, ind, tag) {
		ev.stopPropagation();
		var confirm = $mdDialog.confirm()
			.title('Would you like to delete "' + tag.name + '"?')
			.textContent('The tag will be deleted permanently.')
			.targetEvent(ev)
			.ok('Delete!')
			.cancel('I\'ve changed my mind');
		$mdDialog.show(confirm).then(function() {
			notesSvc.deleteTag(tag).then(function() {
				$rootScope.data.tags.splice(ind, 1);
			});
		}, function() {

		});
	};

	$scope.tagAlert = function(ev, ind, action, tag) {
		ev.stopPropagation();

		var alertScope = {};
		alertScope.action = action;

		if(action == 'edit') {
			alertScope.tag = tag;
			alertScope.title = tag.name + '(Edit)';
			alertScope.save = function(tagEntity) {
				notesSvc.editTag(tagEntity).then(function(response) {
					$mdDialog.cancel();
				});
			}
			alertScope.removeTag = function(tagEntity) {
				notesSvc.deleteTag(tag).then(function() {
					$rootScope.data.tags.splice(_.findIndex($rootScope.data.tags, ['id', tagEntity.id]), 1);
					$mdDialog.cancel();
				});
			}
		}
		if(action == 'add') {
			alertScope.tag = {};
			alertScope.title = 'Create a Tag';
			alertScope.save = function(tagEntity) {
				notesSvc.addTag(tagEntity).then(function(response) {
					$rootScope.data.tags.push(response);
					$mdDialog.cancel();
				});
			}
		}

		alertScope.cancel = function() {
			$mdDialog.cancel();
		};

		alertScope.applyScroll = function() {
			$timeout(function() {
				$("md-dialog-content").niceScroll({
					scrollspeed: 100,
					mousescrollstep: 38,
					cursorwidth: 5,
					cursorborder: 0,
					cursorcolor: '#333',
					autohidemode: true,
					zindex: 999999999,
					horizrailenabled: false,
					cursorborderradius: 0,
				});
			}, 0);
		}

		alertScope.dialog = $mdDialog.show({
			templateUrl: 'assets/src/views/templates/form/tag-form.html',
			parent: angular.element(document.body),
			locals: { data: alertScope },
			controller: ['$scope', 'data', function($scope, data) {
				angular.extend($scope, data);
			}],
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: useFullScreen
		});
	};

	$scope.categoryAlert = function(ev, ind, action, category) {
		var alertScope = {};

		alertScope = angular.copy($rootScope.data);
		alertScope.action = action;

		alertScope.applyScroll = function() {
			$timeout(function() {
				$("md-dialog-content").niceScroll({
					scrollspeed: 100,
					mousescrollstep: 38,
					cursorwidth: 5,
					cursorborder: 0,
					cursorcolor: '#333',
					autohidemode: true,
					zindex: 999999999,
					horizrailenabled: false,
					cursorborderradius: 0,
				});
			}, 0);
		}

		if(action == 'edit') {
			alertScope.category = category;
			alertScope.title = category.name + '(Edit)';
			alertScope.categories.splice(_.findIndex(alertScope.categories, ['id', category.id]), 1);
			alertScope.save = function(categoryEntity) {
				notesSvc.editCategory(categoryEntity).then(function(response) {
					$mdDialog.cancel();
				});
			}
			alertScope.removeCategory = function(categoryEntity) {
				notesSvc.deleteCategory(category).then(function() {
					$rootScope.data.categories.splice(_.findIndex($rootScope.data.categories, ['id', categoryEntity.id]), 1);
					$mdDialog.cancel();
				});
			}
		}
		if(action == 'add') {
			alertScope.category = {};
			alertScope.title = 'Create a Category';
			alertScope.save = function(categoryEntity) {
				notesSvc.addCategory(categoryEntity).then(function(response) {
					$rootScope.data.categories.push(response);
					$mdDialog.cancel();
				});
			}
		}

		alertScope.cancel = function() {
			$mdDialog.cancel();
		};

		alertScope.dialog = $mdDialog.show({
			templateUrl: 'assets/src/views/templates/form/category-form.html',
			parent: angular.element(document.body),
			locals: { data: alertScope },
			controller: ['$scope', 'data', function($scope, data) {
				angular.extend($scope, data);
			}],
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: useFullScreen
		});
	};

}]);
