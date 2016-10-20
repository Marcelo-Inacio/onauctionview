
publication.factory('loginService',  ['$http', '$q', function ($http, $q) {

	var urlPath = "http://localhost:8080/onauction";

	return {
		fazerLogin: _Login,
		fazerLogout: _Logout
	};
	
	function _Login(usuario) {
		console.log('service: '+usuario);
		
		var deferred = $q.defer();
		var json = JSON.stringify(usuario); 
		
        $http({
            method: 'POST',
            url: urlPath + '/login',
            data: json
        }).
            success(function (data, status, headers, config) {

            	StorageHelper.setItem('token', headers("token"));
            	
                deferred.resolve(data);
            }).
            then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                deferred.reject("no authentication");
            });

        return deferred.promise;
    }
	
	function _Logout() {
		StorageHelper.removeItem('token');
	}
    

}]);