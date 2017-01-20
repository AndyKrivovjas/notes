notes.service('authSvc', ['$http', '$q', 'request', function($http, $q, request) {

	var authSvc = this;

	this.settings = {
		app: {
			client_id: 'RBPoX0l6x2D2kuhe3UCrU1pNrCLaKdgME2ce2I3T',
			client_secret: 'oabAcDqFoGCRUyH4YEbLCAugrjznSFd4OUHKLAsNkGxPOAAU9tJjwp6SF1KGW9T7QKzFwjZyxUrjidbht9gXwgvr7kDLBXVjiAHGFvYQ0B3iCHTPYcp4qZ9NZNEtdJZW',
		}
	}

	this.ping = function(data) {
		return request.httpOauth({
			method: 'GET',
			url: '/api/ping/'
		});
	}

	this.getUserScope = function(data) {
		return request.http({
			method: 'GET',
			url: '/api/scope/',
			params: {username: data.username},
		});
	}

	this.getToken = function(data) {
		return request.http({
			method: 'POST',
			url: '/o/token/',
			params: angular.extend({}, data, angular.extend(authSvc.settings.app, {
				grant_type: 'password'
			})),
		}).then(function(response) {
			window.localStorage.access_token = response.access_token;
			window.localStorage.refresh_token = response.refresh_token;
		});
	}

	this.refreshToken = function() {
		return request.http({
			method: 'POST',
			url: '/o/token/',
			params: angular.extend({}, authSvc.settings.app, {
				grant_type: 'refresh_token',
				refresh_token: window.localStorage.refresh_token
			}),
		}).then(function(response) {
			window.localStorage.access_token = response.access_token;
			window.localStorage.refresh_token = response.refresh_token;
		});
	}

	this.register = function(data) {
		return request.http({
			method: 'POST',
			url: '/api/users/',
			data: data
		});;
	}

	this.restorePassword = function(data) {
		return request.http({
			method: 'POST',
			url: '/api/user/restore/',
			data: data
		});;
	}

	this.changeRestoredPassword = function(data) {
		return request.http({
			method: 'PUT',
			url: '/api/user/restore/',
			data: data
		});;
	}

	return authSvc;

}]);
