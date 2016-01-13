(function() {
	'use strict';

	angular
		.module('mystyle.galleries')
		.controller('GalleryController', GalleryController);

	GalleryController.$inject = [
		'$stateParams', 'galleriesService', '$ionicSlideBoxDelegate'];

	/* @ngInject */
	function GalleryController(
			$stateParams, galleriesService, $ionicSlideBoxDelegate) {
		var pictureIndex = parseInt($stateParams.pictureIndex, 10) || 0;

		var vm = angular.extend(this, {
			pictures: [],
			pictureIndex: pictureIndex
		});

		(function activate() {
			loadGallery();
		})();
		// ********************************************************************

		function loadGallery() {
			galleriesService.get()
				.then(function(pictures) {
					vm.pictures = pictures;
					$ionicSlideBoxDelegate.update();
				});
		}
	}
})();