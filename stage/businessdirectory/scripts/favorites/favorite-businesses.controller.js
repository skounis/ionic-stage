(function() {
	'use strict';

	angular
		.module('bizdir.favorite-businesses')
		.controller('FavoriteBusinessesController', FavoriteBusinessesController);

	FavoriteBusinessesController.$inject = ['$state', 'favoriteBusinessesService', '_'];

	/* @ngInject */
	function FavoriteBusinessesController($state, favoriteBusinessesService, _) {
		var vm = angular.extend(this, {
			businesses: [],
			navigate: navigate,
			deleteFromFavorites: deleteFromFavorites
		});

		(function activate() {
			getBusinesses();
		})();

		// ********************************************************************

		function deleteFromFavorites(business) {
			favoriteBusinessesService.removeFromFavorites(business.guid);
			var t = _.remove(vm.businesses, function(item) {
				return item.guid === business.guid;
			});
			
			console.log(t);
		}

		function getBusinesses() {
			favoriteBusinessesService.getFavoriteBusinesses()
				.then(function(businesses) {
					vm.businesses = businesses;
				});
		}

		function navigate(businessId) {
			$state.go('app.business-details', { businessId: businessId });
		}
	}
})();