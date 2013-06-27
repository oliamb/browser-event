(function(module, document){
  "use strict";

  function merge () {
    var target = {};
    for(var i = 0; i < arguments.length; i++) {
      var source = arguments[i];
      if (source) {
        for (var name in source) {
          target[name] = source[name];
        }
      }
    }
    return target;
  }

  var properties = {
    initMouseEvent: {
      canBubble: true,
      cancelable: true,
      view: window,
      detail: 1,
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      button: 0,
      relatedTarget: null
    }
  };

  // Describe Events default properties.
  // Documentation coming from MDN.
  var events = {
    // Mouse Events:
    // click, mousedown, mouseup, mouseover, mousemove, mouseout
    click: {
      type: "MouseEvents"
    }
  };

  var initializers = {
    MouseEvents: function (event, name, options) {
      var p = merge(properties.initMouseEvent, options);
      return event.initMouseEvent(
        name,
        // Properties you can override in initMouseEvent:
        // canBubble: whether or not the event can bubble. Sets the value of event.bubbles.
        p.canBubble,
        // cancelable: whether or not the event's default action can be prevented. Sets the value of event.cancelable.
        p.cancelable,
        // view: the Event's AbstractView. You should pass the window object here. Sets the value of event.view.
        p.view,
        // detail: the Event's mouse click count. Sets the value of event.detail.
        p.detail,
        // screenX: the Event's screen x coordinate. Sets the value of event.screenX.
        p.screenX,
        // screenY: the Event's screen y coordinate. Sets the value of event.screenY.
        p.screenY,
        // clientX: the Event's client x coordinate. Sets the value of event.clientX.
        p.clientX,
        // clientY: the Event's client y coordinate. Sets the value of event.clientY.
        p.clientY,
        // ctrlKey: whether or not control key was depressed during the Event. Sets the value of event.ctrlKey.
        p.ctrlKey,
        // altKey: whether or not alt key was depressed during the Event. Sets the value of event.altKey.
        p.altKey,
        // shiftKey: whether or not shift key was depressed during the Event. Sets the value of event.shiftKey.
        p.shiftKey,
        // metaKey: whether or not meta key was depressed during the Event. Sets the value of event.metaKey.
        p.metaKey,
        // button: the Event's mouse event.button.
        p.button,
        // relatedTarget: the Event's related EventTarget. Only used with some event types (e.g. mouseover and mouseout). In other cases, pass null.
        p.relatedTarget
      );
    }
  };

  /**
   * Create an event given its name and options
   */
  function createEvent (name, options) {
    var event, properties;
    if (!events[name]) {
      throw new Error('Unknown Event: ' + name);
    }
    if (document.createEvent) {
      event = document.createEvent(events[name].type);
      initializers[events[name].type](event, name, options);
    } else {
      event = document.createEventObject();
      event.eventType = name;
    }
    return event;
  }

  /**
   * Trigger the given event
   */
  function triggerEvent (element, event) {
    if (document.createEvent) {
      element.dispatchEvent(event);
    } else {
      element.fireEvent("on" + event.eventType, event);
    }
    return event;
  }

  module.trigger = function trigger (element, name, options) {
    return triggerEvent(element, createEvent(name, options));
  };
}(window, document));
