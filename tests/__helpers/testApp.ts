/// <reference path="../_setup.ts" />
import { join } from 'path'
import * as ts from 'typescript'
import { core } from '../../src'
const { generateSchema, typegenFormatPrettier } = core

type Settings = {
  rootDir: string
  name?: string
}

/**
 * Test that the given app can be built by TypeScript without any type errors.
 *
 * - Nexus generateSchema will be run before TypeScript to ensure typegen is present.
 * - By default looks for an `__app.ts` entrypoint
 * - All entrypoint exports are expected to be Nexus type definitions
 * - Except the optional export name "plugins" which is treated as an array of plugins for makeSchema
 * - The typegen module will be automatically included into the TypeScript build, no need to import it
 */
export const testApp = (settings: Settings) => {
  const name = settings?.name ?? 'app'
  const rootDir = settings.rootDir

  const typegenModulePath = join(rootDir, '__typegen.ts')
  const entrypointModulePath = join(rootDir, '__app.ts')

  const entrypoint = require(entrypointModulePath)
  const { plugins, ...types } = entrypoint

  beforeAll(async () => {
    await generateSchema({
      types: types,
      outputs: {
        typegen: typegenModulePath,
        schema: false,
      },
      shouldGenerateArtifacts: true,
      plugins: plugins || [],
      async formatTypegen(source, type) {
        const prettierConfigPath = require.resolve('../../.prettierrc')
        const content = await typegenFormatPrettier(prettierConfigPath)(source, type)

        return content.replace("'@nexus/schema'", "'../../..'")
      },
    })
  })

  it(`can compile ${name} app with its typegen`, async () => {
    expect([entrypointModulePath, typegenModulePath]).toTypeCheck({
      downlevelIteration: true,
      noEmitOnError: true,
      strict: true,
      target: ts.ScriptTarget.ES5,
      noErrorTruncation: false,
      outDir: `/tmp/nexus-integration-test-${Date.now()}`,
    })
  })
}
