import Ember from 'ember';
import {observer} from '@ember/object';

export default Ember.Component.extend({

  actions: {
    rewriteStyles() {
      this.get('rewriteStyles')();
    },
    removeObject(object) {
      this.get('removeObject')(object);
    },
    removeKeyframe(keyframe) {
      this.get('removeKeyframe')(keyframe);
    }
  }
});
