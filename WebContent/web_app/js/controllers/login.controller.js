onAuctionControllers.controller("LoginController",  function($scope, loginService) {
	
	var urlPath = "http://localhost:8080/onauction/login";
	
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


        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status
            console.log(loginUser);
            alert("Falha ao Logar\n -Verifique seu login!");
            //document.location = "../#/question";
            //$scope.loginState = false;
        });
    
	}	
	
});