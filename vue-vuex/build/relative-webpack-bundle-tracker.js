const path = require('path')
const each = require('lodash/fp/each')
const BundleTrackerPlugin = require('webpack-bundle-tracker')

// https://github.com/ezhome/webpack-bundle-tracker/issues/25
class RelativeBundleTrackerPlugin extends BundleTrackerPlugin {
  convertPathChunks (chunks) {
    each(
      each(chunk => {
        chunk.path = path.relative(this.options.path, chunk.path)
      })
    )(chunks)
  }
  writeOutput (compiler, contents) {
    if (contents.status === 'done') {
      this.convertPathChunks(contents.chunks)
    }

    super.writeOutput(compiler, contents)
  }
}

module.exports = RelativeBundleTrackerPlugin
