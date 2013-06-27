var expect = chai.expect;

describe("trigger MouseEvents", function() {
  describe("click", function() {
    var button;
    beforeEach(function() {
      button = document.createElement('button');
      document.body.appendChild(button);
    });
    afterEach(function() {
      document.body.removeChild(button);
    });

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
});