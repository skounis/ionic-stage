(function() {
	'use strict';

	angular
		.module('mystyle.galleries')
		.controller('GalleryPreviewController', GalleryPreviewController);

	GalleryPreviewController.$inject = [
		'$state', '$stateParams', '_', 'galleriesService', '$ionicActionSheet', 'cameraService', '$q'];

	/* @ngInject */
	function GalleryPreviewController(
			$state, $stateParams, _, galleriesService, $ionicActionSheet, cameraService, $q) {
		var galleryId = parseInt($stateParams.galleryId, 10);
		var pictures = [];

		var vm = angular.extend(this, {
			groupedPictures: [],
			navigateToFullGalleryView: navigateToFullGalleryView,
			add: add
		});

		(function activate() {
			loadGallery();
		})();

		// ********************************************************************

		function loadGallery() {
			galleriesService.get(galleryId)
				.then(function(gallery) {
					pictures = gallery.pictures;
					vm.groupedPictures = _.chunk(gallery.pictures, 3);
				});
		}

		function navigateToFullGalleryView(picture) {
			var pictureIndex = _.indexOf(pictures, picture);
			$state.go('app.gallery', {
				galleryId: galleryId,
				pictureIndex: pictureIndex
			});
		}

		function add() {
			getImageSource().then(getPhoto);

			function getPhoto(source) {
				cameraService.getPhoto({
					sourceType: source
				}).then(function (fileUri) {
					galleriesService.add(galleryId, fileUri);
					loadGallery();
				});
			}

			function getImageSource() {
				var deferred = $q.defer();

				$ionicActionSheet.show({
					buttons: [
						{ text: 'Camera' },
						{ text: 'Library' }
					],
					titleText: 'Choose image source',
					cancelText: 'Cancel',
					cancel: function () {
						deferred.reject();
					},
					buttonClicked: function (index) {
						if (index === 0) {
							deferred.resolve(Camera.PictureSourceType.CAMERA);
						} else {
							deferred.resolve(Camera.PictureSourceType.PHOTOLIBRARY);
						}
						return true;
					}
				});

				return deferred.promise;
			}
		}
	}
})();