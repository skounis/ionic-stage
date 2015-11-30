(function() {
	'use strict';

	angular
		.module('catalogue.common')
		.factory('dataService', dataService);

	dataService.$inject = ['ENV', '$injector'];

	/* @ngInject */
	function dataService(ENV, $injector) {
		switch(ENV.dataProvider) {
			case 'LOCAL':
				return $injector.get('localDataService');
			case 'REMOTE':
				return $injector.get('remoteDataService');
		}
		
		throw new Error('Data provider is not valid');
	}
})();
