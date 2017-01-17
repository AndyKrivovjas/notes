notes.service('dialogSvc', ['$mdDialog', '$timeout', function($mdDialog, $timeout) {

	var dialogSvc = this;

	this.dialog = function(ev, alertScope, templateUrl, useFullScreen) {

		alertScope.cancel = function() {
			$mdDialog.cancel();
		};

		alertScope.dialogID = "dialog" + Math.random().toString().slice(2,11);
		alertScope.centerDialog = function() {
			$timeout(function() {
				var css = {
					position: 'absolute',
					height: 'auto',
					bottom: 'auto'
				};
				$('#' + alertScope.dialogID).css(css);

				var top = $(document).scrollTop();
				var windowHeight = $(window).height();
				var documentHeight = $(document).height();
				var dialogHeight = $('#' + alertScope.dialogID).height();

				if(dialogHeight < windowHeight) {
					top += (windowHeight - dialogHeight) / 2;
				}

				if(documentHeight < (top + dialogHeight)) {
					css['bottom'] = '0px';
				} else {
					css['top'] = top + 'px';
				}
				$('#' + alertScope.dialogID).css(css);
			}, 100); // have to be fixed
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

		return $mdDialog.show({
			templateUrl: templateUrl,
			parent: angular.element(document.body),
			locals: { data: alertScope },
			controller: ['$scope', 'data', function($scope, data) {
				angular.extend($scope, data);
			}],
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: useFullScreen
		});
	}

	return dialogSvc;

}]);
