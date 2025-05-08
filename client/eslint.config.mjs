// @ts-check
import stylistic from '@stylistic/eslint-plugin'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/comma-dangle': ['error', {
        arrays: 'always-multiline',
        exports: 'never',
        functions: 'never',
        imports: 'never',
        objects: 'always-multiline',
      }],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/indent-binary-ops': ['error', 2],
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/padded-blocks': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      '@typescript-eslint/no-explicit-any': 'off',
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
    },
  }
)
