(function() {
	'use strict';

	angular
		.module('firebase-starter.articles')
		.factory('articlesService', articlesService);

	articlesService.$inject = ['firebaseDb', '_', '$firebaseArray', '$firebaseObject', 'listsService', '$q'];

	/* @ngInject */
	function articlesService(firebaseDb, _, $firebaseArray, $firebaseObject, listsService, $q) {
		var collectionName = 'articles';
		var articles;

		var service = {
			selectAll: selectAll,
			selectOne: selectOne,
			loadCategories: loadCategories,
			saveItem: saveItem,
			addCommentAndRate: addCommentAndRate
		};
		return service;

		function addCommentAndRate(article, comment) {
			comment.timestamp = (new Date()).getTime();
			var comments = article.comments;
			comments.push(comment);

			if (comment.rate) {
				article.rating = calcRating(article, comment.rate);
			}

			return saveItem(article.$id, {
				comments: comments,
				rating: article.rating
			}).then(function() {
				return comment;
			});
		}

		function calcRating(article, newRate) {
			var rating = article.rating;
			if (!rating || rating.reviews === 0) {
				rating = {
					value: newRate,
					reviews: 1
				};
			} else {
				var rate = (rating.value * rating.reviews);
				rating = {
					value: (rate + newRate) / (rating.reviews + 1),
					reviews: rating.reviews + 1
				};
			}
			return rating;
		}

		function loadCategories() {
			return listsService.getCategories().$loaded().then(function(categories) {
				var res = [];
				res.push({ value: 'All', key: 'all' });
				_.each(_.sortBy(categories, 'value'), function(item) {
					res.push(item);
				});
				return res;
			});
		}

		function selectOne(id) {
			var one = firebaseDb.child(collectionName).child(id);
			return $firebaseObject(one).$loaded()
				.then(enrichArticle)
				.then(enrichCategory)
				.then(enrichTags);
		}

		function enrichArticle(item) {
			item.rating = item.rating || {
				value: 0,
				reviews: 0
			};
			item.comments = item.comments || [];
			return item;
		}

		function enrichCategory(item) {
			return getCategory(item.category).then(function(category) {
				return angular.extend({}, item, {
					category: category
				});
			});
		}

		function enrichTags(item) {
			return getTags(item.tags).then(function(tags) {
				return angular.extend({}, item, {
					tags: tags,
					tagsString: _.pluck(tags, 'value').join(', ')
				});
			});
		}

		function getCategory(key) {
			return listsService.getCategories().$loaded().then(function(categories) {
				return _.find(categories, 'key', key);
			});
		}

		function getTags(keys) {
			return listsService.getTags().$loaded().then(function(tags) {
				return _.filter(tags, function(tag) {
					return !!_.find(keys, function(key) {
						return key === tag.key;
					});
				});
			});
		}

		function selectAll(category) {
			var query = firebaseDb.child(collectionName);
			if (category && category !== 'all') {
				query = query.orderByChild('category').equalTo(category);
			}
			articles = $firebaseArray(query);
			return articles.$loaded()
				.then(function(articles) {
					return $q.all(_.map(articles, enrichCategory));
				})
				.then(function(articles) {
					return $q.all(_.map(articles, enrichTags));
				});
		}

		function saveItem(id, changeSet) {
			var one = firebaseDb.child(collectionName).child(id);
			return $firebaseObject(one).$loaded().then(function(item) {
				angular.extend(item, changeSet);
				return item.$save();
			});
		}
	}
})();
