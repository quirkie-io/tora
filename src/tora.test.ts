import { describe, it, expect } from 'vitest'
import tora from './tora'

const t = tora()

describe('tora', () => {
  it('keep it spinning while the main thread is blocked', () => {
    const sleepFor = 10 * 1000
    t.start('hello from tora')

    setTimeout(() => {
      t.success('yay')
    }, sleepFor / 2)

    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, sleepFor)
  })
})
