onAuctionControllers.controller("CompradorController",  function($scope, loginService, compradorService, $interval) {
	
	$scope.entrar = _entrar;
	$scope.sair = _logout;
	$scope.darLance = _darLance;
	$scope.estaLogado = _verificarLogado;
	
	$scope.loteEmAndamento = null;
	
	var pegarLance;

	/**
	 * função que a cada 5 seg realiza uma chamada no servidor, verificando o ultimo
	 * lance ofertado no lote em que esta aberto.
	 */
    ultimoLanceOfertado = function() {
    	if(StorageHelper.getItem('page') !== 'comprador') {
    		stop(); //para o $interval para que nao recupere o ultimo lance do lote
    	}
    	compradorService.recuperarUltimoLance().then(function (data, status) {
			if(data !== null) {
				if($scope.loteEmAndamento === null ) {
					$scope.loteEmAndamento = {};
				}
				$scope.loteEmAndamento.ultimoLance = data.value;
				$scope.loteEmAndamento.produtoLeiloado = data.product;
				$scope.loteEmAndamento.intervaloDeLance = data.valueInterval;
			}
        }, function(status) {
        	$scope.loteEmAndamento = null;
        });
    };

    function start() {
    	pegarLance = $interval(ultimoLanceOfertado, 5000);    	
    }
    
    function stop() {
    	$interval.cancel(pegarLance);
    	pegarLance = undefined;
    }
	
	init();

    function init() {
    	start();
    	StorageHelper.setItem('page', 'comprador');
    	this.ultimoLanceOfertado();
    }
    
    function _darLance(lance) {
    	if(lance <= $scope.loteEmAndamento.ultimoLance || (lance % $scope.loteEmAndamento.intervaloDeLance  !== 0)) {
    		alertify.error('lance inválido');
    		return;
    	}
    	var usuarioId = StorageHelper.getItem('Usuario');
    	compradorService.darLance(lance, usuarioId).then(function (status) {
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