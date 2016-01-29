(function() {
	'use strict';

	angular
		.module('bizdir.common')
		.factory('openHoursService', openHoursService);

	openHoursService.$inject = ['_'];

	/* @ngInject */
	function openHoursService(_) {
		var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

		var service = {
			isBusinessOpen: isBusinessOpen,
			getOpenHours: getOpenHours
		};
		return service;

		// *****************************************************************

		function getOpenHours(openHours) {
			var days = [];
			var groupedDays = _.groupBy(openHours.days, 'day');
			_.each(groupedDays, function(groupedDay) {
				var day = {
					times: []
				};

				_.each(groupedDay, function(d) {
					day.name = dayNames[d.day];
					var openAt = new Date(d.openAt);
					var closeAt = new Date(d.closeAt);

					var from = openAt.format('hh:MMtt');
					var to = closeAt.format('hh:MMtt');
					day.times.push(from + ' - ' + to);
				});

				days.push(day);
			});
			// debugger;
			return days;
		}

		function isBusinessOpen(openHours) {
			var now = (new Date());
			var day = now.getDay();
			var hours = now.getHours();
			var minutes = now.getMinutes();

			var fixedTime = (new Date(2015, 0, 1, hours, minutes, 0)).getTime();

			var open;
			for (var i = 0; i < openHours.days.length; i++) {
				open = openHours.days[i];
				if (open.day !== day) {
					continue;
				}

				if (fixedTime >= open.openAt && fixedTime <= open.closeAt) {
					return true;
				}
			}

			return false;
		}
	}
})();
