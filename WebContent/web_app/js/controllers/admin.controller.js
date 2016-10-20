onAuctionControllers.controller("AdminController",  function($scope) {
	
	$scope.lotes = [
			//id: '',	produto: '', intervalo: null, lanceInicial: null, status: ''
	]
	
	$scope.loteModal = {}
	
	$scope.salvarLote = _salvarLote;
	$scope.excluirLote = _excluirLote;
	
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
	
});