import { assertValidName, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
import { decorateType } from './decorateType'
import { NexusTypes, RootTypingDef, withNexusSymbol } from './_types'

export interface ScalarBase
  extends Pick<
    GraphQLScalarTypeConfig<any, any>,
    'description' | 'serialize' | 'parseValue' | 'parseLiteral'
  > {}

export interface ScalarConfig {
  /** Any deprecation info for this scalar type */
  deprecation?: string // | DeprecationInfo;
  /** Adds this type as a method on the Object/Interface definition blocks */
  asNexusMethod?: string
  /** Root type information for this type */
  rootTyping?: RootTypingDef
  /** Custom extensions, as supported in graphql-js */
  extensions?: GraphQLScalarTypeConfig<any, any>['extensions']
}

export interface NexusScalarTypeConfig<T extends string> extends ScalarBase, ScalarConfig {
  /** The name of the scalar type */
  name: T
}

export class NexusScalarTypeDef<TypeName extends string> {
  constructor(readonly name: TypeName, protected config: NexusScalarTypeConfig<string>) {
    assertValidName(name)
  }
  get value() {
    return this.config
  }
}

withNexusSymbol(NexusScalarTypeDef, NexusTypes.Scalar)

export function scalarType<TypeName extends string>(options: NexusScalarTypeConfig<TypeName>) {
  return new NexusScalarTypeDef(options.name, options)
}

export function asNexusMethod<T extends GraphQLScalarType>(
  scalar: T,
  methodName: string,
  rootTyping?: RootTypingDef
): T {
  return decorateType(scalar, {
    asNexusMethod: methodName,
    rootTyping: rootTyping,
  })
}
