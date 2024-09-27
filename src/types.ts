import type { Options } from 'yocto-spinner'

export type ToraOptions = Options

type MessageInit = { type: 'init'; options?: ToraOptions }
type MessageNotification = { type: 'error' | 'start' | 'warning' | 'success' | 'stop'; text?: string }

export type Message = MessageInit | MessageNotification
