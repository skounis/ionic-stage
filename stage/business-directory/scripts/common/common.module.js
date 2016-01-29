(function() {
	'use strict';

	angular
		.module('bizdir.common', ['ionic'])
		.value('geolib', window.geolib)
		.value('convert', window.convert);
})();