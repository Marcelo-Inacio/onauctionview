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
		
		var deferred = $q.defer();
		
        $http({
            method: 'POST',
            url: urlPath + '/login',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            params: {username: usuario.username, password: usuario.password}
        }).
            success(function (data, status, headers, config) {
            	if(status !== 200) {
            		alert('Verifique seu username/password!');
            		return;
            	}
            	var usuario = headers("User").split(" ");
            	StorageHelper.setItem('Authorization', headers("Authorization"));
            	StorageHelper.setItem('Usuario', usuario[0]);
            	StorageHelper.setItem('Perfil', usuario[1]);
            	usuarioLogado = true;
            	_redirecionar(usuario[1]);
                deferred.resolve(data);
            }).
            then(function successCallback(response) {

            }, function errorCallback(response) {
                deferred.reject("no authentication");
            });

        return deferred.promise;
    }
	
	function _Logout() {
		usuarioLogado = false;
		StorageHelper.removeItem('Authorization');
		StorageHelper.removeItem('Perfil');
		StorageHelper.removeItem('Usuario');
		_validar(null);
	}
	
	function _validar(type) {
        var perfil = StorageHelper.getItem('Perfil'); //identifica o usuario logado
        
        if(perfil == null || type !== perfil) {
        	document.location.href = '#/index';
        }
        //se não houver identificação ou se não for o tipo informado redireciona para login
    }
	
	function _redirecionar(perfil) {
		switch(perfil) {
	        case 'ADMIN':
	        	document.location.href = '#/admin';
	        	break;
	        case 'AUCTIONEER':
	        	document.location.href = '#/leiloeiro';
	        	break;
	        case 'BUYER':
	        default:
	        	document.location.href = '#/index';
	        	break;
		}
	}
    

}]);