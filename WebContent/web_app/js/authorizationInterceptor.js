publication.factory('authorizationInterceptor', ['$rootScope', '$q', '$location', '$window',
    function ($rootScope, $q, $location, $window) {
    return {
        'request': function (config) {
        	alert('interceptor');
            config.headers = config.headers || {};

            var authData = StorageHelper.getItem('Authorization');

            if (authData) {
            	
                config.headers.token = authData.token;
            }

            return config;
        },

        'responseError': function (rejection) {
            switch (rejection.status) {
            	case 403:
	            case 401: {
	                    $window.location.href = '/index';
	                    break;
	                }
	                
	                default: {
	                    break;
	                }
	            }

            return $q.reject(rejection);
        }
    };
}]);