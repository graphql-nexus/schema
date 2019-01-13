/**
 * This file is automatically generated by GraphQL Nexus
 * Do not make changes to this file directly
 * 
 * For better typings, you should provide configuration for how to lookup 
 * the types. See the documentation for "typegenAutoConfig"
 */


declare global {
  interface GraphQLNexusGen extends GraphQLNexusGenTypes {}
}

// Maybe Promise
export type MaybePromise<T> = T | PromiseLike<T>;

// Maybe Promise List
export type MaybePromiseList<T> = Array<MaybePromise<T>>;

// Maybe Thunk
export type MaybeThunk<T> = T | (() => T);

// Maybe Thunk, with args
export type MaybeThunkArgs<T, A> = T | ((args?: A) => T);

export type QueryBarReturnType = Bar_ReturnType;

export type Query_ReturnType = {
  bar: MaybeThunk<MaybePromise<any>>;
}

export type BarOkReturnType = boolean;

export type BazOkReturnType = boolean;

export type FooOkReturnType = boolean;

export interface FooRootType {
  ok: boolean;
}

export type Foo_ReturnType = {
  ok: MaybeThunk<MaybePromise<boolean>>;
}

export interface InputType {
  answer?: null | number;
  key: string;
}

export type BarRootType = FooRootType;

export type Bar_ReturnType = Foo_ReturnType;

export type BazRootType = FooRootType;

export type Baz_ReturnType = Foo_ReturnType;

export interface GraphQLNexusGenArgTypes {
}

export interface GraphQLNexusGenRootTypes {
  Bar: BarRootType;
  Baz: BazRootType;
  Query: {};
  Foo: FooRootType;
}

export interface GraphQLNexusGenReturnTypes {
  Query: {
    bar: QueryBarReturnType;
  };
  Bar: {
    ok: BarOkReturnType;
  };
  Baz: {
    ok: BazOkReturnType;
  };
  Foo: {
    ok: FooOkReturnType;
  };
}

export interface GraphQLNexusGenTypes {
  argTypes: GraphQLNexusGenArgTypes;
  backingTypes: GraphQLNexusGenRootTypes;
  returnTypes: GraphQLNexusGenReturnTypes;
  context: unknown;
  enums: {};
  objects: {
    Query: {};
    Foo: FooRootType;
  };
  interfaces: {
    Bar: "Foo";
    Baz: "Foo";
  };
  unions: {};
  scalars: {
    Boolean: any;
    String: any;
    Int: any;
  };
  inputObjects: {
    InputType: InputType;
  };
  allInputTypes: 
    | Extract<keyof GraphQLNexusGenTypes['inputObjects'], string>
    | Extract<keyof GraphQLNexusGenTypes['enums'], string>
    | Extract<keyof GraphQLNexusGenTypes['scalars'], string>;
  allOutputTypes: 
    | Extract<keyof GraphQLNexusGenTypes['objects'], string>
    | Extract<keyof GraphQLNexusGenTypes['enums'], string>
    | Extract<keyof GraphQLNexusGenTypes['unions'], string>
    | Extract<keyof GraphQLNexusGenTypes['interfaces'], string>
    | Extract<keyof GraphQLNexusGenTypes['scalars'], string>;
}

export type Gen = GraphQLNexusGenTypes;
