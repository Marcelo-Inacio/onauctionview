onAuctionControllers.controller("LoginController",  function($scope, loginService) {
	
	var urlPath = getDefaultUrlPath();
	
	$scope.usuario = [];
	$scope.confirmacao = {};
	$scope.estaLogado = false;
	$scope.exibirMensagemErro = false;
	
	$scope.fazerLogin = _fazerLogin;
	
	init();
	
	function init() {
		StorageHelper.setItem('page', 'login');
	}
	
		
	function _fazerLogin(usuario) {
		console.log(usuario);
		
		var userLogin = {
				username : usuario.username,
				password: usuario.password
		}
		if(!userLogin.username || !userLogin.password) {
			alert('por favor verifique seu username/password..');
			return;
		}
		
		loginService.fazerLogin(userLogin).then(function (data) {
			
        });
    
	}	
	
});