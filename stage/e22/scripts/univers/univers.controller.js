(function() {
	'use strict';

	angular
		.module('catalogue.univers')
		.controller('UniversController', UniversController);

	UniversController.$inject = ['$scope', '$state', 'universService'];

	/* @ngInject */
	function UniversController($scope, $state, universService) {
		var vm = angular.extend(this, {
			univers: [],
			navigate: navigate
		});

		(function activate() {
			loadUnivers();
		})();
		// ********************************************************************

		function loadUnivers() {
			universService.all().then(function(data) {
				console.log('Articles: ', data);
				vm.univers = data;
			});
		}

		function navigate(univerId) {
			$state.go('app.univer', { univerId: univerId });
		}
	}
})();
