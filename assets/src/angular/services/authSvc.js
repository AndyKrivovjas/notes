notes.service('authSvc', ['$http', '$q', 'request', function($http, $q, request) {

	this.getUserScope = function(data) {
		return request.http({
			method: 'GET',
			url: '/api/scope',
			params: {username: data.username},
		});
	}

	this.getToken = function(data) {
		return request.http({
			method: 'POST',
			url: '/o/token/',
			params: angular.extend(data, {
				client_id: 'RBPoX0l6x2D2kuhe3UCrU1pNrCLaKdgME2ce2I3T',
				client_secret: 'oabAcDqFoGCRUyH4YEbLCAugrjznSFd4OUHKLAsNkGxPOAAU9tJjwp6SF1KGW9T7QKzFwjZyxUrjidbht9gXwgvr7kDLBXVjiAHGFvYQ0B3iCHTPYcp4qZ9NZNEtdJZW',
				grant_type: 'password'
			}),
		});
	}

	this.register = function(data) {
		return request.http({
			method: 'POST',
			url: '/api/users/',
			data: data
		});;
	}
	
}]);