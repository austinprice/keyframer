import Ember from 'ember';
import { observer } from '@ember/object';

export default Ember.Component.extend({

  init() {
    this._super(...arguments);

    const _this = this;
    const obj = this.get('obj');

    interact('.obj').draggable({
      autoScroll: true,
      onmove: _this.dragMoveListener,
      onend: function(event) {
        const xOffset = Math.floor(event.pageX - event.x0);
        const yOffset = Math.floor(event.pageY - event.y0);
        const objX = parseFloat(_this.get('obj.baseStyles.left'));
        const objY = _this.get('obj.baseStyles.top');

        const newX = Math.floor(xOffset + parseFloat(objX));
        const newY = parseFloat(yOffset + parseFloat(objY));
        console.log(xOffset);

        console.log(obj.baseStyles.left);
        _this.set('obj.baseStyles.left', newX);
        _this.set('obj.baseStyles.top', newY);
        console.log(_this.get('obj.baseStyles.left'))
      }
    })
  },

  dragMoveListener(event) {
    const target = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  },

  setObjectStyles: function(event) {

  },

  actions: {
    // setObjectStyles() {
    //   const obj = this.get('obj');
    //   console.log('hi');
    // }
  }
});
