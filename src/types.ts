import type { Color, Options, Spinner } from 'yocto-spinner'

export type ToraOptions = Options
export type ToraSyncData = Pick<Spinner, 'isSpinning' | 'color' | 'text'>

type MessageInit = { type: 'init'; options?: ToraOptions }
type MessageNotification = { type: 'error' | 'start' | 'warning' | 'success' | 'stop' | 'info'; text?: string }
type MessageClear = { type: 'clear' }
type MessageSetColor = { type: 'setColor'; color: Color }
type MessageSetText = { type: 'setText'; text: string }
type MessageSync = { type: 'sync'; instance: ToraSyncData }

export type Message = MessageInit | MessageNotification | MessageClear | MessageSetColor | MessageSync | MessageSetText
