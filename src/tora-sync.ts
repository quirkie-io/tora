import ora, { type Options } from 'yocto-spinner'
type ToraOptions = Options & { noThread: boolean }

export default function tora(options?: ToraOptions) {
  return ora(options)
}
