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
	
	var carregarLotes = _carregarlotes;
		
	$scope.admistrador;
	
	$scope.dataPesquisa = new Date();

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
        });
    }
    
	function _salvarLote(lote) {
		//lote.status = "criado";
		//console.log(lote);
		
		adminService.salvarNovoLote(lote).then(function (data) {
			console.log(data);
			$scope.lotes.push(data);
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
			}
        });
	}
	
	function _deslogar() {
		alertify.set('notifier','position', 'bottom-right');
		alertify.success('Current position : ' + alertify.get('notifier','position'));
	}
	
	function _buscarLotes(data) {
		adminService.pesquisarLotePorData(data).then(function (data) {
			console.log(data);
			$scope.lotes = data;
        });
	}
	
	function _irPagina(pagina) {
		StorageHelper.setItem('page',pagina);
		document.location.href = '#/'+pagina;
	}
	
	init();
	
});