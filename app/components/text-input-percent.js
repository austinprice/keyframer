import Ember from 'ember';
import { observer } from '@ember/object';

export default Ember.Component.extend({

  // init() {
  //   this._super(...arguments);
  //
  //   const value = this.get('value');
  //   this.set('percent', value);
  // },
  //
  // triggerRewrite: observer('percent', function() {
  //   this.set('value', this.get('percent'));
  //   this.get('keypressAction')();
  // }),

  actions: {
    keypressAction() {
      this.get('keypressAction')();
    }
  }
});
