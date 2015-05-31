(function() {
  describe('Simple snap', function() {
    var $dragging, $target, $tpl, dragOffset, endDragStop, mousedown, mousemove, mouseup, targetOffset, tpl;
    tpl = '<div class="test" style="margin: 30px">\n  <div id="dragging" class="draggable"></div>\n  <div id="target" class="draggable"></div>\n</div>';
    $tpl = $(tpl);
    $tpl.appendTo('body');
    $dragging = $tpl.find('#dragging');
    $target = $tpl.find('#target');
    $dragging.css({
      height: 30,
      width: 30,
      border: '1px solid black'
    });
    $target.css({
      height: 100,
      width: 100,
      border: '1px solid black'
    });
    dragOffset = $dragging.offset();
    targetOffset = $target.offset();
    mousedown = function(x, y) {
      var e;
      e = $.Event('mousedown', {
        pageX: dragOffset.left + x,
        pageY: dragOffset.top + y
      });
      return $dragging.trigger(e);
    };
    mouseup = function(x, y) {
      var e;
      e = $.Event('mouseup', {
        pageX: targetOffset.left + x,
        pageY: targetOffset.top + y
      });
      return $(document).trigger(e);
    };
    mousemove = function(x, y, offset) {
      var e;
      if (offset == null) {
        offset = targetOffset;
      }
      e = $.Event('mousemove', {
        pageX: offset.left + x,
        pageY: offset.top + y
      });
      return $(document).trigger(e);
    };
    endDragStop = function() {
      var dragdrop;
      $(document).trigger('mouseup');
      dragdrop = $(document).data('dragdrop');
      return dragdrop != null ? dragdrop.destroy() : void 0;
    };
    afterEach(function() {
      return endDragStop();
    });
    it('should not display placeholder', function() {
      simple.dragdrop({
        draggable: '.draggable',
        droppable: '.test',
        placeholder: $('<div class="dom-placeholder">DOM Helper</div>'),
        align: true
      });
      mousedown(5, 5);
      mousemove(10, 10);
      expect($tpl.find('.dom-helper')).not.toExist();
      endDragStop();
      simple.dragdrop({
        draggable: '.draggable',
        droppable: '.test',
        placeholder: function(dragging) {
          $dragging = $(dragging).clone();
          $dragging.addClass('functional-placeholder');
          return $dragging;
        },
        align: true
      });
      mousedown(5, 5);
      mousemove(10, 10);
      return expect($tpl.find('.functional-placeholder')).not.toExist();
    });
    it('should apply align with both default offset and user offset', function() {
      var DEFAULT_OFFSET, USER_OFFSET;
      DEFAULT_OFFSET = 5;
      USER_OFFSET = 6;
      simple.dragdrop({
        draggable: '.draggable',
        droppable: '.test',
        align: true
      });
      mousedown(0, 0);
      mousemove(-USER_OFFSET, 0);
      mousemove(-USER_OFFSET, 0);
      expect($(document).find('.horizontal_line').css('display')).toBe('none');
      mousemove(-DEFAULT_OFFSET, 0);
      expect($(document).find('.horizontal_line').css('display')).toBe('block');
      endDragStop();
      simple.dragdrop({
        draggable: '.draggable',
        droppable: '.test',
        align: true,
        alignOffset: USER_OFFSET
      });
      mousedown(0, 0);
      mousemove(-USER_OFFSET, 0);
      mousemove(-USER_OFFSET, 0);
      return expect($(document).find('.horizontal_line').css('display')).toBe('block');
    });
    it('should show horizontal lines (align in x)', function() {
      var ALIGN_OFFSET, TARGET_WIDTH, i, j, k, l, ref, ref1, ref2, ref3, ref4, ref5;
      ALIGN_OFFSET = 5;
      TARGET_WIDTH = 100;
      simple.dragdrop({
        draggable: '.draggable',
        droppable: '.test',
        align: true,
        alignOffset: ALIGN_OFFSET
      });
      mousedown(0, 0);
      mousemove(-ALIGN_OFFSET - 1, 0);
      mousemove(-ALIGN_OFFSET - 1, 0);
      expect($(document).find('.horizontal_line').css('display')).toBe('none');
      for (i = j = ref = -ALIGN_OFFSET, ref1 = ALIGN_OFFSET; ref <= ref1 ? j <= ref1 : j >= ref1; i = ref <= ref1 ? ++j : --j) {
        mousemove(i, 0);
        expect($(document).find('.horizontal_line').css('left')).toBe('38px');
      }
      mousemove(ALIGN_OFFSET + 1, 0);
      expect($(document).find('.horizontal_line').css('display')).toBe('none');
      for (i = k = ref2 = TARGET_WIDTH / 2 - ALIGN_OFFSET, ref3 = TARGET_WIDTH / 2 + ALIGN_OFFSET; ref2 <= ref3 ? k <= ref3 : k >= ref3; i = ref2 <= ref3 ? ++k : --k) {
        mousemove(i, 0);
        expect($(document).find('.horizontal_line').css('left')).toBe('88px');
      }
      mousemove(TARGET_WIDTH / 2 + ALIGN_OFFSET + 1, 0);
      expect($(document).find('.horizontal_line').css('display')).toBe('none');
      for (i = l = ref4 = TARGET_WIDTH - ALIGN_OFFSET, ref5 = TARGET_WIDTH + ALIGN_OFFSET; ref4 <= ref5 ? l <= ref5 : l >= ref5; i = ref4 <= ref5 ? ++l : --l) {
        mousemove(i, 0);
        expect($(document).find('.horizontal_line').css('left')).toBe('138px');
      }
      mousemove(TARGET_WIDTH + ALIGN_OFFSET + 1, 0);
      return expect($(document).find('.horizontal_line').css('display')).toBe('none');
    });
    it('should show vertical lines (align in y)', function() {
      var ALIGN_OFFSET, TARGET_HEIGHT, i, j, k, l, ref, ref1, ref2, ref3, ref4, ref5;
      ALIGN_OFFSET = 5;
      TARGET_HEIGHT = 100;
      simple.dragdrop({
        draggable: '.draggable',
        droppable: '.test',
        align: true
      });
      mousedown(0, 0);
      mousemove(0, -ALIGN_OFFSET - 1);
      mousemove(0, -ALIGN_OFFSET - 1);
      expect($(document).find('.vertical_line').css('display')).toBe('none');
      for (i = j = ref = -ALIGN_OFFSET, ref1 = ALIGN_OFFSET; ref <= ref1 ? j <= ref1 : j >= ref1; i = ref <= ref1 ? ++j : --j) {
        mousemove(0, i);
        expect($(document).find('.vertical_line').css('top')).toBe('62px');
      }
      mousemove(0, ALIGN_OFFSET + 1);
      expect($(document).find('.vertical_line').css('display')).toBe('none');
      for (i = k = ref2 = TARGET_HEIGHT / 2 - ALIGN_OFFSET, ref3 = TARGET_HEIGHT / 2 + ALIGN_OFFSET; ref2 <= ref3 ? k <= ref3 : k >= ref3; i = ref2 <= ref3 ? ++k : --k) {
        mousemove(0, i);
        expect($(document).find('.vertical_line').css('top')).toBe('112px');
      }
      mousemove(0, TARGET_HEIGHT / 2 + ALIGN_OFFSET + 1);
      expect($(document).find('.vertical_line').css('display')).toBe('none');
      for (i = l = ref4 = TARGET_HEIGHT - ALIGN_OFFSET, ref5 = TARGET_HEIGHT + ALIGN_OFFSET; ref4 <= ref5 ? l <= ref5 : l >= ref5; i = ref4 <= ref5 ? ++l : --l) {
        mousemove(0, i);
        expect($(document).find('.vertical_line').css('top')).toBe('162px');
      }
      mousemove(0, TARGET_HEIGHT + ALIGN_OFFSET + 1);
      return expect($(document).find('.vertical_line').css('display')).toBe('none');
    });
    it('should not align if user inputs align option "false"', function() {
      simple.dragdrop({
        draggable: '.draggable',
        droppable: '.test',
        align: false
      });
      expect($(document).find('.vertical_line')).not.toExist();
      return expect($(document).find('.horizontal_line')).not.toExist();
    });
    it('should not align if target is out of range', function() {
      var ALIGN_OFFSET, DEFAULT_RANGE, TARGET_HEIGHT, USER_RANGE;
      DEFAULT_RANGE = 100;
      USER_RANGE = 50;
      ALIGN_OFFSET = 5;
      TARGET_HEIGHT = 100;
      simple.dragdrop({
        draggable: '.draggable',
        droppable: '.test',
        align: true
      });
      mousedown(0, 0);
      mousemove(ALIGN_OFFSET, TARGET_HEIGHT + USER_RANGE);
      mousemove(ALIGN_OFFSET, TARGET_HEIGHT + USER_RANGE);
      expect($(document).find('.horizontal_line').css('display')).toBe('block');
      mousemove(ALIGN_OFFSET, TARGET_HEIGHT + DEFAULT_RANGE);
      expect($(document).find('.horizontal_line').css('display')).toBe('none');
      endDragStop();
      simple.dragdrop({
        draggable: '.draggable',
        droppable: '.test',
        align: true,
        range: USER_RANGE
      });
      mousedown(0, 0);
      mousemove(ALIGN_OFFSET, TARGET_HEIGHT + USER_RANGE);
      mousemove(ALIGN_OFFSET, TARGET_HEIGHT + USER_RANGE);
      return expect($(document).find('.horizontal_line').css('display')).toBe('none');
    });
    return simple.dragdrop({
      draggable: '.draggable',
      droppable: '.test',
      align: true
    });
  });

}).call(this);
