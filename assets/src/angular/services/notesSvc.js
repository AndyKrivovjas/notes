notes.service('notesSvc', ['$http', '$q', 'request', function($http, $q, request) {

	/* -------------- Tags ----------------*/

	this.getTags = function(data) {
		return request.httpOauth({
			method: 'GET',
			url: '/api/tags/'
		});
	}

	this.addTag = function(data) {
		return request.httpOauth({
			method: 'POST',
			url: '/api/tags/',
			data: data
		});
	}

	this.editTag = function(data) {
		return request.httpOauth({
			method: 'PUT',
			url: '/api/tag/' + data.id,
			data: data
		});
	}

	this.deleteTag = function(data) {
		return request.httpOauth({
			method: 'DELETE',
			url: '/api/tag/' + data.id
		});
	}


	/* ----------- Categories -------------*/

	this.getCategories = function(data) {
		return request.httpOauth({
			method: 'GET',
			url: '/api/categories/'
		});
	}

	this.addCategory = function(data) {
		return request.httpOauth({
			method: 'POST',
			url: '/api/categories/',
			data: data
		});
	}

	this.editCategory = function(data) {
		return request.httpOauth({
			method: 'PUT',
			url: '/api/category/' + data.id,
			data: data
		});
	}

	this.deleteCategory = function(data) {
		return request.httpOauth({
			method: 'DELETE',
			url: '/api/category/' + data.id
		});
	}


	/* -------------- Notes ---------------*/

	this.getNotes = function(data) {
		return request.httpOauth({
			method: 'GET',
			url: '/api/tasks/'
		});
	}
	
}]);