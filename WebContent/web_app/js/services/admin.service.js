angular.module("onauction").factory("adminService",  adminService);

function adminService($http, $q) {
	
	return {
		pesquisarLotePorData : _pesquisar
	};
	
	function _pesquisar(data) {
		console.log(data);
/*		var deferred = $q.defer();
		var dateMilli = data.getTime();
		$http({
            method: 'GET',
            url: urlPath + '/batches/' + dateMilli
        }).
            success(function (data, status, headers, config) {
            	
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
*/
	}
	
}