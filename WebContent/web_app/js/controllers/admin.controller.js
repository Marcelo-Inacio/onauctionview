onAuctionControllers.controller("AdminController",  function($scope, adminService, loginService, $interval) {
	
	$scope.currentNavItem;
	
	$scope.lotes = []
	
	$scope.historico = []
	
	$scope.loteModal = {}
	
	$scope.salvarLote = _salvarLote;
	$scope.excluirLote = _excluirLote;
	$scope.sair = _deslogar;
	$scope.irPagina = _irPagina;
	$scope.buscarLotesPorData = _buscarLotesPorData;
	
	var carregarLotes = _carregarlotes;
		
	$scope.admistrador;
	
	$scope.dataPesquisa = new Date();
	
	/**
	 * A cada 5 segundos atualiza valores dos lotes, esperando alguma mudança feita
	 * pelo leiloeiro no storage.
	 */
	this.atualizarLotes = function() {
		$scope.lotes = atualizarValoresTela();
    };
    $interval(this.atualizarLotes.bind(this), 5000);

    function init() {
    	$scope.currentNavItem = StorageHelper.getItem('page');
    	if($scope.currentNavItem === 'admin') {
    		carregarLotes();    		
    	}
        //$scope.admistrador = loginService.validarUsuario('administrador');
    }
    
    function _carregarlotes() {
    	adminService.carregarTodosLotes().then(function (data) {
			console.log(data);
			$scope.lotes = data;
			StorageHelper.setItem('lotes', $scope.lotes); //atualiza valores do storage
        });
    }
    
	function _salvarLote(lote) {

		adminService.salvarNovoLote(lote).then(function (data) {
			console.log(data);
			$scope.lotes.push(data);
			StorageHelper.setItem('lotes', $scope.lotes); //atualiza valores do storage
        });
		
		$scope.loteModal = null;
	}
	
	function _excluirLote(lote) {
		var index = $scope.lotes.indexOf(lote);
		var id = $scope.lotes[index].code;
		
		adminService.excluirLote(id).then(function (status) {
			console.log(status);
			if(status === 200) {
				$scope.lotes.splice(index, 1);
				StorageHelper.setItem('lotes', $scope.lotes); //atualiza valores do storage
			}
        });
	}
	
	function _deslogar() {
		alertify.set('notifier','position', 'bottom-right');
		alertify.success('Current position : ' + alertify.get('notifier','position'));
	}
	
	function _buscarLotesPorData(data) {
		adminService.pesquisarLotePorData(data).then(function (data) {
			console.log(data);
			$scope.historico = data;
        });
	}
	
	function _irPagina(pagina) {
		StorageHelper.setItem('page', pagina);
		document.location.href = '#/' + pagina;
	}
	
	init();
	
});