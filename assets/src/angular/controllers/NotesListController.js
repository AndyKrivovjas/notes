notes.controller('NotesListController', ['$scope', '$rootScope', '$routeParams', '$window', '$location', 'notesSvc', '$mdDialog', '$mdMedia', '$timeout', 
	function($scope, $rootScope, $routeParams, $window, $location, notesSvc, $mdDialog, $mdMedia, $timeout){

	var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  || $scope.customFullscreen;
	$scope.$watch(function() {
		return $mdMedia('xs') || $mdMedia('sm');
	}, function(wantsFullScreen) {
		$scope.customFullscreen = (wantsFullScreen === true);
	});

	$scope.removeNote = function(ev, ind, note) {
		var confirm = $mdDialog.confirm()
			.title('Would you like to delete ' + note.title + '?')
			.textContent('The note will be deleted permanently.')
			.targetEvent(ev)
			.ok('Delete!')
			.cancel('I\'ve changed my mind');
		$mdDialog.show(confirm).then(function() {
			notesSvc.deleteNote(note).then(function() {
				$rootScope.data.notes.splice(ind, 1);
			});
		}, function() {
		  
		});
	};

	$scope.noteAlert = function(ev, ind, action, note) {
		var alertScope = {};

		alertScope = $rootScope.data;
		alertScope.action = action;

		alertScope.tags.map( function (tag) {
			tag.value = tag.name.toLowerCase();
			return tag;
		});

		alertScope.openMenu = function($mdOpenMenu, ev) {
	    	$mdOpenMenu(ev);
	    };
	    alertScope.applyColor = function(color) {
	    	alertScope.note.color = color;
	    	if(note)
	    		note.color = color;
	    }

		if(action == 'edit') {
			alertScope.note = note;
			alertScope.title = 'Edit';
			alertScope.save = function(noteEntity) {
				notesSvc.editNote(noteEntity).then(function(response) {
					note.date_modified = +new Date;
					$mdDialog.cancel();
				});
			}
			alertScope.removeNote = function(noteEntity) {
				notesSvc.deleteNote(note).then(function() {
					$rootScope.data.notes.splice(_.findIndex($rootScope.data.notes, ['id', noteEntity.id]), 1);
					$mdDialog.cancel();
				});
			}
		}
		if(action == 'add') {
			alertScope.note = {
				tags: [],
			}
			alertScope.title = 'Create a note';
			alertScope.save = function(noteEntity) {
				notesSvc.addNote(noteEntity).then(function(response) {
					$rootScope.data.notes.push(response);
					$mdDialog.cancel();
				});
			}
		}

		alertScope.querySearch = function(query) {
			var results = query ? alertScope.tags.filter(createFilterFor(query)) : alertScope.tags,
			deferred;
			if (alertScope.simulateQuery) {
				deferred = $q.defer();
				$timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
					return deferred.promise;
			} else {
				return results;
			}
		}

		function createFilterFor(query) {
			var lowercaseQuery = angular.lowercase(query);
			return function filterFn(state) {
				return (state.value.indexOf(lowercaseQuery) === 0);
			};
		}

		alertScope.cancel = function() {
			$mdDialog.cancel();
		};

		$mdDialog.show({
			templateUrl: 'assets/src/views/templates/note-form.html',
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