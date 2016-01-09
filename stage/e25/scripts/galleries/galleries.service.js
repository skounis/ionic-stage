(function() {
	'use strict';

	angular
		.module('mystyle.galleries')
		.factory('galleriesService', galleriesService);

	galleriesService.$inject = ['$http', '$q', 'localStorageService', '_'];

	/* @ngInject */
	function galleriesService($http, $q, localStorageService, _) {
		var key = 'gallery';

		var url = 'http://skounis-dev.s3.amazonaws.com/mystyle-ionic-e25/galleries.json';
		var result = [];

		var service = {
			all: all,
			get: get,
			add: add
		};
		return service;

		// ******************************************************************

		function all() {
			var deferred = $q.defer();

			$http.get(url)
				.success(function(data, status, headers, config) {
					// this callback will be called asynchronously
					// when the response is available
					result = data.result;
					deferred.resolve(result);
				})
				.error(function(data, status, headers, config) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					console.log('ERROR (Galleries):' + status);
					deferred.reject();
				});

			return deferred.promise;
		}

		function get(galleryId) {
			var gallery;
			for (var i = 0; i < result.length; i++) {
				if (result[i].id === galleryId) {
					gallery = result[i];
					break;
				}
			}

			gallery = angular.copy(gallery);
			gallery.pictures = gallery.pictures.concat(getPicturesFromLocalStorage(galleryId))

			_.each(gallery.pictures, function(picture) {
				if (picture.path.indexOf('http') !== 0) {
					var fixedPath = fixUrlForImage(picture.path);
					picture.path = fixedPath;
					picture.thumbPath = fixedPath;
				}
			});

			return $q.when(gallery);
		}

		function fixUrlForImage(imageName) {
			var name = imageName.substr(imageName.lastIndexOf('/') + 1);
			var trueOrigin = cordova.file.dataDirectory + name;
			return trueOrigin;
		}

		function add(galleryId, url) {
			var pictures = getPicturesFromLocalStorage(galleryId);
			pictures.push({
				path: url
			});
			setPicturesToLocalStorage(galleryId, pictures);
		}

		function getPicturesFromLocalStorage(galleryId) {
			return localStorageService.get(getKey(galleryId)) || [];
		}

		function setPicturesToLocalStorage(galleryId, pictures) {
			return localStorageService.set(getKey(galleryId), pictures);
		}

		function getKey(galleryId) {
			return key + ':' + galleryId;
		}
	}
})();
