(function() {
	'use strict';

	angular
		.module('mystyle.galleries')
		.controller('GalleryPreviewController', GalleryPreviewController);

	GalleryPreviewController.$inject = [
		'$state', '_', 'galleriesService', '$ionicActionSheet', 'cameraService', '$q', 'categories', 'chooseCategoryModal'];

	/* @ngInject */
	function GalleryPreviewController(
			$state, _, galleriesService, $ionicActionSheet, cameraService, $q, categories, chooseCategoryModal) {
		chooseCategoryModal.scope.categories = categories;
		var pictures = [];

		var vm = angular.extend(this, {
			categories: categories,
			groupedPictures: [],
			navigateToFullGalleryView: navigateToFullGalleryView,
			filterByCategory: filterByCategory,
			selectedCategory: 'All',
			favorite: favorite,
			add: add
		});

		(function activate() {
			loadGallery();
		})();

		// ********************************************************************

		function loadGallery(category) {
			category = category || vm.selectedCategory;
			galleriesService.get(category)
				.then(function(galleryPictures) {
					pictures = galleryPictures;
					vm.groupedPictures = _.chunk(pictures, 3);
				});
		}

		function filterByCategory(category) {
			vm.selectedCategory = category;
			loadGallery(category);
		}

		function navigateToFullGalleryView(picture) {
			var pictureIndex = _.indexOf(pictures, picture);
			$state.go('app.gallery', {
				pictureIndex: pictureIndex,
				category: vm.selectedCategory
			});
		}

		function chooseCategory(source) {
			var defer = $q.defer();

			chooseCategoryModal.show();
			chooseCategoryModal.scope.chooseCategory = function(category) {
				chooseCategoryModal.hide();
				defer.resolve({
					fileUri: source,
					category: category
				});
			};
			return defer.promise;
		}

		function favorite(picture){
			picture.favorite = !picture.favorite;
		}

		function add() {
			getImageSource()
				.then(getPhoto);

			function getPhoto(source) {
				cameraService.getPhoto({
					sourceType: source
				})
				.then(chooseCategory)
				.then(function(picture) {
					galleriesService.add(picture.fileUri, picture.category);
					loadGallery();
				});
			}

			function getImageSource() {
				var deferred = $q.defer();

				$ionicActionSheet.show({
					buttons: [
						{ text: 'Camera' },
						{ text: 'Library' },
						{ text: 'wearLo Discover' }
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
