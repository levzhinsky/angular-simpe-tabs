;(function() {
  'use strict';

  describe("Factory: sTabs", function() {
    var sTabs;

    beforeEach(module('SimpleTabs'));

    beforeEach(inject(function($injector) {
      sTabs = $injector.get('sTabs');
    }));

    it("should have proper api", function () {
      expect(Object.keys(sTabs)).toEqual(['_tabs', 'toggle', 'hide', 'show', 'add']);
    });

    describe('#add', function () {
      it("should register new tab", function () {
        var element = {};
        sTabs.add('tabName', element);
        expect(sTabs._tabs).toEqual({tabName: [element]});
      });

      it("should register few tabs with the same name", function () {
        var element = {},
            otherElement = {};
        sTabs.add('tabName', element);
        sTabs.add('tabName', otherElement);
        expect(sTabs._tabs).toEqual({tabName: [element, otherElement]});
      });
    });

    describe('#hide', function () {
      itShouldBehaveLikeAction('hide');
    });

    describe('#show', function () {
      itShouldBehaveLikeAction('show');
    });

    describe('#toggle', function () {
      itShouldBehaveLikeAction('toggle');
    });

    function itShouldBehaveLikeAction (action) {
      var element,
          otherElement;

      it("should call '" + action + "' on proper tab", function () {
        element = jasmine.createSpyObj('element', [action]);
        otherElement = jasmine.createSpyObj('otherElement', [action]);
        sTabs.add('tabName', element);
        sTabs.add('anotherTabName', otherElement);
        sTabs[action]('tabName');

        expect(element[action]).toHaveBeenCalled();
        expect(otherElement[action]).not.toHaveBeenCalled();
      });

      it("should call '" + action + "' on all related tabs", function () {
        element = jasmine.createSpyObj('element', [action]);
        otherElement = jasmine.createSpyObj('otherElement', [action]);
        sTabs.add('tabName', element);
        sTabs.add('tabName', otherElement);
        sTabs[action]('tabName');

        expect(element[action]).toHaveBeenCalled();
        expect(otherElement[action]).toHaveBeenCalled();
      });

      it("should return 'true' if tab is present", function () {
        element = jasmine.createSpyObj('element', [action]);
        sTabs.add('tabName', element);
        sTabs[action]('tabName');

        expect(sTabs[action]('tabName')).toBeTruthy();
      });

      it("should return 'false' if tab is not present", function () {
        sTabs.hide('tabName');

        expect(sTabs[action]('tabName')).toBeFalsy();
      });
    }
  });
}());