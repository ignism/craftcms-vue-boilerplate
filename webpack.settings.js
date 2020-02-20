module.exports = {
  publicPath: process.env.PUBLIC_PATH || '/dist/',
  buildPath: process.env.PUBLIC_PATH || 'dist/',
  urls: {
    live: 'https://example.com/',
    local: 'http://localhost:8080/',
    critical: 'http://localhost:8080/',
  },
  criticalCssConfig: {
    base: './server/public/dist/css/',
    suffix: '_critical.min.css',
    criticalHeight: 1200,
    criticalWidth: 1200,
    ampPrefix: 'amp_',
    ampCriticalHeight: 19200,
    ampCriticalWidth: 600,
    pages: [
      {
        url: '',
        template: 'index'
      },
      {
        url: '',
        template: 'amp_index'
      }
    ]
  }
}
