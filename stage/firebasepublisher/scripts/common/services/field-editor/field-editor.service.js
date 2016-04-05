(function() {
	'use strict';

	angular
		.module('firebase-starter.common')
		.factory('fieldEditor', fieldEditor);

	fieldEditor.$inject = ['$rootScope', '$ionicModal', '$q', '_'];

	/* @ngInject */
	function fieldEditor($rootScope, $ionicModal, $q, _) {
		var service = {
			showSelector: showSelector,
			showTextFieldEditor: showTextFieldEditor
		};
		return service;

		// ************************************************

		function createMultiSelectorVm(defer, modal, options) {
			var vm = {
				items: options.items,
				selectedItems: options.selectedItems,
				select: function(item) {
					if (vm.isItemSelected(item)) {
						vm.selectedItems = _.filter(vm.selectedItems, function(selectedItem) {
							return selectedItem.key !== item.key;
						});
					} else {
						vm.selectedItems.push(item);
					}
				},
				isItemSelected: function(item) {
					return _.some(vm.selectedItems, 'key', item.key);
				},
				save: function(data) {
					modal.hide();
					defer.resolve(data);
				},
				close: function() {
					modal.hide();
					defer.reject();
				}
			};
			return vm;
		}

		function createSelectorVm(defer, modal, options) {
			var vm = {
				items: options.items,
				selectedItem: options.selectedItem,
				select: function(data) {
					modal.hide();
					defer.resolve(data);
				},
				close: function() {
					modal.hide();
					defer.reject();
				}
			};
			return vm;
		}

		function createTextFieldEditorVm(defer, modal, options) {
			var vm = {
				title: options.title,
				value: options.value,
				save: function(value) {
					modal.hide();
					defer.resolve(value);
				},
				close: function() {
					modal.hide();
					defer.reject();
				}
			};
			return vm;
		}

		function showSelector(options) {
			var templateUrl
			if (options.multi) {
				templateUrl = 'scripts/common/services/field-editor/multi-selector.html';
				return show(options, templateUrl, createMultiSelectorVm);
			}
			templateUrl = 'scripts/common/services/field-editor/selector.html';
			return show(options, templateUrl, createSelectorVm);
		}

		function showTextFieldEditor(options) {
			var templateUrl = 'scripts/common/services/field-editor/text-field-editor.html';
			return show(options, templateUrl, createTextFieldEditorVm);
		}

		function show(options, templateUrl, vmFactory) {
			var scope = $rootScope.$new();
			var defer = $q.defer();
			$ionicModal.fromTemplateUrl(templateUrl, {
				scope: scope
			}).then(function(modal) {
				scope.modal = modal;
				scope.vm = vmFactory(defer, modal, options);
				modal.show();
			});
			return defer.promise;
		}
	}
})();