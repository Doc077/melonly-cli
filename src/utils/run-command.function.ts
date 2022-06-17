import { execSync } from 'child_process'

export const runCommand = (command: string) => {
  try {
    execSync(command, {
      stdio: 'pipe',
    })

    return true
  } catch (error) {
    console.error(error)

    return false
  }
}
