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
		var galleryId = parseInt($stateParams.galleryId, 10);
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
			galleriesService.get(galleryId)
				.then(function(gallery) {
					vm.pictures = gallery.pictures;
					$ionicSlideBoxDelegate.update();
				});
		}
	}
})();