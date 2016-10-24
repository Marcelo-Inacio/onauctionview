onAuctionControllers.controller("AdminController",  function($scope, adminService, loginService) {
	
	$scope.currentNavItem;
	
	$scope.lotes = [
			//id: '',	produto: '', intervalo: null, lanceInicial: null, status: ''
	]
	
	$scope.historico = []
	
	$scope.loteModal = {}
	
	$scope.salvarLote = _salvarLote;
	$scope.excluirLote = _excluirLote;
	$scope.sair = _deslogar;
	$scope.irPagina = _irPagina;
	$scope.buscarLotes = _buscarLotes;
	
	$scope.admistrador;
	
	$scope.dataPesquisa = new Date();
	
	init();

    function init() {
    	$scope.currentNavItem = StorageHelper.getItem('page');
        //$scope.admistrador = loginService.validarUsuario('administrador');
    }
    
	function _salvarLote(lote) {
		lote.status = "criado";
		console.log(lote);
		$scope.lotes.push(lote);
		$scope.loteModal = null;
	}
	
	function _excluirLote(lote) {
		var index = $scope.lotes.indexOf(lote);
		$scope.lotes.splice(index, 1);     
	}
	
	function _deslogar() {
		alertify.set('notifier','position', 'bottom-right');
		alertify.success('Current position : ' + alertify.get('notifier','position'));
	}
	
	function _buscarLotes(data) {
		adminService.pesquisarLotePorData(data);
	}
	
	function _irPagina(pagina) {
		StorageHelper.setItem('page',pagina);
		document.location.href = '#/'+pagina;
	}
	
});