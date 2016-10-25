onAuctionControllers.controller("CompradorController",  function($scope, loginService, compradorService, $interval) {
	
	//$scope.comprador;
	
	$scope.entrar = _entrar;
	$scope.sair = _logout;
	$scope.darLance = _darLance;
	$scope.estaLogado = _verificarLogado;
	
	$scope.loteEmAndamento = null;

	/**
	 * função que a cada 5 seg realiza uma chamada no servidor, verificando o ultimo
	 * lance ofertado no lote em que esta aberto.
	 */
    ultimoLanceOfertado = function() {
    	compradorService.recuperarUltimoLance().then(function (data, status) {
			if(data !== null) {
				if($scope.loteEmAndamento === null ) {
					$scope.loteEmAndamento = {};
				}
				$scope.loteEmAndamento.ultimoLance = data.value;
				$scope.loteEmAndamento.produtoLeiloado = data.product;
				$scope.loteEmAndamento.intervaloDeLance = data.valueInterval;
			} else if (status !== 200){
				$scope.loteEmAndamento = null;
			}
        });
    };

    $interval(ultimoLanceOfertado, 5000);
	
	init();

    function init() {
    	this.ultimoLanceOfertado();
        //$scope.comprador = loginService.validarUsuario('comprador');
    }
    
    function _darLance(lance) {
    	if(lance <= $scope.loteEmAndamento.ultimoLance || (lance % $scope.loteEmAndamento.intervaloDeLance  !== 0)) {
    		alertify.error('lance inválido');
    		return;
    	}
    	compradorService.darLance(lance, '0010').then(function (status) {
			if(status === 200) {
				$scope.loteEmAndamento.ultimoLance = lance;
			}
        });
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