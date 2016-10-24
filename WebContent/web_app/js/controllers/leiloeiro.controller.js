onAuctionControllers.controller("LeiloeiroController",  function($scope, leiloeiroService, loginService) {
	
	$scope.leiloeiro;
	
	$scope.lotes = [{id:0001, status:'fechado', produto:'bike', lanceInicial:100, intervalo:20},
	                {id:0002, status:'andamento', produto:'bike', lanceInicial:100, intervalo:20},
	                {id:0003, status:'criado', produto:'bike', lanceInicial:100, intervalo:20},
	                {id:0004, status:'criado', produto:'bike', lanceInicial:100, intervalo:20},
	                {id:0005, status:'criado', produto:'bike', lanceInicial:100, intervalo:20},
	                {id:0006, status:'criado', produto:'bike', lanceInicial:100, intervalo:20}]
	
	$scope.loteAndamento = _hasOpen;
	$scope.abrirLote = _abrirLote;
	$scope.fecharLote = _fecharLote;
	$scope.sair = _sair;
	
	var andamento = true;
	
	init();

    function init() {

        //$scope.leiloeiro = loginService.validarUsuario('leiloeiro');

    }
    
    function _hasOpen() {
    	return andamento;
    }
    
    function _abrirLote(lote) {
    	var index = $scope.lotes.indexOf(lote);
    	$scope.lotes[index].status = 'andamento';
    	andamento = true;
    }
    
    function _fecharLote(lote) {
    	var index = $scope.lotes.indexOf(lote);
    	$scope.lotes[index].status = 'fechado';
    	andamento = false;
    }
    
    function _sair() {
    	loginService.fazerLogout();
    }
	
});