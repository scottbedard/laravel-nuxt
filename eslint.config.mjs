// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      'vue/attributes-order': ['error', {
        alphabetical: true,
        order: [
          ['CONDITIONALS', 'CONTENT', 'LIST_RENDERING', 'OTHER_DIRECTIVES', 'RENDER_MODIFIERS', 'SLOT', 'TWO_WAY_BINDING'],
          ['ATTR_STATIC', 'ATTR_SHORTHAND_BOOL'],
          'ATTR_DYNAMIC',
          'EVENTS',
        ],
      }],
      'vue/html-closing-bracket-newline': [
        'error',
        {
          multiline: 'never',
          selfClosingTag: {
            multiline: 'never',
            singleline: 'never',
          },
          singleline: 'never',
        },
      ],
      'vue/html-closing-bracket-spacing': ['error', {
        endTag: 'never',
        selfClosingTag: 'always',
        startTag: 'never',
      }],
      'vue/multi-word-component-names': 'off',
      'vue/padding-line-between-tags': ['error', [
        { blankLine: 'always', next: '*', prev: '*' },
      ]],
      'vue/require-default-prop': 'off',
      'vue/v-bind-style': ['error', 'shorthand', {
        sameNameShorthand: 'always',
      }],
    }
  }
)
