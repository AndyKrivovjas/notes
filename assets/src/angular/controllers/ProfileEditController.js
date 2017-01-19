notes.controller('ProfileEditController', ['$scope', '$rootScope', '$location', 'userSvc', '$mdToast',
	function($scope, $rootScope, $location, userSvc, $mdToast){

	var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };

  $scope.toastPosition = angular.extend({},last);

  $scope.getToastPosition = function() {
    sanitizePosition();

    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

  function sanitizePosition() {
    var current = $scope.toastPosition;

    if ( current.bottom && last.top ) current.top = false;
    if ( current.top && last.bottom ) current.bottom = false;
    if ( current.right && last.left ) current.left = false;
    if ( current.left && last.right ) current.right = false;

    last = angular.extend({},current);
  }


	$scope.submit = function(data) {

		userSvc.update(data.user).then(function() {
			var pinTo = $scope.getToastPosition();
	    var toast = $mdToast.simple()
	      .textContent('You have just modified your profile.')
	      .action('Take a note.')
	      .highlightAction(true)
	      .highlightClass('md-accent')
	      .position(pinTo).hideDelay(10000);

	    $mdToast.show(toast).then(function(response) {
	      if ( response == 'ok' ) {
	        $location.path('/');
	      }
	    });
		});
	}

}]);
