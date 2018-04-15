import Ember from 'ember';
import { observer } from '@ember/object';

export default Ember.Component.extend({

  triggerRewrite: observer('value', function() {
    this.get('keypressAction')();
  }),

  actions: {
    keypressAction() {
      this.get('keypressAction')();
    }
  }
});
