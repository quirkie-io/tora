import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { builtinModules, createRequire } from 'node:module'
import { normalize } from 'pathe'

const require = createRequire(import.meta.url)
const pkg = require('./package.json')

const plugins = [
  nodeResolve({
    preferBuiltins: true,
  }),
  json(),
  commonjs(),
  esbuild({
    target: 'node18',
  }),
]

const external = [
  ...builtinModules,
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
  'worker_threads',
  'node:worker_threads',
  'node:fs',
  'node:os',
  'node:stream',
  'node:vm',
  'inspector',
  'vite-node/source-map',
  'vite-node/client',
  'vite-node/server',
]

const entries = {
  index: 'src/tora.ts',
  toraSync: 'src/tora-sync.ts',
}

const dtsEntries = {
  index: 'src/tora.ts',
  toraSync: 'src/tora-sync.ts',
}

export default ({ watch }) =>
  defineConfig([
    {
      input: entries,

      treeshake: true,
      output: {
        dir: 'dist',
        format: 'esm',
        chunkFileNames: 'chunks/[name].[hash].js',
      },
      external,
      plugins: [...plugins],
      onwarn,
    },
    {
      input: 'src/worker.ts',
      output: [
        {
          file: 'dist/worker.js',
          format: 'esm',
        },
      ],
      external,
      plugins,
    },
    {
      input: dtsEntries,
      output: {
        dir: 'dist',
        entryFileNames: (chunk) => `${normalize(chunk.name).replace('src/', '')}.d.ts`,
        format: 'esm',
        chunkFileNames: 'chunks/[name].[hash].d.ts',
      },
      external,
      plugins: [dts({ respectExternal: true })],
    },
  ])

function onwarn(message) {
  if (['EMPTY_BUNDLE', 'CIRCULAR_DEPENDENCY'].includes(message.code)) {
    return
  }
  console.error(message)
}
