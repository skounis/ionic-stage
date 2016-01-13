(function() {
	'use strict';

	angular
		.module('catalogue.common', ['ionic', 'LocalStorageModule'])
		.value('geolib', window.geolib)
		.value('convert', window.convert);
})();