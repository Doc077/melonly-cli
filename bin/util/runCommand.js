const { execSync } = require('child_process')

const runCommand = (command) => {
    try {
        execSync(`${command}`, {
            stdio: 'pipe',
        })

        return true
    } catch (error) {
        console.error(error)

        return false
    }
}

exports.runCommand = runCommand
