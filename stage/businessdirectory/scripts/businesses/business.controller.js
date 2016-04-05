(function() {
	'use strict';

	angular
		.module('bizdir.businesses')
		.controller('BusinessDetailsController', BusinessDetailsController);

	BusinessDetailsController.$inject = [
		'business', 'externalAppsService', 'openHoursService', 'distanceService', '$state', 'favoriteBusinessesService', 'ionicToast'];

	/* @ngInject */
	function BusinessDetailsController(
		business, externalAppsService, openHoursService, distanceService, $state, favoriteBusinessesService, ionicToast) {
		var vm = angular.extend(this, {
			currentDateTime: (new Date()).format('dddd HH:MM'),
			business: {
				isBusinessOpen: openHoursService.isBusinessOpen(business.openhours),
				distance: null,
				pictures: business.pictures,
				name: business.name,
				category: business.category,
				isInFavorites: favoriteBusinessesService.isInFavorites(business.guid),
				rating: business.rating
			},
			showNews: showNews,
			showServices: showServices,
			showCatalogues: showCatalogues,
			showProducts: showProducts,
			showFavorites: showFavorites,
			showWordpress: showWordpress,
			showDrupal: showDrupal,
			getDirections: getDirections,
			toggleFavorites: toggleFavorites,
			showContactUs: showContactUs,
			showReviews: showReviews
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

		function showReviews() {
			$state.go('app.reviews', {
				businessId: business.guid
			});
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
				businessId: business.guid
			});
		}

		function showNews() {
			$state.go('app.articles', {
				businessId: business.guid
			});
		}

		function showServices() {
			$state.go('app.services', {
				businessId: business.guid
			});
		}

		function showCatalogues() {
			$state.go('app.catalogs', {
				businessId: business.guid
			});
		}

		function showWordpress() {
			$state.go('app.wordpress-articles');
		}

		function showDrupal() {
			$state.go('app.drupal-articles');
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
