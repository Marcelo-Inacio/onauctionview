onAuctionControllers.controller("AdminController",  function($scope) {
	
	$scope.lotes = [
			//id: '',	produto: '', intervalo: null, lanceInicial: null, status: ''
	]
	
	$scope.loteModal = {}
	
	$scope.salvarLote = _salvarLote;
	
	function _salvarLote(lote) {
		lote.status = "criado";
		console.log(lote);
		$scope.lotes.push(lote);
		$scope.loteModal = null;
	}
	
});