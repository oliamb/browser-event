var expect = chai.expect;

describe("trigger MouseEvents", function() {
  var button;
  beforeEach(function() {
    button = document.createElement('button');
    document.body.appendChild(button);
  });
  afterEach(function() {
    document.body.removeChild(button);
  });

  describe("click", function() {
    it('initiates a click with the default value', function(done) {
      button.addEventListener('click', function(event) {
        expect(event.type).to.eql('click');
        expect(event.bubbles).to.eql(true);
        expect(event.cancelable).to.eql(true);
        done();
      }, false);
      trigger(button, 'click');
    });

    it('initiates click with custom options', function(done) {
      button.addEventListener('click', function(event) {
        expect(event.bubbles).to.eql(false);
        expect(event.cancelable).to.eql(false);
        expect(event.screenX).to.eql(1);
        expect(event.screenY).to.eql(2);
        expect(event.clientX).to.eql(3);
        expect(event.clientY).to.eql(4);
        expect(event.ctrlKey).to.eql(true);
        done();
      }, false);
      trigger(button, 'click', {
        bubbles: false,
        cancelable: false,
        ctrlKey: true,
        screenX: 1,
        screenY: 2,
        clientX: 3,
        clientY: 4
      });
    });
  });

  describe("mouseover", function() {
    it('generates cancelable event', function(done) {
      button.addEventListener('mouseover', function(event) {
        expect(event.cancelable).to.eql(true);
        done();
      }, false);
      trigger(button, 'mouseover');
    });
  });

  describe("mouseout", function() {
    it('generates cancelable event', function(done) {
      button.addEventListener('mouseout', function(event) {
        expect(event.cancelable).to.eql(true);
        done();
      }, false);
      trigger(button, 'mouseout');
    });
  });

  describe("mousedown", function() {
    it('generates cancelable event', function(done) {
      button.addEventListener('mousedown', function(event) {
        expect(event.cancelable).to.eql(true);
        done();
      }, false);
      trigger(button, 'mousedown');
    });
  });

  describe("mouseup", function() {
    it('generates cancelable event', function(done) {
      button.addEventListener('mouseup', function(event) {
        expect(event.cancelable).to.eql(true);
        done();
      }, false);
      trigger(button, 'mouseup');
    });
  });

  describe("mousemove", function() {
    it('generates non-cancelable event', function(done) {
      button.addEventListener('mousemove', function(event) {
        expect(event.cancelable).to.eql(false);
        done();
      }, false);
      trigger(button, 'mousemove');
    });
  });

  describe("contextmenu", function() {
    it('generates cancelable event', function(done) {
      button.addEventListener('contextmenu', function(event) {
        expect(event.cancelable).to.eql(true);
        done();
      }, false);
      trigger(button, 'contextmenu');
    });
  });

  describe("dblclick", function() {
    it('generates cancelable event', function(done) {
      button.addEventListener('mouseup', function(event) {
        expect(event.cancelable).to.eql(true);
        done();
      }, false);
      trigger(button, 'mouseup');
    });
    it('count two clicks', function(done) {
      button.addEventListener('dblclick', function(event) {
        expect(event.cancelable).to.eql(true);
        done();
      }, false);
      trigger(button, 'dblclick');
    });
  });
});