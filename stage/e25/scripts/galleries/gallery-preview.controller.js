(function() {
	'use strict';

	angular
		.module('mystyle.galleries')
		.controller('GalleryPreviewController', GalleryPreviewController);

	GalleryPreviewController.$inject = [
		'$state', '_', 'galleriesService', '$ionicActionSheet', 'cameraService', '$q'];

	/* @ngInject */
	function GalleryPreviewController(
			$state, _, galleriesService, $ionicActionSheet, cameraService, $q) {
		var pictures = [];

		var vm = angular.extend(this, {
			groupedPictures: [],
			navigateToFullGalleryView: navigateToFullGalleryView,
			filterByCategory: filterByCategory,
			selectedCategory: 'All',
			add: add
		});

		(function activate() {
			loadGallery();
		})();

		// ********************************************************************

		function loadGallery(category) {
			var cat = category || 'All';

			galleriesService.get()
				.then(function(galleryPictures) {
					// pictures = galleryPictures;
					pictures = _.filter(galleryPictures, function(picture){
						return cat === 'All' || picture.category === cat;
					});
					vm.groupedPictures = _.chunk(pictures, 3);

					if (!vm.categories) {
						vm.categories = galleriesService.getCategories(pictures);
					}
				});
		}

		function filterByCategory(category) {
			vm.selectedCategory = category;
			loadGallery(category);
		}

		function navigateToFullGalleryView(picture) {
			var pictureIndex = _.indexOf(pictures, picture);
			$state.go('app.gallery', {
				pictureIndex: pictureIndex
			});
		}

		function add() {
			getImageSource().then(getPhoto);

			function getPhoto(source) {
				cameraService.getPhoto({
					sourceType: source
				}).then(function (fileUri) {
					galleriesService.add(fileUri);
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
