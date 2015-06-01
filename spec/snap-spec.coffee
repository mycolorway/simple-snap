
describe 'Simple snap', ->
  tpl = '''
    <div class="test" style="margin: 30px">
      <div id="dragging" class="draggable"></div>
      <div id="target" class="draggable"></div>
    </div>
  '''
  $tpl = $(tpl)
  $tpl.appendTo 'body'

  $dragging = $tpl.find '#dragging'
  $target = $tpl.find '#target'

  $dragging.css
    height: 30
    width: 30
    background: 'red'

  $target.css
    height: 100
    width: 100
    background: 'blue'

  dragOffset = $dragging.offset()
  targetOffset = $target.offset()

  mousedown = (x, y) ->
    e = $.Event 'mousedown',
      pageX: dragOffset.left + x
      pageY: dragOffset.top + y
    $dragging.trigger e

  mouseup = (x, y) ->
    e = $.Event 'mouseup',
      pageX: targetOffset.left + x
      pageY: targetOffset.top + y
    $(document).trigger e

  mousemove = (x, y, offset = targetOffset) ->
    e = $.Event 'mousemove',
      pageX: offset.left + x
      pageY: offset.top + y
    $(document).trigger e

  endDragStop = ->
    $(document).trigger 'mouseup'
    dragdrop = $(document).data 'dragdrop'
    dragdrop?.destroy()

  afterEach ->
    endDragStop()

  it 'should not display placeholder', ->
    #DOM_Placeholder
    simple.dragdrop
      draggable: '.draggable'
      droppable: '.test'
      placeholder: $('<div class="dom-placeholder">DOM Helper</div>')
      align:true
    mousedown(5, 5)
    mousemove(10, 10)
    expect($tpl.find('.dom-helper')).not.toExist()
    endDragStop()

    #Function_Placeholder
    simple.dragdrop
      draggable: '.draggable'
      droppable: '.test'
      placeholder: (dragging) ->
        $dragging =$(dragging).clone()
        $dragging.addClass 'functional-placeholder'
        $dragging
      align:true
    mousedown(5, 5)
    mousemove(10, 10)
    expect($tpl.find('.functional-placeholder')).not.toExist()

  it 'should apply align with both default offset and user offset', ->
    DEFAULT_OFFSET = 5
    USER_OFFSET = 6

    #Default
    simple.dragdrop
      draggable: '.draggable'
      droppable: '.test'
      align: true
    mousedown(0, 0)
    mousemove(-USER_OFFSET, 0)
    mousemove(-USER_OFFSET, 0)
    expect($(document).find('.horizontal_line').css('display')).toBe('none')
    mousemove(-DEFAULT_OFFSET, 0)
    expect($(document).find('.horizontal_line').css('display')).toBe('block')
    endDragStop()

    #User Input
    simple.dragdrop
      draggable: '.draggable'
      droppable: '.test'
      align: true
      alignOffset: USER_OFFSET
    mousedown(0, 0)
    mousemove(-USER_OFFSET, 0)
    mousemove(-USER_OFFSET, 0)
    expect($(document).find('.horizontal_line').css('display')).toBe('block')

  it 'should show horizontal lines (align in x)', ->
    ALIGN_OFFSET = 5
    TARGET_WIDTH = 100
    simple.dragdrop
      draggable: '.draggable'
      droppable: '.test'
      align: true
      alignOffset :ALIGN_OFFSET
    mousedown(0, 0)
    mousemove(-ALIGN_OFFSET - 1, 0)
    mousemove(-ALIGN_OFFSET - 1, 0)
    expect($(document).find('.horizontal_line').css('display')).toBe('none')

    #Left Line
    for i in [-ALIGN_OFFSET .. ALIGN_OFFSET]
      mousemove(i, 0)
      expect($(document).find('.horizontal_line').css('display')).toBe('block')
    mousemove(ALIGN_OFFSET + 1, 0)
    expect($(document).find('.horizontal_line').css('display')).toBe('none')

    #Mid Line
    for i in [TARGET_WIDTH/2 - ALIGN_OFFSET .. TARGET_WIDTH/2 + ALIGN_OFFSET]
      mousemove(i, 0)
      expect($(document).find('.horizontal_line').css('display')).toBe('block')
    mousemove(TARGET_WIDTH/2 + ALIGN_OFFSET + 1, 0)
    expect($(document).find('.horizontal_line').css('display')).toBe('none')

    #Right Line
    for i in [TARGET_WIDTH - ALIGN_OFFSET .. TARGET_WIDTH + ALIGN_OFFSET]
      mousemove(i, 0)
      expect($(document).find('.horizontal_line').css('display')).toBe('block')
    mousemove(TARGET_WIDTH + ALIGN_OFFSET + 1, 0)
    expect($(document).find('.horizontal_line').css('display')).toBe('none')


  it 'should show vertical lines (align in y)', ->
    ALIGN_OFFSET = 5
    TARGET_HEIGHT = 100
    simple.dragdrop
      draggable: '.draggable'
      droppable: '.test'
      align: true
    mousedown(0, 0)
    mousemove(0, -ALIGN_OFFSET - 1)
    mousemove(0, -ALIGN_OFFSET - 1)
    expect($(document).find('.vertical_line').css('display')).toBe('none')

    #Top Line
    for i in [-ALIGN_OFFSET .. ALIGN_OFFSET]
      mousemove(0, i)
      expect($(document).find('.vertical_line').css('display')).toBe('block')
    mousemove(0, ALIGN_OFFSET + 1)
    expect($(document).find('.vertical_line').css('display')).toBe('none')

    #Mid Line
    for i in [TARGET_HEIGHT/2 - ALIGN_OFFSET .. TARGET_HEIGHT/2 + ALIGN_OFFSET]
      mousemove(0, i)
      expect($(document).find('.vertical_line').css('display')).toBe('block')
    mousemove(0, TARGET_HEIGHT/2 + ALIGN_OFFSET + 1)
    expect($(document).find('.vertical_line').css('display')).toBe('none')

    #Bottom Line
    for i in [TARGET_HEIGHT - ALIGN_OFFSET .. TARGET_HEIGHT + ALIGN_OFFSET]
      mousemove(0, i)
      expect($(document).find('.vertical_line').css('display')).toBe('block')
    mousemove(0, TARGET_HEIGHT + ALIGN_OFFSET + 1)
    expect($(document).find('.vertical_line').css('display')).toBe('none')

  it 'should not align if user inputs align option "false"', ->
    simple.dragdrop
      draggable: '.draggable'
      droppable: '.test'
      align: false
    expect($(document).find('.vertical_line')).not.toExist()
    expect($(document).find('.horizontal_line')).not.toExist()

  it 'should not align if target is out of range', ->
    #Default Range
    DEFAULT_RANGE = 100
    USER_RANGE = 50
    ALIGN_OFFSET = 5
    TARGET_HEIGHT = 100
    simple.dragdrop
      draggable: '.draggable'
      droppable: '.test'
      align: true
    mousedown(0, 0)
    mousemove(ALIGN_OFFSET, TARGET_HEIGHT + USER_RANGE)
    mousemove(ALIGN_OFFSET, TARGET_HEIGHT + USER_RANGE)
    expect($(document).find('.horizontal_line').css('display')).toBe('block')

    mousemove(ALIGN_OFFSET, TARGET_HEIGHT + DEFAULT_RANGE)
    expect($(document).find('.horizontal_line').css('display')).toBe('none')
    endDragStop()

    simple.dragdrop
      draggable: '.draggable'
      droppable: '.test'
      align: true
      range: USER_RANGE
    mousedown(0, 0)
    mousemove(ALIGN_OFFSET, TARGET_HEIGHT + USER_RANGE)
    mousemove(ALIGN_OFFSET, TARGET_HEIGHT + USER_RANGE)
    expect($(document).find('.horizontal_line').css('display')).toBe('none')


  simple.dragdrop
    draggable: '.draggable'
    droppable: '.test'
    align: true