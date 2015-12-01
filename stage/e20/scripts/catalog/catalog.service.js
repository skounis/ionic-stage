(function() {
	'use strict';

	angular
		.module('localbiz.catalog')
		.factory('catalogService', catalogService);

	catalogService.$inject = ['$http', '$q'];

	/* @ngInject */
	function catalogService($http, $q) {

		var catalogUrl = 'http://skounis-dev.s3.amazonaws.com/e20/catalog.json';
		var catalog;

		var service = {
			getCatalog: getCatalog
		}

		return service;

		function getCatalog() {
			return $http.get(catalogUrl).then(function(response) {
				catalog = response.data.result;
				return catalog;
			});
		}

		/*
		function getCatalog(){
			var c ={
				title: 'Lorem ipsum',
				body: "Qapla. Dah tlhingan hol mu ghom a dalegh.  Qawhaqvam chenmohlu di wiqipe diya ohvad ponglu.  Ach jinmolvamvad Saghbe law tlhingan hol, dis, oh mevmohlu.  Ach dis jar wa mahcha dich wikia jinmoldaq vihta.",
				pictures: [
					"http://skounis.s3.amazonaws.com/mobile-apps/local-business/catalog-1-1.jpg"
				],
				"pdf" : "http://skounis.s3.amazonaws.com/mobile-apps/local-business/pdf/catalog-1.pdf",
				"url" : "http://issuu.com/dibiaggiony/docs/katalog",
			};

			return $q.when(c);
		}
		*/
	}
})();
