notes.controller('LoginController', ['$scope', '$rootScope', '$location', 'authSvc', '$mdDialog',
	function($scope, $rootScope, $location, authSvc, $mdDialog){

	$scope.errors = {
		signin: {
			general: []
		},
		signup: {}
	}

	window.localStorage.access_token = '';
	window.localStorage.refresh_token = '';

	$scope.login = function($event, data) {
		$event.preventDefault();
		$scope.errors.signin = {general: []};
		authSvc.getUserScope(data).then(function(response) {
			data.scope = response.scope;
			authSvc.getToken(data).then(function(response) {
				$location.path('/');
			}, function(response) {
				$scope.errors.signin.general.push(response.error.error_description);
			});
		}, function(response) {
			$scope.errors.signin = response.error;
		});
	}

	$scope.register = function($event, data) {
		$event.preventDefault();
		$scope.errors.signup = {};
		authSvc.register(data).then(function(response) {
			$scope.login($event, data);
		}, function(response) {
			$scope.errors.signup = response.error;
		});
	}

	$scope.forgotten = function(ev) {
		// Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .title('What is your email address?')
      // .textContent('Bowser is a common name.')
      .placeholder('Email')
      .ariaLabel('email')
      .targetEvent(ev)
      .ok('Restore my password')
      .cancel('Cancel');

			authSvc.restorePassword({email: 'andy.krivovjas@gmail.com'});

    $mdDialog.show(confirm).then(function(result) {
      $scope.status = 'You decided to name your dog ' + result + '.';
    }, function() {
      $scope.status = 'You didn\'t name your dog.';
    });
	}

	$('.form').find('input, textarea').on('keyup blur focus', function (e) {

		var $this = $(this),
	      label = $this.prev('label');

		  if (e.type === 'keyup') {
				if ($this.val() === '') {
	          label.removeClass('active highlight');
	        } else {
	          label.addClass('active highlight');
	        }
	    } else if (e.type === 'blur') {
	    	if( $this.val() === '' ) {
	    		label.removeClass('active highlight');
				} else {
			    label.removeClass('highlight');
				}
	    } else if (e.type === 'focus') {

	      if( $this.val() === '' ) {
	    		label.removeClass('highlight');
				}
	      else if( $this.val() !== '' ) {
			    label.addClass('highlight');
				}
	    }

	});

	$('.tab a').on('click', function (e) {

	  e.preventDefault();

	  $(this).parent().addClass('active');
	  $(this).parent().siblings().removeClass('active');

	  target = $(this).attr('href');

	  $('.tab-content > div').not(target).hide();

	  $(target).fadeIn(600);

	});

}]);
