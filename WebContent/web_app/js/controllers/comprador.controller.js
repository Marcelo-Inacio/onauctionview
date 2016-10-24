onAuctionControllers.controller("CompradorController",  function($scope, loginService, compradorService, $interval) {
	
	//$scope.comprador;
	
	$scope.entrar = _entrar;
	$scope.sair = _logout;
	$scope.darLance = _darLance;
	$scope.estaLogado = _verificarLogado;
	
	$scope.ultimoLance = 1;
	$scope.showFrame = 3;

    this.nextElevation = function() {
    	// CHAMAR FUNÇÃO DE SERVIÇO DO SERVER PARA RECUPERAR ULTIMO LANCE
      if (++$scope.ultimoLance > 50) {
    	  $scope.ultimoLance = 1;
      }
    };

    $interval(this.nextElevation.bind(this), 5000);
	
	init();

    function init() {

        //$scope.comprador = loginService.validarUsuario('comprador');

    }
    
    function _darLance(lance) {
    	$scope.ultimoLance += lance;
    }
    
    function _ultimoLance() {
    	$scope.ultimoLance = compradorService.recuperarUltimoLance();
    }
    
    function _verificarLogado() {
    	return loginService.estaLogado();
    }
    
    function _entrar() {
    	document.location.href = '#/login';
    }
    
    function _logout() {
    	loginService.fazerLogout();
    	_verificarLogado();
    }
	
});