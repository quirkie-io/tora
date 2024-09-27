import ora, { type Options } from 'yocto-spinner'
import type { ToraOptions } from './types'

export default function tora(options?: ToraOptions) {
  return ora(options)
}
