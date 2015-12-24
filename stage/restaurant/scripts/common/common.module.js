(function() {
	'use strict';

	angular
		.module('restaurant.common', ['ionic'])
		.value('geolib', window.geolib)
		.value('convert', window.convert);
})();