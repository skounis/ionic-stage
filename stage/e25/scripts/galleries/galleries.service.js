(function() {
	'use strict';

	angular
		.module('mystyle.galleries')
		.factory('galleriesService', galleriesService);

	galleriesService.$inject = ['$http', '$q', 'localStorageService', '_'];

	/* @ngInject */
	function galleriesService($http, $q, localStorageService, _) {
		var key = 'gallery';

		var url = '//skounis-dev.s3.amazonaws.com/mystyle-ionic-e25/galleries-flat.json';
		var gallery;

		var service = {
			get: get,
			getCategories: getCategories,
			add: add
		};
		return service;

		// ******************************************************************

		function get() {
			var promise;
			if (!gallery) {
				promise = $http.get(url).then(function(response) {
					gallery = response.data.result;
					return gallery;
				});
			} else {
				promise = $q.when(gallery);
			}

			return promise.then(function(gallery) {
				var pictures = angular.copy(gallery);
				pictures = pictures.concat(getPicturesFromLocalStorage())

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

		function fixUrlForImage(imageName) {
			var name = imageName.substr(imageName.lastIndexOf('/') + 1);
			var trueOrigin = cordova.file.dataDirectory + name;
			return trueOrigin;
		}

		function add(url) {
			var pictures = getPicturesFromLocalStorage();
			pictures.push({
				path: url
			});
			setPicturesToLocalStorage(pictures);
		}

		function getCategories(pictures) {
			var categories = _.map(pictures, function (business) {
				return business.category;
			});
			categories = ['All'].concat(_.sortBy(_.unique(categories)));
			return categories;
		};

		function getPicturesFromLocalStorage() {
			return localStorageService.get(key) || [];
		}

		function setPicturesToLocalStorage(pictures) {
			return localStorageService.set(key, pictures);
		}
	}
})();
