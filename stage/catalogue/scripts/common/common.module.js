(function() {
	'use strict';

	angular
		.module('catalogue.common', ['ionic'])
		.value('geolib', window.geolib)
		.value('convert', window.convert);
})();