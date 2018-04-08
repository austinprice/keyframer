import Ember from 'ember';
// import { observer } from '@ember/object';
// import { on } from '@ember/object/evented';

export default Ember.Controller.extend({

  init() {
    this.set('borderOptions', ['Solid', 'Dotted']);
    this.set('stageObjects',[
      {
        name: 'Object 1',
        domId: 'object-1',
        baseStyles: {
          background: '#0ACFFF',
          borderColor: '',
          borderWidth: 0,
          borderRadius: 0,
          height: 50,
          left: 50,
          top: 50,
          width: 50
        },
        cssBaseStylesString: '',
        keyframes: [
          {
            position: 50,
            styles: {
              background: '#0ACFFF',
              borderColor: '',
              borderWidth: 0,
              borderRadius: 0,
              height: 50,
              left: 50,
              top: 50,
              width: 50
            }
          }
        ],
        cssKeyframesString: `
          @keyframes object-1 {
            
          }
        `
      }
    ]);

    this.rewriteObjectCss();
  },

  baseObjCss: 'display: inline-block; position: absolute;',

  rewriteObjectCss() {
    const objs = this.get('stageObjects');
    const base = this.get('baseObjCss');

    objs.forEach(function(obj) {
      const styles = obj.baseStyles;
      Ember.set(obj, 'cssBaseStylesString', base + 'background:' + styles.background +
        '; border-color:' + styles.borderColor +
        '; border-width:' + styles.borderWidth +
        '; border-radius:' + styles.borderRadius +
        'px; height:' + styles.height +
        'px; left:' + styles.left +
        'px; top:' + styles.top +
        'px; width:' + styles.width + 'px;');

      let keyframeString = `0% {background: ${styles.background}; border-color: ${styles.borderColor}; border-width:${styles.borderWidth}; border-radius:${styles.borderRadius}; height:${styles.height}; left:${styles.left}; top:${styles.top}; width:${styles.width};}`;

      obj.keyframes.forEach(function(keyframe) {
        const keyframeStyles = keyframe.styles;
        const keyframeDef = `${keyframe.position}% {background: ${keyframeStyles.background}; border-color: ${keyframeStyles.borderColor}; border-width:${keyframeStyles.borderWidth}; border-radius:${keyframeStyles.borderRadius}; height:${keyframeStyles.height}; left:${keyframeStyles.left}; top:${keyframeStyles.top}; width:${keyframeStyles.width};}`;
        keyframeString += keyframeDef;
      });

      obj.cssKeyframesString = `@keyframes ${obj.domId} {
         ${keyframeString};
      }`;
    });
  },

  actions: {
    rewriteStyles() {
      this.rewriteObjectCss();
    }
  }

});
