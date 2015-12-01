(function() {
	'use strict';

	angular
		.module('starter')
		.config(function($httpProvider) {
			$httpProvider.interceptors.push(function($rootScope) {
				return {
					request: function(config) {
						$rootScope.$broadcast('loading:show');
						return config;
					},
					response: function(response) {
						$rootScope.$broadcast('loading:hide');
						return response;
					}
				};
			});
		})
		.run(function($rootScope, $ionicLoading) {
			$rootScope.$on('loading:show', function() {
				$ionicLoading.show({});
			});

			$rootScope.$on('loading:hide', function() {
				$ionicLoading.hide();
			});
		});
})();