(function(module, document){
  "use strict";

  // Describe Events default properties.
  var events = {
    click: {
      type: 'MouseEvent',
      bubbles: true,
      cancelable: true
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
    properties = events[name];
    if (document.createEvent) {
      event = document.createEvent("MouseEvents");
      event.initEvent(name, properties.bubbles, properties.cancelable);
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
      console.log('will dispatch', event, 'on', element);
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
