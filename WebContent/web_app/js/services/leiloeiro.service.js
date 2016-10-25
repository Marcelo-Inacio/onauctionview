angular.module("onauction").factory("leiloeiroService",  leiloeiroService);

function leiloeiroService($http, $q) {
	
	var urlPath = getDefaultUrlPath();

	return {
		carregarLotes : _carregarLotes,
		abrirLote : _abrirLote,
		fecharLote : _fecharLote
	};
	
	function _fecharLote() {
		var deferred = $q.defer();
		
		$http({
            method: 'POST',
            url: urlPath + '/batch/close'
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
	
	function _abrirLote(id) {
		var deferred = $q.defer();
		
		$http({
            method: 'POST',
            url: urlPath + '/batch/' + id + '/open'
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
	
	function _carregarLotes() {
		var deferred = $q.defer();
		
		$http({
            method: 'GET',
            url: urlPath + '/batches'
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
	}

}