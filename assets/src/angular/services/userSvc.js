notes.service('userSvc', ['$http', '$q', 'request', function($http, $q, request) {

	this.getUser = function(data) {
		return request.httpOauth({
			method: 'GET',
			url: '/api/user/'
		});
	}
	
}]);