/**
 * 
 */
window.publication =  angular.module('onauction', ['ngMaterial', 'ngMessages', 'ngAnimate', 'ui.bootstrap', 'ngRoute', 'onAuctionControllers']);

publication.config(function($routeProvider){
	
	var path = 'web_app/html/view/';
	$routeProvider
	
	.when('/login', {
		templateUrl: path + 'login.view.html',
		controller: 'LoginController'
	})
	.when('/admin', {
		templateUrl: path + 'admin.view.html',
		controller: 'AdminController'
	})
	
	.otherwise({
		redirectTo: '/admin'
	});
	
	
});

var StorageHelper = (function(){

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

window.onAuctionControllers = angular.module('onAuctionControllers', []);