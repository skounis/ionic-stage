(function() {
	'use strict';

	angular
		.module('mystyle.galleries', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.gallery-preview', {
					url: '/gallery-preview',
					views: {
						'menuContent': {
							templateUrl: 'scripts/galleries/gallery-preview.html',
							controller: 'GalleryPreviewController as vm'
						}
					}
				})
				.state('app.gallery', {
					url: '/gallery/:pictureIndex',
					views: {
						'menuContent': {
							templateUrl: 'scripts/galleries/gallery.html',
							controller: 'GalleryController as vm'
						}
					}
				});
		});
})();