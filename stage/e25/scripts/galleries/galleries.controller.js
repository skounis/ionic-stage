(function() {
	'use strict';

	angular
		.module('mystyle.galleries')
		.controller('GalleriesController', GalleriesController);

	GalleriesController.$inject = ['$scope', '$state', 'galleriesService'];

	/* @ngInject */
	function GalleriesController($scope, $state, galleriesService) {
		var vm = angular.extend(this, {
			galleries: [],
			doRefresh: doRefresh
		});

		// ********************************************************************

		galleriesService.all()
			.then(function(galleries) {
				vm.galleries = galleries;
			});

		function doRefresh() {
			setTimeout($scope.$broadcast('scroll.refreshComplete'), 16000);
		}
	}
})();