const { spawn } = require('child_process')

module.exports = agent => {
  if (agent.config.env !== 'local') return
  spawn('npm run dev-web', {
    shell: true,
    stdio: 'inherit',
  })
}
