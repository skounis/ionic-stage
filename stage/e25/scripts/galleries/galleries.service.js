(function() {
	'use strict';

	angular
		.module('mystyle.galleries')
		.factory('galleriesService', galleriesService);

	galleriesService.$inject = ['$http', '$q', 'localStorageService', '_'];

	/* @ngInject */
	function galleriesService($http, $q, localStorageService, _) {
		var key = 'gallery';

		var url = 'https://skounis-dev.s3.amazonaws.com/mystyle-ionic-e25/galleries-flat.json';
		var gallery;
		var categories;

		var service = {
			get: get,
			getCategories: getCategories,
			add: add
		};
		return service;

		// ******************************************************************

		function get(category) {
			category = category || 'All';
			return getAll().then(function(pictures) {
				pictures = filterPictures(pictures, category);

				_.each(pictures, function(picture) {
					if (picture.path.indexOf('http') !== 0) {
						var fixedPath = fixUrlForImage(picture.path);
						picture.path = fixedPath;
						picture.thumbPath = fixedPath;
					}
				});

				return pictures;
			});
		}

		function getAll() {
			var promise;
			if (!gallery) {
				promise = $http.get(url).then(function(response) {
					gallery = response.data.result;
					return gallery;
				});
			} else {
				promise = $q.when(gallery);
			}

			return promise.then(function(pictures) {
				pictures = angular.copy(pictures);
				return pictures.concat(getPicturesFromLocalStorage())
			});
		}

		function filterPictures(pictures, category) {
			return _.filter(pictures, function(picture){
				return category === 'All' || picture.category === category;
			});
		}

		function fixUrlForImage(imageName) {
			var name = imageName.substr(imageName.lastIndexOf('/') + 1);
			var trueOrigin = cordova.file.dataDirectory + name;
			return trueOrigin;
		}

		function add(url, category) {
			var pictures = getPicturesFromLocalStorage();
			pictures.push({
				path: url,
				category: category
			});
			setPicturesToLocalStorage(pictures);
		}

		function getCategories() {
			if (categories) {
				return $q.when(categories);
			}

			return getAll().then(function(pictures) {
				categories = _.map(pictures, function (picture) {
					return picture.category;
				});
				categories = ['All'].concat(_.sortBy(_.unique(categories)));
				return categories;
			});
		};

		function getPicturesFromLocalStorage() {
			return localStorageService.get(key) || [];
		}

		function setPicturesToLocalStorage(pictures) {
			return localStorageService.set(key, pictures);
		}
	}
})();
