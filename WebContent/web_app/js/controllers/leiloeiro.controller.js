onAuctionControllers.controller("LeiloeiroController",  function($scope, leiloeiroService, loginService, $interval) {
	
	$scope.leiloeiro;
	
	$scope.lotes = []
	
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
		_carregarLotes();
    };
    $interval(this.atualizarLotes.bind(this), 5000);
	
	init();

    function init() {
    	loginService.validarUsuario('AUCTIONEER');
    	StorageHelper.setItem('page', 'leiloeiro');
    	_carregarLotes();

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