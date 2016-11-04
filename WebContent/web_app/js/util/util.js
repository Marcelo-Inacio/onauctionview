/**
 * funcionalidade de auxilio a acesso ao storage do navegador
 */
var StorageHelper = (function() {

	var SH = {};

	SH.setItem = function(chave, valor) {
		window.localStorage.setItem(chave, angular.toJson(valor));
	};

	SH.getItem = function(chave, valor) {
		return angular.fromJson(window.localStorage.getItem(chave));
	};

	SH.removeItem = function(chave) {
		window.localStorage.removeItem(chave);
	}

	return SH;

})();

function getToken() {
	return StorageHelper.getItem('Authorization');
}
/**
 * funcionalidade que retorna a URL padrao de recursos ao servidor
 */
function getDefaultUrlPath() {
	return "http://192.168.0.17:8080/onauction";
}

/**
*funcionalidade que atualiza os valores de visualização do leiloeiro e administrador
*/
function atualizarValoresTela() {
	return StorageHelper.getItem('lotes');
}