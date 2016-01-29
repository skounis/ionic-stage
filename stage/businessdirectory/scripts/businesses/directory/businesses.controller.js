(function () {
	'use strict';

	angular
		.module('bizdir.businesses')
		.controller('BusinessesController', BusinessesController);

	BusinessesController.$inject = ['$state', 'businessesService', 'distanceService', 'filterModal', '_'];

	/* @ngInject */
	function BusinessesController($state, businessesService, distanceService, filterModal , _) {

		var vm = angular.extend(this, {
			categories: null,
			selectedCategory: 'All',
			sortBy: 'name',
			businesses: [],
			navigate: navigate,
			filterByCategory: filterByCategory,
			showFilter: showFilter
		});

		(function activate() {
			getBusinesses();
		})();

		// ********************************************************************

		function applyFilters() {
			filterModal.hide();

			var scope = filterModal.scope;
			vm.selectedCategory = scope.vm.selectedCategory;
			vm.sortBy = scope.vm.sortBy;
			getBusinesses();
		}

		function showFilter() {
			var scope = filterModal.scope;
			scope.vm = {
				categories: vm.categories,
				selectedCategory: vm.selectedCategory,
				sortBy: vm.sortBy,
				applyFilters: applyFilters
			};

			filterModal.show();
		}

		function filterByCategory(category) {
			vm.selectedCategory = category;
			getBusinesses();
		}

		function getBusinesses() {
			businessesService.getBusinessesByCategory(vm.selectedCategory)
				.then(function (businesses) {
					if (!vm.categories) {
						vm.categories = businessesService.getCategories(businesses);
					}
					vm.businesses = businesses;
					return businesses
				})
					.then(getDistances);
		}

		function navigate(businessId) {
			$state.go('app.business-details', {businessId: businessId});
		}

		function getDistances(businesses) {
			var origins = _.map(businesses, function(business) {
				return business.officeLocation;
			})
			distanceService.getDistancesToOrigins(origins).then(function(distances) {
				for (var i = 0;i < businesses.length;i++) {
					businesses[i].distance = distances[i];
				}
			});
		}
	}
})();
