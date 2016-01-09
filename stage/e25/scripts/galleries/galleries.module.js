(function() {
	'use strict';

	angular
		.module('mystyle.galleries', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.galleries', {
					url: '/galleries',
					views: {
						'menuContent': {
							templateUrl: 'scripts/galleries/galleries.html',
							controller: 'GalleriesController as vm'
						}
					}
				})
				.state('app.gallery-preview', {
					url: '/gallery-preview/:galleryId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/galleries/gallery-preview.html',
							controller: 'GalleryPreviewController as vm'
						}
					}
				})
				.state('app.gallery', {
					url: '/gallery/:galleryId/:pictureIndex',
					views: {
						'menuContent': {
							templateUrl: 'scripts/galleries/gallery.html',
							controller: 'GalleryController as vm'
						}
					}
				});
		});
})();