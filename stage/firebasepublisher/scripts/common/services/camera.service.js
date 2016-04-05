(function () {
	'use strict';

	angular
		.module('firebase-starter.common')
		.factory('cameraService', cameraService);

	cameraService.$inject = ['$cordovaCamera', '$window', '$q'];

	/* @ngInject */
	function cameraService($cordovaCamera, $window, $q) {
		var service = {
			getPhoto: getPhoto
		};
		return service;

		// ************************************************

		function getPhoto() {
			var options = {
				quality: 30,
				targetWidth: 600,
				targetHeight: 600,
				destinationType: $window.Camera.DestinationType.DATA_URL,
				sourceType: $window.Camera.PictureSourceType.PHOTOLIBRARY,
				allowEdit: false,
				encodingType: $window.Camera.EncodingType.PNG
			};
			return $cordovaCamera.getPicture(options);
		}
	}
})();