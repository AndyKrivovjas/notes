notes.controller('SideMenuController', ['$scope', '$rootScope', '$location', 'userSvc', 'notesSvc', '$mdDialog', '$mdMedia',
	function($scope, $rootScope, $location, userSvc, notesSvc, $mdDialog, $mdMedia) {

	$rootScope.$on('auth.checked', function() {
		
	})

	$scope.removeCategory = function(ev, ind, category) {
		var confirm = $mdDialog.confirm()
			.title('Would you like to delete ' + category.name + '?')
			.textContent('The category will be deleted permanently.')
			.targetEvent(ev)
			.ok('Delete!')
			.cancel('I\'ve changed my mind');
		$mdDialog.show(confirm).then(function() {
			notesSvc.deleteCategory(category).then(function() {
				$rootScope.categories.splice(ind, 1);
			});
		}, function() {
		  
		});
	};

	$scope.removeTag = function(ev, ind, tag) {
		var confirm = $mdDialog.confirm()
			.title('Would you like to delete ' + tag.name + '?')
			.textContent('The tag will be deleted permanently.')
			.targetEvent(ev)
			.ok('Delete!')
			.cancel('I\'ve changed my mind');
		$mdDialog.show(confirm).then(function() {
			notesSvc.deleteTag(tag).then(function() {
				$rootScope.tags.splice(ind, 1);
			});
		}, function() {
		  
		});
	};

	$scope.tagAlert = function(ev, ind, action, tag) {
		var alertScope = {};

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
					$rootScope.tags.splice(_.findIndex($rootScope.tags, ['id', tagEntity.id]), 1);
					$mdDialog.cancel();
				});
			}
		}
		if(action == 'add') {
			alertScope.title = 'Create a Tag';
			alertScope.save = function(tagEntity) {
				notesSvc.addTag(tagEntity).then(function(response) {
					$rootScope.tags.push(response);
					$mdDialog.cancel();
				});
			}
		}

		alertScope.cancel = function() {
			$mdDialog.cancel();
		};

		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

		alertScope.dialog = $mdDialog.show({
			templateUrl: 'assets/src/views/templates/tag-form.html',
			parent: angular.element(document.body),
			locals: { data: alertScope },
			controller: ['$scope', 'data', function($scope, data) { 
				angular.extend($scope, data);
			}],
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: useFullScreen
		})
		.then(function(answer) {
			$scope.status = 'You said the information was "' + answer + '".';
		}, function() {
			$scope.status = 'You cancelled the dialog.';
		});
		$scope.$watch(function() {
			return $mdMedia('xs') || $mdMedia('sm');
		}, function(wantsFullScreen) {
			$scope.customFullscreen = (wantsFullScreen === true);
		});
	};

}]);