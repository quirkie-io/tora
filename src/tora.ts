import childProcess from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import type { Message, ToraOptions, ToraSyncData } from './types'
import type { Color, Spinner } from 'yocto-spinner'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class Tora {
  private static process: childProcess.ChildProcess | null = null
  private syncData: ToraSyncData

  terminate() {
    Tora.process?.kill()
  }

  constructor(options?: ToraOptions) {
    if (!Tora.process) {
      Tora.process = childProcess.fork(path.join(__dirname, 'worker.js'), [])
    }

    this.syncData = { isSpinning: false, color: 'black', text: 'black' }

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

  info(text?: string) {
    return this.emit({ type: 'info', text })
  }

  clear() {
    return this.emit({ type: 'clear' })
  }

  get color(): Color {
    return this.syncData?.color ?? 'black'
  }

  set color(value: Color) {
    this.emit({ type: 'setColor', color: value })
  }

  get text(): string {
    return this.syncData?.text ?? 'black'
  }

  set text(value: string) {
    this.emit({ type: 'setText', text: value })
  }

  get isSpinning(): boolean {
    return this.syncData?.isSpinning ?? false
  }

  emit(message: Message): Promise<void> {
    if (!Tora.process) {
      console.warn('Tora subprocess is not running')
    }

    if (message.type === 'init') {
      Tora.process?.send(message)
      return Promise.resolve()
    }

    return new Promise((resolve) => {
      Tora.process?.send(message)
      Tora.process?.send({ type: 'sync' })

      Tora.process?.once('message', (message: Message) => {
        if (message.type === 'sync') {
          this.syncData = message.instance
        }
        resolve()
      })
    })
  }
}

export default function tora(options?: ToraOptions) {
  return new Tora(options)
}
