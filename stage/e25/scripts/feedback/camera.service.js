(function () {
	'use strict';

	angular
		.module('mystyle.infrastructure')
		.factory('cameraService', cameraService);

	cameraService.$inject = ['$cordovaCamera', '$window'];

	/* @ngInject */
	function cameraService($cordovaCamera, $window) {
		var service = {
			getPhoto: getPhoto,
			getVideo: getVideo
		};
		return service;

		// ************************************************
		
		function getPhoto(customOptions) {
			var options = {
				destinationType: $window.Camera.DestinationType.FILE_URI,
				sourceType: $window.Camera.PictureSourceType.CAMERA,
				allowEdit: false,
				encodingType: $window.Camera.EncodingType.PNG
			};
			
			angular.extend(options, customOptions);

			return $cordovaCamera.getPicture(options);
		}
		
		function getVideo(customOptions) {
			var options = {
				destinationType: $window.Camera.DestinationType.FILE_URI,
				sourceType: $window.Camera.PictureSourceType.PHOTOLIBRARY,
				allowEdit: false,
				mediaType: $window.Camera.MediaType.VIDEO
			};
			
			angular.extend(options, customOptions);

			return $cordovaCamera.getPicture(options);
		}
	}
})();