publication.factory('authorizationInterceptor', ['$rootScope', '$q', '$location', '$window',
    function ($rootScope, $q, $location, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};

            var authData = StorageHelper.getItem('Authorization');

            if (authData) {
            	console.log(authData);
                config.headers.token = authData.token;
            }

            return config;
        },

        responseError: function (rejection) {
            switch (rejection.status) {
            	case 403:
	            case 401: {
	                    console.log($location + 'INTERCEPTOR');
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