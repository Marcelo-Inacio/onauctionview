angular.module("onauction").factory("compradorService",  compradorService);

function compradorService($http, $q) {
	
	var urlPath = getDefaultUrlPath();//"http://localhost:8585/onauction";
	
	return {
		recuperarUltimoLance : _ultimoLance,
		darLance : _darLance
	};
	
	function _darLance(lance, codComprador) {
		var deferred = $q.defer();
		var token = getToken();
		var valor = {value: lance};
		var json = JSON.stringify(valor); 

		$http({
            method: 'POST',
            url: urlPath + '/batch/' + codComprador + '/toBid',
            headers: {'Authorization': token},
            data: json
        }).
            success(function (data, status, headers, config) {
            	
                deferred.resolve(status);
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
	
	function _ultimoLance() {
		
		var deferred = $q.defer();
		
		$http({
            method: 'GET',
            url: urlPath + '/batch/lastBid'
        }).
            success(function (data, status, headers, config) {
            	
                deferred.resolve(data, status);
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