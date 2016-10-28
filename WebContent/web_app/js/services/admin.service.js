angular.module("onauction").factory("adminService",  adminService);

function adminService($http, $q) {
	
	var urlPath = getDefaultUrlPath();//"http://localhost:8585/onauction";
	
	return {
		pesquisarLotePorData : _pesquisar,
		carregarTodosLotes : _carregarLotes,
		salvarNovoLote : _salvar,
		excluirLote : _excluir
	};
	
	function _carregarLotes() {
		var deferred = $q.defer();
		var token = getToken();
		$http({
            method: 'GET',
            url: urlPath + '/batches',
            headers: {'Authorization': token}
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
		var token = getToken();
		console.log(json);
		
        $http({
            method: 'POST',
            url: urlPath + '/batch',
            headers: {'Authorization': token},
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
		var token = getToken();
		
		$http({
            method: 'DELETE',
            url: urlPath + '/batch/' + id,
            headers: {'Authorization': token}
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
		
		var deferred = $q.defer();
		var token = getToken();
		var dateMilli = {date: data.getTime()};
		var json = JSON.stringify(dateMilli);
		console.log(json);
		$http({
            method: 'POST',
            url: urlPath + '/batches/date',
            headers: {'Authorization': token},
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
	
}