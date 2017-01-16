notes.controller('NotesListController', ['$scope', '$rootScope', '$routeParams', '$window', '$location', 'notesSvc', '$mdDialog', '$mdBottomSheet', '$mdMedia', '$timeout',
	function($scope, $rootScope, $routeParams, $window, $location, notesSvc, $mdDialog, $mdBottomSheet, $mdMedia, $timeout){

	var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  || $scope.customFullscreen;
	$scope.$watch(function() {
		return $mdMedia('xs') || $mdMedia('sm');
	}, function(wantsFullScreen) {
		$scope.customFullscreen = (wantsFullScreen === true);
	});

	$scope.removeNote = function(ev, ind, note) {
		var confirm = $mdDialog.confirm()
			.title('Would you like to delete "' + note.title + '"?')
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

		alertScope = angular.copy($rootScope.data);
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
				var confirm = $mdDialog.confirm()
					.multiple(true)
					.title('Would you like to delete "' + noteEntity.title + '"?')
					.textContent('The note will be deleted permanently.')
					.targetEvent(ev)
					.ok('Delete!')
					.cancel('I\'ve changed my mind');
				$mdDialog.show(confirm).then(function() {
					notesSvc.deleteNote(noteEntity).then(function() {
						$rootScope.data.notes.splice(_.findIndex($rootScope.data.notes, ['id', noteEntity.id]), 1);
						$mdDialog.cancel();
					});
				}, function() {

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

		alertScope.dialogID = "dialog" + Math.random().toString().slice(2,11);
		alertScope.centerDialog = function() {
			$timeout(function() {
				var css = {};
				var top = $(document).scrollTop();
				var windowHeight = $(window).height();
				var documentHeight = $(document).height();
				var dialogHeight = $('#' + alertScope.dialogID).height();

				if(dialogHeight < windowHeight) {
					top += (windowHeight - dialogHeight) / 2;
				}

				console.log(top);

				if(documentHeight < (top + dialogHeight)) {
					css = {
						bottom: '0px'
					};
				} else {
					css = {
						top: top + 'px'
					};
				}
				$('#' + alertScope.dialogID).css(css);
			}, 0);
		}

		alertScope.applyScroll = function() {
			$timeout(function() {
				$('#' + alertScope.dialogID).find("md-dialog-content").niceScroll({
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

				alertScope.centerDialog();
			}, 0);
		}

		$mdDialog.show({
			templateUrl: 'assets/src/views/templates/form/note-form.html',
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
