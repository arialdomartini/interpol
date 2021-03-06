# # Supported Languages

module.exports = LANGUAGES =
  Markdown:
    nameMatchers: ['.md', '.markdown','.mkd', '.mkdn', '.mdown']
    commentsOnly: true

  JavaScript:
    nameMatchers:      ['.js']
    pygmentsLexer:     'javascript'
    multiLineComment:  ['/**', '*', '*/']
    singleLineComment: ['//']
    ignorePrefix:      '}'
    foldPrefix:        '^'

  JSON                :
    nameMatchers      : ['.json']
    pygmentsLexer     : 'json'
    codeOnly          : true
