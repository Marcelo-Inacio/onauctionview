onAuctionControllers.controller("LoginController",  function($scope, loginService) {
	
	var urlPath = getDefaultUrlPath();
	
	$scope.usuario = [];
	$scope.confirmacao = {};
	$scope.estaLogado = false;
	$scope.exibirMensagemErro = false;
	
	$scope.fazerLogin = _fazerLogin;
	
		
	function _fazerLogin(usuario) {
		console.log(usuario);
		
		var userLogin = {
				username : usuario.username,
				password: usuario.password
		}
		
		loginService.fazerLogin(userLogin).then(function (data) {
			var token = StorageHelper.getItem("Authorization");
			loginService.identificar(token).then(function (data){
				
			});

        });
    
	}	
	
});