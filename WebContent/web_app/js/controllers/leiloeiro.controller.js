onAuctionControllers.controller("LeiloeiroController",  function($scope, leiloeiroService, loginService, $interval) {
	
	$scope.leiloeiro;
	
	$scope.lotes = [/*{id:0001, status:'fechado', produto:'bike', lanceInicial:100, intervalo:20},
	                {id:0002, status:'andamento', produto:'bike', lanceInicial:100, intervalo:20},
	                {id:0003, status:'criado', produto:'bike', lanceInicial:100, intervalo:20},
	                {id:0004, status:'criado', produto:'bike', lanceInicial:100, intervalo:20},
	                {id:0005, status:'criado', produto:'bike', lanceInicial:100, intervalo:20},
	                {id:0006, status:'criado', produto:'bike', lanceInicial:100, intervalo:20}*/]
	
	$scope.loteAndamento = _hasOpen;
	$scope.abrirLote = _abrirLote;
	$scope.fecharLote = _fecharLote;
	$scope.sair = _sair;
	
	var andamento = false;
	
	/**
	 * A cada 5 segundos atualiza valores dos lotes, esperando alguma mudança feita
	 * pelo administrador no storage.
	 */
	this.atualizarLotes = function() {
		$scope.lotes = atualizarValoresTela();
    };
    $interval(this.atualizarLotes.bind(this), 5000);
	
	init();

    function init() {
    	_carregarLotes();
        //$scope.leiloeiro = loginService.validarUsuario('leiloeiro');

    }
    
    function _hasOpen() {
    	return andamento;
    }
    
    function _abrirLote(lote) {
    	var index = $scope.lotes.indexOf(lote);
    	leiloeiroService.abrirLote(lote.code).then(function (status) {
			console.log(status);
			if(status === 200) {
				andamento = true;
				$scope.lotes[index].status = 'OPEN';
				StorageHelper.setItem('lotes', $scope.lotes); //atualiza valores do storage
			}
        });
    }
    
    function _fecharLote(lote) {
    	var index = $scope.lotes.indexOf(lote);
    	leiloeiroService.fecharLote(lote.code).then(function (status) {
			console.log(status);
			if(status === 200) {
				$scope.lotes[index].status = 'CLOSED';
		    	andamento = false;
		    	StorageHelper.setItem('lotes', $scope.lotes); //atualiza valores do storage
			}
        });
    }
    
    function _sair() {
    	loginService.fazerLogout();
    }
    
    function _carregarLotes() {
    	leiloeiroService.carregarLotes().then(function (data) {
			console.log(data);
			$scope.lotes = data;
			StorageHelper.setItem('lotes', $scope.lotes); //atualiza valores do storage
        });
    }
	
});