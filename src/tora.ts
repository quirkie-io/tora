import childProcess from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import type { Message, ToraOptions } from './types'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class Tora {
  private static process: childProcess.ChildProcess

  constructor(options?: ToraOptions) {
    if (!Tora.process) {
      Tora.process = childProcess.fork(path.join(__dirname, 'worker.js'), [])
    }

    this.emit({ type: 'init', options })
  }

  start(text?: string) {
    return this.emit({ type: 'start', text })
  }

  stop(text?: string) {
    return this.emit({ type: 'stop', text })
  }

  success(text?: string) {
    return this.emit({ type: 'success', text })
  }

  error(text?: string) {
    return this.emit({ type: 'error', text })
  }

  warning(text?: string) {
    return this.emit({ type: 'warning', text })
  }

  emit(message: Message) {
    Tora.process.send(message)
  }
}

export default function tora(options?: ToraOptions) {
  return new Tora(options)
}
