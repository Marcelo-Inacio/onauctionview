angular.module("onauction").factory("adminService",  adminService);

function adminService($http, $q) {
	
	var urlPath = "http://localhost:8080/onauction";
	
	return {
		pesquisarLotePorData : _pesquisar,
		carregarTodosLotes : _carregarLotes,
		salvarNovoLote : _salvar,
		excluirLote : _excluir
	};
	
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
	
	function _salvar(lote) {
		
		var deferred = $q.defer();
		var json = JSON.stringify(lote); 
		console.log(json);
		
        $http({
            method: 'POST',
            url: urlPath + '/batch',
            data: json
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
	
	function _excluir(id) {
		console.log(id);
		var deferred = $q.defer();
		
		$http({
            method: 'DELETE',
            url: urlPath + '/batch/' + id,
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
	
	function _pesquisar(data) {
		console.log(data);
		var deferred = $q.defer();
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

	}
	
}