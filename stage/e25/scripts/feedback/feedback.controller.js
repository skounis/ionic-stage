(function () {
	'use strict';

	angular
		.module('mystyle.feedback')
		.controller('FeedbackController', FeedbackController);

	FeedbackController.$inject = [
		'feedbackService', '$cordovaEmailComposer', 'cameraService', '$ionicActionSheet', '$q', 'positionService'];

	/* @ngInject */
	function FeedbackController(
		feedbackService, $cordovaEmailComposer, cameraService, $ionicActionSheet, $q, positionService) {
		var currentPosition = [];

		var vm = angular.extend(this, {
			addImage: addImage,
			removeImage: removeImage,
			removeVideo: removeVideo,
			addVideo: addVideo,
			sendEmail: sendEmail,
			image: null,
			video: null,
			comment: null
		});

		(function activate() {
			positionService.getCurrentPosition()
				.then(function(position) {
					currentPosition = position;
				}, function(er) {
					console.log(JSON.stringify(er));
				});
		})();

		// *******************************************************************

		function removeImage() {
			vm.image = null;
		}

		function removeVideo() {
			vm.video = null;
		}

		function addImage() {
			getImageSource()
				.then(getPhoto);

			function getPhoto(source) {
				cameraService.getPhoto({
					sourceType: source,
				}).then(function (fileUri) {
					vm.image = fileUri;
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

		function addVideo() {
			cameraService.getVideo()
				.then(function (fileUri) {
					var video = document.getElementById('video');
					var source = document.getElementById('source');
					source.setAttribute("src", fileUri);
					video.load();

					vm.video = fileUri;
				});
		}

		function sendEmail() {
			var attachments = [];
			if (vm.image) {
				attachments.push(vm.image);
			}

			if (vm.video) {
				attachments.push(vm.video);
			}

			feedbackService.sendEmail(vm.comment, attachments, currentPosition)
				.then(clearData);
		}

		function clearData() {
			vm.image = null;
			vm.video = null;
			vm.comment = null;
		}
	}
})();