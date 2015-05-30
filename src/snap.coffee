
class Snap extends SimpleModule
  @pluginName: 'Snap'

  opts:
    align:true,
    distance: 1,
    axis: null,
    alignOffset: 10,
    rage: 100

  _init: ->
    @dragdrop = @_module
    @dragdrop.opts.placeholder = null
    @dragdrop.opts.helper = null
    @horizental_line = $('<div class="horizontal_line"></div>').appendTo("body")
    @vertical_line = $('<div class="vertical_line"></div>').appendTo("body")
    @dragdrop.on 'drag', (e,obj) =>
      clearTimeout(@align_event_x)
      @horizental_line.hide()
      @vertical_line.hide()
      wrapper = $(dragdrop.opts.el)
      $dragging = obj.helper
      other_dragables = wrapper.find(@dragdrop.opts.draggable).not(obj.helper).not(obj.placeholder).not(obj.dragging)
      adjacent_objs = @_adjacent $dragging, other_dragables
      align_x = @_align $dragging, adjacent_objs.x, @_edgesX, @_lineX
      align_y = @_align $dragging, adjacent_objs.y, @_edgesY, @_lineY
      if align_x
        $dragging.css 'left', $dragging.offset().left + align_x.move
        @horizental_line.css({
          'left': align_x.align_edge,
          'top' : align_x.line.start
          'height' : align_x.line.length
        })
        @horizental_line.show()

      if align_y
        $dragging.css 'top', $dragging.offset().top + align_y.move
        @vertical_line.css({
          'top': align_y.align_edge,
          'left' : align_y.line.start
          'width' : align_y.line.length
        })
        @vertical_line.show()

      @dragdrop.on 'dragend', ()=>
        @horizental_line.hide()
        @vertical_line.hide()

  _align: (target, references, edges, line) ->
    target_edges = edges.call @, target
    min_distance = @opts.alignOffset / 2
    align_edge = null
    align_obj = null
    move = null
    $.each references, (index, ele) =>
      $ele = $(ele)
      ele_edges = edges.call @, $ele
      $.each ele_edges, (index, ele_edge) =>
        $.each target_edges , (index, target_edge) =>
          distance = Math.abs(target_edge - ele_edge)
          if distance < min_distance
            min_distance = distance
            align_edge = ele_edge
            move = ele_edge - target_edge
            align_obj = $ele
    if align_edge
      align_info =
        align_edge: align_edge
        move: move
        line: line.call @, target, align_obj
    align_info


  _adjacent: (target, references) ->
    adjacent_x = []
    adjacent_y = []
    $.each references, (index, ele) =>
      $ele = $(ele)
      distance = @_distance target, $ele
      if distance.x < @opts.alignOffset/2 && distance.y < @opts.rage
        adjacent_x.push $ele
      if distance.y < @opts.alignOffset/2  && distance.x < @opts.rage
        adjacent_y.push $ele
    adjacent =
      x: adjacent_x
      y: adjacent_y
    adjacent

  _distance: (target, reference)->
    targetX = (target.offset().left * 2 + target.width()) / 2
    targetY = (target.offset().top * 2 + target.height()) / 2
    referenceX = (reference.offset().left * 2 + reference.width()) / 2
    referenceY = (reference.offset().top * 2 + reference.height()) / 2
    distance =
      y : Math.abs(referenceY - targetY) - (target.height() + reference.height()) / 2
      x : Math.abs(referenceX - targetX) - (target.width() + reference.width()) / 2
    distance

  _edgesX: (ele) ->
    ele_left = ele.offset().left
    ele_right = ele_left + ele.width()
    ele_mid = (ele_left + ele_right) / 2
    edges =
      edges1 : ele_left
      edges2 : ele_mid
      edges3 : ele_right
    edges

  _edgesY: (ele) ->
    ele_top = ele.offset().top
    ele_bot = ele_top + ele.height()
    ele_mid = (ele_top + ele_bot) / 2
    edges =
      edges1 : ele_top
      edges2 : ele_mid
      edges3 : ele_bot
    edges

  _lineX: (e1,e2) ->
    top_e1 = e1.offset().top
    top_e2 = e2.offset().top
    bot_e1 = top_e1 + e1.height()
    bot_e2 = top_e2 + e2.height()
    top = if top_e1 < top_e2 then top_e1 else top_e2
    bot = if bot_e1 > bot_e2 then bot_e1 else bot_e2
    height = bot - top
    line =
      start: top - 10
      length: height + 20

  _lineY: (e1,e2) ->
    left_e1 = e1.offset().left
    left_e2 = e2.offset().left
    right_e1 = left_e1 + e1.width()
    right_e2 = left_e2 + e2.width()
    left = if left_e1 < left_e2 then left_e1 else left_e2
    right = if right_e1 > right_e2 then right_e1 else right_e2
    width = right - left
    line =
      start: left - 10
      length: width + 20

simple.dragdrop.class.connect Snap