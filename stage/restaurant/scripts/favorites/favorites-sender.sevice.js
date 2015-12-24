(function() {
	'use strict';

	angular
		.module('restaurant.favorites')
		.factory('favoritesSenderService', favoritesSenderService);

	favoritesSenderService.$inject = ['$cordovaEmailComposer', '_'];

	/* @ngInject */
	function favoritesSenderService($cordovaEmailComposer, _) {
		var service = {
			sendFavorites: sendFavorites
		};
		return service;

		// ********************************************************

		function sendFavorites(emailAddress, items) {
			var body = 'Please send me more information about the following product:<br>';

			_.each(items, function(item, index) {
				body += (index + 1) + '. ' + item.name + '<br>' + item.description;
				body += '<br><br>';
			});

			$cordovaEmailComposer.isAvailable().then(function() {
				var email = {
					to: emailAddress,
					subject: 'Favorites list',
					body: body,
					isHtml: true
				};

				$cordovaEmailComposer.open(email);
			});
		}
	}
})();
