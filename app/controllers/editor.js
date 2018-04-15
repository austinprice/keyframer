import Ember from 'ember';
import { get } from '@ember/object';
import $ from 'jquery';

export default Ember.Controller.extend({

  init() {
    this.set('borderOptions', ['None', 'Solid', 'Dotted']);
    const availableKeyframes = this.get('availableKeyframes');
    let newKeyframes = [];

    availableKeyframes.forEach(function(keyframe) {
      const frame = {
        active: false,
        position: keyframe,
        styles: {
          background: '0ACFFF',
          borderColor: '',
          borderStyle: 'None',
          borderWidth: 0,
          borderRadius: 0,
          height: 50,
          left: 50,
          opacity: 1,
          top: 50,
          width: 50
        },
        cssString: ''
      };
      newKeyframes.pushObject(frame);
    });

    this.set('newKeyframes', newKeyframes);
    this.set('stageObjects',[
      {
        name: 'Object 1',
        domId: 'object-1',
        baseStyles: {
          background: '0ACFFF',
          borderColor: '',
          borderStyle: 'None',
          borderWidth: 0,
          borderRadius: 0,
          height: 50,
          left: 50,
          opacity: 1,
          top: 50,
          width: 50
        },
        cssBaseStylesString: '',
        keyframes: newKeyframes,
        cssKeyframesString: `
          @keyframes object-1 {
            
          }
        `
      }
    ]);

    this.rewriteObjectCss();

    $('.obj').click(function(e) {
      e.stopPropagation();
    })
  },

  availableKeyframes: [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100],
  animationDuration: 1,
  animationIteration: 'infinite',
  objCount: 1,

  baseObjCss: 'display: inline-block; position: absolute;',

  rewriteObjectCss() {
    const objs = this.get('stageObjects');
    const base = this.get('baseObjCss');

    objs.forEach(function(obj) {
      const styles = obj.baseStyles;
      Ember.set(obj, 'cssBaseStylesString', base + 'background:#' + styles.background  +
        //'; animation-name:' + obj.domId +
        '; border-style:' + styles.borderStyle +
        '; border-color:#' + styles.borderColor +
        '; border-width:' + styles.borderWidth +
        'px; border-radius:' + styles.borderRadius +
        'px; height:' + styles.height +
        'px; left:' + styles.left +
        'px; opacity:' + styles.opacity +
        '; top:' + styles.top +
        'px; width:' + styles.width + 'px;');

      let keyframeString = `0% {background: #${styles.background}; border-style:${styles.borderStyle}; border-color: #${styles.borderColor}; border-width:${styles.borderWidth}px; border-radius:${styles.borderRadius}px; height:${styles.height}px; left:${styles.left}px; opacity:${styles.opacity}; top:${styles.top}px; width:${styles.width}px;}`;

      obj.keyframes.forEach(function(keyframe) {
        const keyframeStyles = keyframe.styles;
        let keyframeStyleString = `background: #${keyframeStyles.background}; border-style:${keyframeStyles.borderStyle}; border-color: #${keyframeStyles.borderColor}; border-width:${keyframeStyles.borderWidth}px; border-radius:${keyframeStyles.borderRadius}px; height:${keyframeStyles.height}px; left:${keyframeStyles.left}px; opacity:${keyframeStyles.opacity}; top:${keyframeStyles.top}px; width:${keyframeStyles.width}px;`;
        Ember.set(keyframe, 'cssString', keyframeStyleString);
        if (keyframe.active) {
          const keyframeDef = `${keyframe.position}% {${keyframeStyleString}}`;
          keyframeString += keyframeDef;
        } else {
          const baseStyles = {
            background: obj.baseStyles.background,
            borderColor: obj.baseStyles.borderColor,
            borderStyle: obj.baseStyles.borderStyle,
            borderWidth: obj.baseStyles.borderWidth,
            borderRadius: obj.baseStyles.borderRadius,
            height: obj.baseStyles.height,
            left: obj.baseStyles.left,
            opacity: obj.baseStyles.opacity,
            top: obj.baseStyles.top,
            width: obj.baseStyles.width
          };
          Ember.set(keyframe, 'styles', baseStyles);
          return;
        }
      });

      Ember.set(obj, 'cssKeyframesString',`@keyframes ${obj.domId} {
         ${keyframeString};
      }`);
    });
  },

  actions: {
    rewriteStyles() {
      this.rewriteObjectCss();
    },

    addObj() {
      // Grab the objects array
      const objArray = this.get('stageObjects');

      // Grab the newKeyframes array
      const availableKeyframes = this.get('availableKeyframes');
      let newKeyframes = [];

      availableKeyframes.forEach(function(keyframe) {
        const frame = {
          active: false,
          position: keyframe,
          styles: {
            background: '0ACFFF',
            borderColor: '',
            borderStyle: 'None',
            borderWidth: 0,
            borderRadius: 0,
            height: 50,
            left: 50,
            opacity: 1,
            top: 50,
            width: 50
          },
          cssString: ''
        }
        newKeyframes.pushObject(frame);
      });

      // Grab the number of objects created and increment it to use for naming the new object
      let objCount = this.get('objCount');
      objCount ++;
      this.set('objCount', objCount);

      // Create the new object
      const newObj = {
        name: `Object ${objCount}`,
        domId: `object-${objCount}`,
        baseStyles: {
          background: '0ACFFF',
          borderColor: '',
          borderStyle: 'None',
          borderWidth: 0,
          borderRadius: 0,
          height: 50,
          left: 180,
          opacity: 1,
          top: 50,
          width: 50
        },
        cssBaseStylesString: '',
        keyframes: newKeyframes,
        cssKeyframesString: `
          @keyframes object-${objCount} {
            
          }
        `
      };

      // Push the new object to the objects array
      objArray.pushObject(newObj);
      this.rewriteObjectCss();
    },

    selectTimelineObject(obj) {
      this.set('playAnimation', false);
      this.set('selectedKeyframe', null);
      this.set('selectedObject', obj);
    },
    selectKeyframeObject(keyframe, obj) {
      this.set('playAnimation', false);
      this.set('selectedObject', obj);
      this.set('selectedKeyframe', keyframe);
      Ember.set(this.get('selectedKeyframe'), 'active', true);
      this.rewriteObjectCss();
    },
    removeObject(obj) {
      const objArray = this.get('stageObjects');
      const selectedObj = this.get('selectedObject');

      if (selectedObj === obj) {
        this.set('selectedKeyframe', null);
        this.set('selectedObject', null);
      }

      objArray.removeObject(obj);
    },
    removeKeyframe(keyframe) {
      Ember.set(keyframe, 'active', false);
    },
    playAnimation() {
      this.set('selectedKeyframe', null);
      this.set('selectedObject', null);
      this.set('playAnimation', true);
    },
    stopAnimation() {
      this.set('playAnimation', false);
    },
    deselectAllObjects() {
      this.set('selectedKeyframe', null);
      this.set('selectedObject', null);
    }
  }

});
