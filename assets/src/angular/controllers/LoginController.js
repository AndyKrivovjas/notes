notes.controller('LoginController', ['$scope', '$rootScope', '$location', 'authSvc', '$mdDialog',
	function($scope, $rootScope, $location, authSvc, $mdDialog){

	$scope.errors = {
		signin: {
			general: []
		},
		signup: {},
		forgotten: {
			general: []
		}
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
      .placeholder('Email')
      .ariaLabel('email')
      .targetEvent(ev)
      .ok('Restore my password')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function(result) {
      authSvc.restorePassword({email: result});
    }, function() {

    });
	}

	$scope.changePassword = function($event, data) {
		$event.preventDefault();

		var validate = function(pwd1, pwd2) {
			var error = false;

			if(!pwd1.length) {
				$scope.errors.forgotten.password1 = "The password cannot be empty.";
				error = true;
			}
			if(!pwd2.length) {
				$scope.errors.forgotten.password2 = "The password cannot be empty.";
				error = true;
			}
			if(pwd1.length && pwd2.length && pwd1 != pwd2) {
				$scope.errors.forgotten.general.push("Passwords do not match.");
				error = true;
			}

			return !error;
		}

		if(validate(data.password1, data.password2)) {
			data.hash = window.location.hash;
			authSvc.changeRestoredPassword(data).then(function(response) {
				$scope.login($event, response);
			});
		}
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
