import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    keypressAction() {
      this.get('keypressAction')();
    }
  }
});
