var notes = angular.module('notes', ['ngRoute', 'ngMaterial', 'angularMoment', 'ngProgress'])
.config(['$routeProvider', '$locationProvider', '$httpProvider', '$mdThemingProvider', function ($routeProvider, $locationProvider, $httpProvider, $mdThemingProvider) {
	$routeProvider.when('/404', {
		title: 'Page not found',
		templateUrl: './assets/src/views/404.html',
		controller: 'NotFoundController'
	})
	.when('/login', {
		title: 'Login',
		page: 'login',
		templateUrl: './assets/src/views/login.html',
		controller: 'LoginController'
	})
	.when('/user/restore', {
		title: 'Restore Password',
		page: 'login',
		templateUrl: './assets/src/views/restore-password.html',
		controller: 'LoginController'
	})
	.when('/profile/edit', {
		title: 'Profile Edit',
		page: 'profileEdit',
		templateUrl: './assets/src/views/templates/form/profile-edit-form.html',
		controller: 'ProfileEditController'
	})
	.when('/', {
		title: 'Notes',
		page: 'notes',
		templateUrl: './assets/src/views/notes_list.html',
		controller: 'NotesListController'
	})
	.otherwise({
		redirectTo: "/"
	});

	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});

	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/json';

	$mdThemingProvider.definePalette('danger', {
	    '50': 'ffebee',
	    '100': 'ffcdd2',
	    '200': 'ef9a9a',
	    '300': 'e57373',
	    '400': 'ef5350',
	    '500': 'f44336',
	    '600': 'e53935',
	    '700': 'd32f2f',
	    '800': 'c62828',
	    '900': 'b71c1c',
	    'A100': 'ff8a80',
	    'A200': 'ff5252',
	    'A400': 'ff1744',
	    'A700': 'd50000',
	    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
	                                        // on this palette should be dark or light
	    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
	     '200', '300', '400', 'A100'],
	    'contrastLightColors': undefined    // could also specify this if default was 'dark'
	  });

	$mdThemingProvider.theme('default')
    	.primaryPalette('blue-grey')
    	.warnPalette('danger')
    	.accentPalette('red');

	$mdThemingProvider.theme('teal-theme')
		    	.primaryPalette('teal');

}]).run(['$rootScope', 'amMoment', function($rootScope, amMoment) {

	amMoment.changeLocale('en');

	moment.tz.add([
		'America/Los_Angeles|PST PDT|80 70|0101|1Lzm0 1zb0 Op0',
		'America/New_York|EST EDT|50 40|0101|1Lz50 1zb0 Op0'
	]);

	$rootScope.page = {
		title: 'Noty',
		name: 'notes',
		setTitle: function(title) {
			this.title = title;
		}
	}

	$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
		$rootScope.page.setTitle(current.$$route.title || 'Notes');
		$rootScope.name = current.$$route.page || 'notes';
	});
}]).constant('angularMomentConfig', {
	// timezone: 'America/Los_Angeles'
});;
