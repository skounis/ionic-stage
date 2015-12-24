(function() {
	'use strict';

	angular
		.module('bizdir.businesses')
		.controller('BusinessDetailsController', BusinessDetailsController);

	BusinessDetailsController.$inject = [
		'business', 'externalAppsService', 'openHoursService', 'distanceService', '$state', '$ionicHistory', 'favoriteBusinessesService', 'ionicToast'];

	/* @ngInject */
	function BusinessDetailsController(
		business, externalAppsService, openHoursService, distanceService, $state, $ionicHistory, favoriteBusinessesService, ionicToast) {
		var vm = angular.extend(this, {
			currentDateTime: (new Date()).format('dddd HH:MM'),
			business: {
				isBusinessOpen: openHoursService.isBusinessOpen(business.openhours),
				distance: null,
				pictures: business.pictures,
				name: business.name,
				isInFavorites: favoriteBusinessesService.isInFavorites(business.guid)
			},
			showNews: showNews,
			showServices: showServices,
			showCatalogues: showCatalogues,
			showProducts: showProducts,
			showFavorites: showFavorites,
			getDirections: getDirections,
			toggleFavorites: toggleFavorites,
			showContactUs: showContactUs
		});

		(function activate() {
			setDistanceToOrigin();
		})();

		// *************************************************************

		function toggleFavorites() {
			vm.business.isInFavorites = !vm.business.isInFavorites;
			if (vm.business.isInFavorites) {
				favoriteBusinessesService.addToFavorites(business.guid);
				ionicToast.show('\'' + vm.business.name + '\' has been added to your Favorites', 'bottom', false, 2000);
			} else {
				favoriteBusinessesService.removeFromFavorites(business.guid);
				ionicToast.show('\'' + vm.business.name + '\' has been removed from your Favorites', 'bottom', false, 2000);
			}
		}

		function showContactUs() {
			$state.go('app.contact-us', {
				businessId: business.guid
			});
		}

		function showFavorites() {
			$state.go('app.favorite-businesses', {
				random: (new Date()).getTime()
			});
		}

		function showProducts() {
			$state.go('app.products', {
				url: business.products
			});
		}
		
		function showNews() {
			$state.go('app.articles', {
				url: business.news
			});
		}
		
		function showServices() {
			$state.go('app.services', {
				url: business.services
			});
		}
		
		function showCatalogues() {
			$state.go('app.catalogs', {
				url: business.catalogs
			});
		}

		function setDistanceToOrigin() {
			distanceService.getDistanceToOrigin(business.officeLocation).then(function(distance) {
				vm.business.distance = distance;
			});
		}

		function getDirections() {
			externalAppsService.openMapsApp(business.officeLocation);
		}
	}
})();
