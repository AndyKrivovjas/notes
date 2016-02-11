var notes = angular.module('notes', ['ngRoute', 'ngMaterial', 'angularMoment']).config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
	$routeProvider.when('/404', {
		title: 'Page not found',
		templateUrl: './assets/src/views/404.html',
		controller: 'NotFoundController'
	})
	.when('/login', {
		title: 'Login Page',
		page: 'login',
		templateUrl: './assets/src/views/login.html',
		controller: 'LoginController'
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

}]).run(['$rootScope', 'amMoment', function($rootScope, amMoment) {

	amMoment.changeLocale('en');

	moment.tz.add([
		'America/Los_Angeles|PST PDT|80 70|0101|1Lzm0 1zb0 Op0',
		'America/New_York|EST EDT|50 40|0101|1Lz50 1zb0 Op0'
	]);

	$rootScope.page = {
		title: 'Notes',
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