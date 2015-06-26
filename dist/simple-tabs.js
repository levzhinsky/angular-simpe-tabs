;(function () {
  'use strict';


  angular.module('SimpleTabs', [])
    .factory('sTabs', TabFactory)
    .directive('sToggleTab', ToggleTabClass)
    .directive('sTab', TabClass);

  function TabFactory () {
    var tabs = {};

    function _apply(name, action) {
      if (['show', 'hide', 'toggle'].indexOf(action) === -1) {
        console.warn('STabs: action [' + action + '] not implemented!');
      } else {
        if (tabs[name]) {
          tabs[name].map(function (el) {
            if (el[action]) { el[action](); }
          });
          return true;
        }
      }
      return false;
    }

    return {
      _tabs: tabs,

      toggle: function (name) {
        return _apply(name, 'toggle');
      },

      hide: function (name) {
        return _apply(name, 'hide');
      },

      show: function (name) {
        return _apply(name, 'show');
      },

      add: function (name, element) {
        if (!tabs[name]) {
          tabs[name] = [];
        }

        tabs[name].push(element);
      }
    };
  }

  function ToggleTabClass(sTabs) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.on('click', function () {
          sTabs.toggle(attrs.sToggleTab);
        });
      }
    };
  }

  function TabClass(sTabs) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        sTabs.add(attrs.sTab, element);
        if (!attrs.hasOwnProperty('sTabExpanded')) {
          sTabs.hide(attrs.sTab);
        }
      }
    };
  }
}());