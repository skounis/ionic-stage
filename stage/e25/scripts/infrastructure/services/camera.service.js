(function () {
	'use strict';

	angular
		.module('mystyle.infrastructure')
		.factory('cameraService', cameraService);

	cameraService.$inject = ['$cordovaCamera', '$window', '$q'];

	/* @ngInject */
	function cameraService($cordovaCamera, $window, $q) {
		var service = {
			getPhoto: getPhoto
		};
		return service;

		// ************************************************
		
		function getPhoto(customOptions) {
			var options = {
				correctOrientation: true,
				destinationType: $window.Camera.DestinationType.FILE_URI,
				sourceType: $window.Camera.PictureSourceType.CAMERA,
				allowEdit: false,
				encodingType: $window.Camera.EncodingType.PNG
			};
			
			angular.extend(options, customOptions);

			var deferred = $q.defer();
			$cordovaCamera.getPicture(options).then(function(imageData) {
				getUrl(imageData, deferred)
			})

			return deferred.promise;
		}

		function getUrl(imageData, deferred) {
			// 4
			onImageSuccess(imageData);

			function onImageSuccess(fileURI) {
				createFileEntry(fileURI);
			}

			function createFileEntry(fileURI) {
				window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
			}

			// 5
			function copyFile(fileEntry) {
				var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
				var newName = makeid() + name;

				window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
					fileEntry.copyTo(
						fileSystem2,
						newName,
						onCopySuccess,
						fail
					);
				},
				fail);
			}

			// 6
			function onCopySuccess(entry) {
				deferred.resolve(entry.nativeURL);
			}

			function fail(error) {
				console.log("fail: " + error.code);
				deferred.reject(error);
			}

			function makeid() {
				var text = "";
				var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

				for (var i=0; i < 5; i++) {
					text += possible.charAt(Math.floor(Math.random() * possible.length));
				}
				return text;
			}
		}
	}
})();