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
}(this, function ($, SimpleModule, simpleDragdrop) {

var Snap,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Snap = (function(superClass) {
  extend(Snap, superClass);

  function Snap() {
    return Snap.__super__.constructor.apply(this, arguments);
  }

  Snap.pluginName = 'Snap';

  Snap.prototype.opts = {
    align: true,
    distance: 1,
    axis: null,
    alignOffset: 10,
    rage: 100
  };

  Snap.prototype._init = function() {
    this.dragdrop = this._module;
    this.dragdrop.opts.placeholder = null;
    this.dragdrop.opts.helper = null;
    this.horizental_line = $('<div class="horizontal_line"></div>').appendTo("body");
    this.vertical_line = $('<div class="vertical_line"></div>').appendTo("body");
    return this.dragdrop.on('drag', (function(_this) {
      return function(e, obj) {
        var $dragging, adjacent_objs, align_x, align_y, other_dragables, wrapper;
        clearTimeout(_this.align_event_x);
        _this.horizental_line.hide();
        _this.vertical_line.hide();
        wrapper = $(dragdrop.opts.el);
        $dragging = obj.helper;
        other_dragables = wrapper.find(_this.dragdrop.opts.draggable).not(obj.helper).not(obj.placeholder).not(obj.dragging);
        adjacent_objs = _this._adjacent($dragging, other_dragables);
        align_x = _this._align($dragging, adjacent_objs.x, _this._edgesX, _this._lineX);
        align_y = _this._align($dragging, adjacent_objs.y, _this._edgesY, _this._lineY);
        if (align_x) {
          $dragging.css('left', $dragging.offset().left + align_x.move);
          _this.horizental_line.css({
            'left': align_x.align_edge,
            'top': align_x.line.start,
            'height': align_x.line.length
          });
          _this.horizental_line.show();
        }
        if (align_y) {
          $dragging.css('top', $dragging.offset().top + align_y.move);
          _this.vertical_line.css({
            'top': align_y.align_edge,
            'left': align_y.line.start,
            'width': align_y.line.length
          });
          _this.vertical_line.show();
        }
        return _this.dragdrop.on('dragend', function() {
          _this.horizental_line.hide();
          return _this.vertical_line.hide();
        });
      };
    })(this));
  };

  Snap.prototype._align = function(target, references, edges, line) {
    var align_edge, align_info, align_obj, min_distance, move, target_edges;
    target_edges = edges.call(this, target);
    min_distance = this.opts.alignOffset / 2;
    align_edge = null;
    align_obj = null;
    move = null;
    $.each(references, (function(_this) {
      return function(index, ele) {
        var $ele, ele_edges;
        $ele = $(ele);
        ele_edges = edges.call(_this, $ele);
        return $.each(ele_edges, function(index, ele_edge) {
          return $.each(target_edges, function(index, target_edge) {
            var distance;
            distance = Math.abs(target_edge - ele_edge);
            if (distance < min_distance) {
              min_distance = distance;
              align_edge = ele_edge;
              move = ele_edge - target_edge;
              return align_obj = $ele;
            }
          });
        });
      };
    })(this));
    if (align_edge) {
      align_info = {
        align_edge: align_edge,
        move: move,
        line: line.call(this, target, align_obj)
      };
    }
    return align_info;
  };

  Snap.prototype._adjacent = function(target, references) {
    var adjacent, adjacent_x, adjacent_y;
    adjacent_x = [];
    adjacent_y = [];
    $.each(references, (function(_this) {
      return function(index, ele) {
        var $ele, distance;
        $ele = $(ele);
        distance = _this._distance(target, $ele);
        if (distance.x < _this.opts.alignOffset / 2 && distance.y < _this.opts.rage) {
          adjacent_x.push($ele);
        }
        if (distance.y < _this.opts.alignOffset / 2 && distance.x < _this.opts.rage) {
          return adjacent_y.push($ele);
        }
      };
    })(this));
    adjacent = {
      x: adjacent_x,
      y: adjacent_y
    };
    return adjacent;
  };

  Snap.prototype._distance = function(target, reference) {
    var distance, referenceX, referenceY, targetX, targetY;
    targetX = (target.offset().left * 2 + target.width()) / 2;
    targetY = (target.offset().top * 2 + target.height()) / 2;
    referenceX = (reference.offset().left * 2 + reference.width()) / 2;
    referenceY = (reference.offset().top * 2 + reference.height()) / 2;
    distance = {
      y: Math.abs(referenceY - targetY) - (target.height() + reference.height()) / 2,
      x: Math.abs(referenceX - targetX) - (target.width() + reference.width()) / 2
    };
    return distance;
  };

  Snap.prototype._edgesX = function(ele) {
    var edges, ele_left, ele_mid, ele_right;
    ele_left = ele.offset().left;
    ele_right = ele_left + ele.width();
    ele_mid = (ele_left + ele_right) / 2;
    edges = {
      edges1: ele_left,
      edges2: ele_mid,
      edges3: ele_right
    };
    return edges;
  };

  Snap.prototype._edgesY = function(ele) {
    var edges, ele_bot, ele_mid, ele_top;
    ele_top = ele.offset().top;
    ele_bot = ele_top + ele.height();
    ele_mid = (ele_top + ele_bot) / 2;
    edges = {
      edges1: ele_top,
      edges2: ele_mid,
      edges3: ele_bot
    };
    return edges;
  };

  Snap.prototype._lineX = function(e1, e2) {
    var bot, bot_e1, bot_e2, height, line, top, top_e1, top_e2;
    top_e1 = e1.offset().top;
    top_e2 = e2.offset().top;
    bot_e1 = top_e1 + e1.height();
    bot_e2 = top_e2 + e2.height();
    top = top_e1 < top_e2 ? top_e1 : top_e2;
    bot = bot_e1 > bot_e2 ? bot_e1 : bot_e2;
    height = bot - top;
    return line = {
      start: top - 10,
      length: height + 20
    };
  };

  Snap.prototype._lineY = function(e1, e2) {
    var left, left_e1, left_e2, line, right, right_e1, right_e2, width;
    left_e1 = e1.offset().left;
    left_e2 = e2.offset().left;
    right_e1 = left_e1 + e1.width();
    right_e2 = left_e2 + e2.width();
    left = left_e1 < left_e2 ? left_e1 : left_e2;
    right = right_e1 > right_e2 ? right_e1 : right_e2;
    width = right - left;
    return line = {
      start: left - 10,
      length: width + 20
    };
  };

  return Snap;

})(SimpleModule);

simple.dragdrop["class"].connect(Snap);

return Snap;

}));
