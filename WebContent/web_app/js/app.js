window.publication =  angular.module('onauction', ['ngMaterial', 'ngMessages', 'ngAnimate', 'ui.bootstrap', 'ngRoute', 'onAuctionControllers']);

publication.config(function($routeProvider){
	
	var path = 'web_app/html/view/';
	$routeProvider
	
	.when('/login', {
		templateUrl: path + 'login.view.html',
		controller: 'LoginController'
	})

	.when('/index', {
		templateUrl: path + 'comprador.view.html',
		controller: 'CompradorController'
	})
	
	.when('/admin', {
		templateUrl: path + 'admin.view.html',
		controller: 'AdminController'
	})
	
	.when('/historico', {
		templateUrl: path + 'admin.lotespordata.view.html',
		controller: 'AdminController'
	})
	
	.when('/leiloeiro', {
		templateUrl: path + 'leiloeiro.view.html',
		controller: 'LeiloeiroController'
	})
	
	.otherwise({
		redirectTo: '/index'
	});
	
	
});

publication.config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  });

window.onAuctionControllers = angular.module('onAuctionControllers', []);