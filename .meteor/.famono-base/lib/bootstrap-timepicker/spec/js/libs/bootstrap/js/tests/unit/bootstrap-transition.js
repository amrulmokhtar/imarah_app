Famono.scope('bootstrap-timepicker/spec/js/libs/bootstrap/js/tests/unit/bootstrap-transition', [], function(require, define, exports, module) {
define(function(require, exports, module) {
$(function () {

    module("bootstrap-transition")

      test("should be defined on jquery support object", function () {
        ok($.support.transition !== undefined, 'transition object is defined')
      })

      test("should provide an end object", function () {
        ok($.support.transition ? $.support.transition.end : true, 'end string is defined')
      })

})
});
});