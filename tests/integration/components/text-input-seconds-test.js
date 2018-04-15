import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('text-input-seconds', 'Integration | Component | text input seconds', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{text-input-seconds}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#text-input-seconds}}
      template block text
    {{/text-input-seconds}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
