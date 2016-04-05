(function() {
	'use strict';

	angular
		.module('firebase-starter.infrastructure')
		.factory('listsService', listsService);

	listsService.$inject = ['firebaseDb', '$firebaseArray'];

	/* @ngInject */
	function listsService(firebaseDb, $firebaseArray) {
		var categoriesCollectionName = 'categoriesList';
		var tagsCollectionName = 'listsTags';

		return {
			getCategories: getCategories,
			getTags: getTags
		};

		function getTags() {
			return $firebaseArray(firebaseDb.child(tagsCollectionName));
		}

		function getCategories() {
			return $firebaseArray(firebaseDb.child(categoriesCollectionName));
		}
	}
})();
