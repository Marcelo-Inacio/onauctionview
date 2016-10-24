angular.module("onauction").factory("compradorService",  compradorService);

function compradorService($http) {
	
	var urlPath = "http://localhost:8080/onauction";
	
	return {
		recuperarUltimoLance : _ultimoLance
	};
	
	function _ultimoLance() {
		
		var deferred = $q.defer();
		
		$http({
            method: 'GET',
            url: urlPath + '/lastBid'
        }).
            success(function (data, status, headers, config) {
            	
                deferred.resolve(data.value);
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
	
}