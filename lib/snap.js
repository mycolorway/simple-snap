(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define('simple-snap', ["jquery","simple-module","simple-dragdrop"], function (a0,b1,c2) {
      return (root['Snap'] = factory(a0,b1,c2));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"),require("simple-module"),require("simple-dragdrop"));
  } else {
    root['Snap'] = factory(jQuery,SimpleModule,simple.dragdrop);
  }
}(this, function ($, SimpleModule, SimpleDragdrop) {

var Snap,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Snap = (function(superClass) {
  extend(Snap, superClass);

  function Snap() {
    return Snap.__super__.constructor.apply(this, arguments);
  }

  Snap.pluginName = 'Snap';

  Snap.prototype._init = function() {};

  Snap.editor = Snap._module;

  return Snap;

})(SimpleModule);

simple.dragdrop["class"].connect(Snap);

console.log(Snap);

return Snap;

}));
