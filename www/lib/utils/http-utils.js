angular.module('http.utils', [])

.factory('$httpUtils', ['$http', function($http) {	
  
	var URL = "";

	function httpRequest(obj) {

		var method = obj.method || 'GET', params = obj.params || {};
		var urlRequest = URL + obj.path;
		
		return $http({
			method : method,
			url : urlRequest,
			params : params
		});
	}

	function post(path, params) {
		return httpRequest({
			method : 'POST',
			path : path,
			params : params
		});
	}

	function get(path, params) {
		return httpRequest({
			method : 'GET',
			path : path,
			params : params
		});
	}
	
	return {
		post : post,
		get : get,
	}

}]);
