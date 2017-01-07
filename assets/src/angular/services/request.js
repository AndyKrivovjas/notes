notes.service('request', ['$http', '$q', function($http, $q) {

	var request = this;

	this.http = function(params) {
		var deferred = $q.defer();
		$http(params).success(function(response){
			// With the data succesfully returned, we can resolve promise and we can access it in controller
			deferred.resolve(response);
		}).error(function(error, responseCode) {
			//let the function caller know the error
			deferred.reject({error: error, code: responseCode});
		});
		return deferred.promise;
	}

	this.httpOauth = function(params) {
		return request.http(angular.extend({}, params, {
			headers: {'Authorization': 'Bearer ' + window.localStorage.access_token}
		}));
	}

	return request;

}]);