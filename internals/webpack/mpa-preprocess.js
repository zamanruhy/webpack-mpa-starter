module.exports = function mpaPreprocess() {
  return {
    script({ content }) {
      if (/\bsetContext\(/.test(content)) {
        content = content.replace(/\bsetContext\(/g, '_setContext(')

        content = `${content}
        function _setContext(key, value) {
          setContext(key, value)

          if (window.__currentElement__) {
            window.__currentElement__.__context__.set(key, value)
          }
        }`

        return { code: content }
      } else if (/\bgetContext\(/.test(content)) {
        content = content.replace(/\bgetContext\(/g, '_getContext(')

        content = `${content}
        function _getContext(key) {
          return getContext(key) ?? window.__currentElement__.__context__.get(key)
        }`

        return { code: content }
      }
    }
  }
}
