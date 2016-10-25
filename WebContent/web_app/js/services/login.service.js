publication.factory('loginService',  ['$http', '$q', function ($http, $q) {

	var urlPath = getDefaultUrlPath();
	var usuarioLogado = false;
	
	return {
		fazerLogin: _Login,
		fazerLogout: _Logout,
		validarUsuario: _validar,
		estaLogado: _estaLogado
	};
	
	function _estaLogado() {
		return usuarioLogado;
	}
	
	function _Login(usuario) {
		console.log('service: '+usuario);
		usuarioLogado = true;
		document.location.href = '#/index';
		
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
		console.log('saindo..');
		usuarioLogado = false;
		//StorageHelper.removeItem('token');
	}
	
	function _validar(type) {
        var usuario = StorageHelper.getItem('user'); //identifica o usuario logado
      
        //se não houver identificação ou se não for o typo informado redireciona para login
        if (usuario == null || usuario.type.toLowerCase() != type) {
            document.location.href = '#/index';
        }
        
        return usuario; //se der tudo certo irá retornar os dados de quem está logado chamando a função especifica
        
    }
    

}]);