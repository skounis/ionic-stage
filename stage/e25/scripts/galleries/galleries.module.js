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
					},
					resolve: {
						categories: function(galleriesService) {
							return galleriesService.getCategories();
						},
						chooseCategoryModal: function($ionicModal, $rootScope) {
							return $ionicModal.fromTemplateUrl('scripts/galleries/choose-category.html', {
								scope: $rootScope.$new()
							});
						}
					}
				})
				.state('app.gallery', {
					url: '/gallery/:pictureIndex?category',
					views: {
						'menuContent': {
							templateUrl: 'scripts/galleries/gallery.html',
							controller: 'GalleryController as vm'
						}
					}
				});
		});
})();