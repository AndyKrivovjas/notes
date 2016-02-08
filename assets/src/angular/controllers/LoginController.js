notes.controller('LoginController', ['$scope', '$rootScope', '$location', 'authSvc', 
	function($scope, $rootScope, $location, authSvc){

	$scope.errors = {
		signin: {},
		signup: {}
	}
	
	$scope.login = function($event, data) {
		$event.preventDefault();
		$scope.errors.signin = {};
		authSvc.getUserScope(data).then(function(response) {
			data.scope = response.scope;
			authSvc.getToken(data).then(function(response) {
				window.localStorage.access_token = response.access_token;
				window.localStorage.refresh_token = response.refresh_token;
				$location.path('/');
			}, function(error) {
				$scope.errors.signin.general[0] = error.error_description;
			});
		}, function(error) {
			$scope.errors.signin = error;
		});
	}

	$scope.register = function($event, data) {
		$event.preventDefault();
		$scope.errors.signup = {};
		authSvc.register(data).then(function(response) {
			$scope.login($event, data);
		}, function(error) {
			$scope.errors.signup = error;
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