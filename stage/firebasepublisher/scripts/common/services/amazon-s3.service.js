(function() {
	'use strict';

	angular
		.module('firebase-starter.common')
		.value('AWS', AWS)
		.factory('amazonS3Service', amazonS3Service);

	amazonS3Service.$inject = ['AWS', 'ENV', '$q'];

	/* @ngInject */
	function amazonS3Service(AWS, ENV, $q) {
		var bucket = initBucket();
		var service = {
			upload: upload,
			deleteImage: deleteImage
		};
		return service;

		// ************************************************

		function initBucket() {
			AWS.config.update({
				accessKeyId: ENV.s3.accessKeyId,
				secretAccessKey: ENV.s3.secretAccessKey
			});
			return new AWS.S3({ params: { Bucket: ENV.s3.bucket } });
		}

		function dataURItoBlob(dataURI) {
			var prefix = 'data:image/jpeg;base64,';
			if (dataURI.indexOf('data:image') < 0) {
				dataURI = prefix + dataURI;
			}
			var binary = atob(dataURI.split(',')[1]);
			var array = [];
			for (var i = 0; i < binary.length; i++) {
				array.push(binary.charCodeAt(i));
			}

			var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
			return new Blob([new Uint8Array(array)], {
				type: mimeString
			});
		}

		function guid() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000)
					.toString(16)
					.substring(1);
			}

			return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
				s4() + '-' + s4() + s4() + s4();
		}

		function deleteImage(imageUrl) {
			var params = {
				Key: getFilename(imageUrl)
			};

			var deferred = $q.defer();
			bucket
				.deleteObject(params, function(err) {
					if (err) {
						deferred.reject(err);
					}
					else {
						deferred.resolve();
					}
				});
			return deferred.promise;
		}

		function upload(imageURI) {
			var filename = guid() + '.jpg';
			var params = {
				Key: filename,
				ContentType: 'image/jpeg',
				Body: dataURItoBlob(imageURI),
				ACL: "public-read",
			};

			var deferred = $q.defer();
			bucket
				.putObject(params, function(err) {
					if (err) {
						deferred.reject(err);
					}
					else {
						deferred.resolve(getFullUrl(filename));
					}
				})
				.on('httpUploadProgress', function(progress) {
					console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
				});
			return deferred.promise;
		}

		function getFullUrl(filename) {
			return 'https://s3.amazonaws.com/' + ENV.s3.bucket + '/' + filename;
		}

		function getFilename(url) {
			return url.substring(url.lastIndexOf('/') + 1);
		}
	}
})();