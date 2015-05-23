
class Snap extends SimpleModule
  @pluginName: 'Snap'

  _init: ->
  @editor = @_module

simple.dragdrop.class.connect(Snap);
console.log Snap
