publication.factory('authorizationInterceptor', ['$rootScope', '$q', '$location', '$window',
    function ($rootScope, $q, $location, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};

            var authData = StorageHelper.getItem('token');

            if (authData) {

                config.headers.token = authData.token;

            }

            return config;
        },

        responseError: function (rejection) {
            switch (rejection.status) {
                case 401: {
                    console.log($location);
                    $window.location.href = '/Login.html';
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