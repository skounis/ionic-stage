(function () {
	'use strict';

	angular
		.module('catalogue.common')
		.factory('authService', authService);

	authService.$inject = ['$http', '$q', '_', 'ENV', 'localStorageService'];

	/* @ngInject */
	function authService($http, $q, _, ENV, localStorageService) {
		var authEndpoint = ENV.authEndpoint;

		var service = {
			login: login,
			logout: logout,
			getUser: getUser
		}
		return service;

		function getUser() {
			return localStorageService.get('user');
		}

		function logout() {
			localStorageService.set('user', undefined);
		}

		function login(email, cardNumber) {
			var url = buildUrl(email, cardNumber);
			var header = {
				'Authorization': 'Basic ' + getAuthHeader()
			};

			return $http.get(url, {
				headers: header
			}).then(function(response) {
				var member = response.data.FidelityMember;
				if (member) {
					localStorageService.set('user', {
						name: member.firstname + ' ' +member.name,
						points: member.cumulPoint
					});
					return true;
				}

				return $q.reject();
			});
		}

		function getAuthHeader() {
			var authHeader = ENV.apiKey + ';' + ENV.apiUser + ':' + ENV.apiPassword;
			return btoa(authHeader);
		}

		function buildUrl(email, cardNumber) {
			var mobile = email;
			var jsonHeader= '{action:"show"}';
			var jsonData = '{FidelityMember: { "cardnumber":"' + cardNumber + '", "or" :{ "mobile_contains":"' + mobile + '", "email":"' + email + '" }}}';

			var authUrl = authEndpoint + '?json_header=' + jsonHeader + '&json_data=' + jsonData;
			return authUrl;
		}
	}
})();
