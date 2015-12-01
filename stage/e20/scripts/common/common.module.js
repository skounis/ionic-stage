(function() {
	'use strict';

	angular
		.module('localbiz.common', ['ionic'])
		.value('geolib', window.geolib)
		.value('convert', window.convert);
})();