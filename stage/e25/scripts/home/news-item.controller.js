(function() {
	'use strict';

	angular
		.module('mystyle.home')
		.controller('NewsItemController', NewsItemController);

	NewsItemController.$inject = ['news'];

	/* @ngInject */
	function NewsItemController(news) {
		angular.extend(this, {
			news: news
		});
	}
})();