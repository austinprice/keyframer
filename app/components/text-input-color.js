import Ember from 'ember';
import { observer } from '@ember/object';

export default Ember.Component.extend({

  init() {
    this._super(...arguments);

    const value = this.get('value');
    this.set('color', value);
  },

  triggerRewrite: observer('color', function() {
    this.set('value', this.get('color'));
    this.get('keypressAction')();
  }),

  // actions: {
  //   keypressAction() {
  //     this.get('keypressAction')();
  //   }
  // }
});
