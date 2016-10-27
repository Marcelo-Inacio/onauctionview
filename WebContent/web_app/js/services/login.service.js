publication.factory('loginService',  ['$http', '$q', function ($http, $q) {

	var urlPath = getDefaultUrlPath();
	var usuarioLogado = false;
	
	return {
		fazerLogin: _Login,
		fazerLogout: _Logout,
		validarUsuario: _validar,
		identificar: _identificar,
		estaLogado: _estaLogado
	};
	
	function _estaLogado() {
		return usuarioLogado;
	}
	
	function _Login(usuario) {
		console.log('service: '+usuario);
		//usuarioLogado = true;
		//document.location.href = '#/index';
		
		var deferred = $q.defer();
		
        $http({
            method: 'POST',
            url: urlPath + '/login',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            params: {username: usuario.username, password: usuario.password}
        }).
            success(function (data, status, headers, config) {
            	StorageHelper.setItem('Authorization', headers("Authorization"));
            	usuarioLogado = true;
                deferred.resolve(data);
            }).
            then(function successCallback(response) {

            }, function errorCallback(response) {
                deferred.reject("no authentication");
            });

        return deferred.promise;
    }
	
	function _Logout() {
		console.log('saindo..');
		usuarioLogado = false;
		StorageHelper.removeItem('Authentication');
	}
	
	function _validar(type) {
        var usuario = StorageHelper.getItem('perfil'); //identifica o usuario logado
        alert(type);
        //se não houver identificação ou se não for o typo informado redireciona para login
        switch(type) {
	        case 'ADMIN':
	        	document.location.href = '#/admin';
	        	break;
	        case 'AUCTIONNER':
	        	document.location.href = '#/leiloeiro';
	        	break;
	        case 'BUYER':
	        default:
	        	document.location.href = '#/index';
	        break;
        }
        
        //return usuario; //se der tudo certo irá retornar os dados de quem está logado chamando a função especifica
    }
	
	function _identificar(token) {
		alert(token + "   _dentificar");
		var deferred = $q.defer();
		
        $http({
            method: 'GET',
            headers: {'Authorization': token},
            url: urlPath + '/user/identify',
        }).
            success(function (data, status, headers, config) {
            	var perfil = headers("profile");
            	StorageHelper.setItem('perfil', perfil);
            	usuarioLogado = true;
            	_validar(perfil);
                //deferred.resolve(data);
            }).
            then(function successCallback(response) {
            	
            }, function errorCallback(response) {
                deferred.reject("no authentication");
            });

        return deferred.promise;
    }
    

}]);