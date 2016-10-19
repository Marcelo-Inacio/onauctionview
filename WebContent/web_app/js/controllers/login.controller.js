onAuctionControllers.controller("LoginController",  function($scope) {
	
	
	var urlPath = "http://localhost:8080/onauction/login";
	
	
	$scope.usuario = {};
	$scope.confirmacao = {};
	$scope.isLogado = false;
	$scope.exibirMensagemErro = false;
	
	$scope.fazerLogin = _fazerLogin;
	
	init();
	
	function _fazerLogin() {
		
	}
	
	function init() {
		$scope.usuario = "do you like?";
	}
	
	
	
	
	
	
});