import Ember from 'ember';
import { observer } from '@ember/object';

export default Ember.Component.extend({

  // init() {
  //   this._super(...arguments);
  //
  //   const value = this.get('value');
  //   this.set('pixel', value);
  // },
  //
  // triggerRewrite: observer('pixel', function() {
  //   this.set('value', this.get('pixel'));
  //   this.get('keypressAction')();
  // }),

  actions: {
    keypressAction() {
      this.get('keypressAction')();
    }
  }
});
