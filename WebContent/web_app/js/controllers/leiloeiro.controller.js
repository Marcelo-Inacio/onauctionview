onAuctionControllers.controller("LeiloeiroController",  function($scope, leiloeiroService, loginService, compradorService, $interval) {
		
	$scope.lotes = []
	
	$scope.abrirLote = _abrirLote;
	$scope.fecharLote = _fecharLote;
	$scope.sair = _sair;
	
	$scope.leilaoEmAndamento = null;
	
	var pegarLotes;
	
	/**
	 * A cada 5 segundos atualiza valores dos lotes, esperando alguma mudança feita
	 * pelo administrador no storage.
	 */
	atualizarLotes = function() {
		if(StorageHelper.getItem('page') !== 'leiloeiro') {
    		stop(); //para o $interval para que nao recupere o ultimo lance do lote
    		return;
    	}
		_carregarLotes();
    };
    
    function start() {
    	pegarLotes = $interval(atualizarLotes, 10000);    	
    }
    
    function stop() {
    	$interval.cancel(pegarLotes);
    	pegarLotes = undefined;
    }
	
	init();

    function init() {
    	loginService.validarUsuario('AUCTIONEER');
    	StorageHelper.setItem('page', 'leiloeiro');
    	_carregarLotes();
    	_verificarLeilaoEmAndamento();
    	start();
    }
     
    function _abrirLote(lote) {
    	var index = $scope.lotes.indexOf(lote);
    	leiloeiroService.abrirLote(lote.code).then(function (status) {
			console.log(status);
			if(status === 200) {
				$scope.leilaoEmAndamento = true;
				$scope.lotes[index].status = 'OPEN';
				StorageHelper.setItem('lotes', $scope.lotes); //atualiza valores do storage
			}
        });
    }
    
    function _fecharLote(lote) {
    	var index = $scope.lotes.indexOf(lote);
    	leiloeiroService.fecharLote(lote.code).then(function (status) {
			if(status === 200) {
				$scope.lotes[index].status = 'CLOSED';
				$scope.leilaoEmAndamento = false;
		    	StorageHelper.setItem('lotes', $scope.lotes); //atualiza valores do storage
			}
        });
    }
    
    function _sair() {
    	loginService.fazerLogout();
    	stop();
    }
    
    function _carregarLotes() {
    	leiloeiroService.carregarLotes().then(function (data) {
			console.log(data);
			$scope.lotes = data;
			StorageHelper.setItem('lotes', $scope.lotes); //atualiza valores do storage
        });
    }
    
    function _verificarLeilaoEmAndamento() {
    	compradorService.recuperarUltimoLance().then(function (response) {
    		if(response.status !== 200) {
    			$scope.leilaoEmAndamento = false;
    		} else {
    			$scope.leilaoEmAndamento = true;
    		}
        });
    }
	
});