import ora, { type Spinner, type Options } from 'yocto-spinner'
import type { Message } from './types'

let spinner: Spinner | null = null

process.on('message', (message: Message) => {
  switch (message.type) {
    case 'init':
      spinner = ora(message.options)
      break
    case 'start':
      spinner?.start(message.text)
      break
    case 'stop':
      spinner?.stop(message.text)
      break
    case 'success':
      spinner?.success(message.text)
      break
    case 'error':
      spinner?.error(message.text)
      break
    case 'warning':
      spinner?.warning(message.text)
      break
  }
})
