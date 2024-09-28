import ora, { type Spinner } from 'yocto-spinner'
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
    case 'info':
      spinner?.info(message.text)
      break
    case 'clear':
      spinner?.clear()
      break
    case 'setColor':
      if (!spinner) return

      spinner.color = message.color
      break
    case 'setText':
      if (!spinner) return

      spinner.text = message.text
      break
    case 'sync':
      process?.send?.({
        type: 'sync',
        instance: { isSpinning: spinner?.isSpinning, color: spinner?.color, text: spinner?.text },
      })
      break
  }
})
