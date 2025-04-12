
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Vendor
 * 
 */
export type Vendor = $Result.DefaultSelection<Prisma.$VendorPayload>
/**
 * Model VendorType
 * 
 */
export type VendorType = $Result.DefaultSelection<Prisma.$VendorTypePayload>
/**
 * Model VendorTypeRelation
 * 
 */
export type VendorTypeRelation = $Result.DefaultSelection<Prisma.$VendorTypeRelationPayload>
/**
 * Model Favourite
 * 
 */
export type Favourite = $Result.DefaultSelection<Prisma.$FavouritePayload>
/**
 * Model LowStockReport
 * 
 */
export type LowStockReport = $Result.DefaultSelection<Prisma.$LowStockReportPayload>
/**
 * Model SubmittedVendor
 * 
 */
export type SubmittedVendor = $Result.DefaultSelection<Prisma.$SubmittedVendorPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vendor`: Exposes CRUD operations for the **Vendor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vendors
    * const vendors = await prisma.vendor.findMany()
    * ```
    */
  get vendor(): Prisma.VendorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vendorType`: Exposes CRUD operations for the **VendorType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VendorTypes
    * const vendorTypes = await prisma.vendorType.findMany()
    * ```
    */
  get vendorType(): Prisma.VendorTypeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vendorTypeRelation`: Exposes CRUD operations for the **VendorTypeRelation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VendorTypeRelations
    * const vendorTypeRelations = await prisma.vendorTypeRelation.findMany()
    * ```
    */
  get vendorTypeRelation(): Prisma.VendorTypeRelationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.favourite`: Exposes CRUD operations for the **Favourite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Favourites
    * const favourites = await prisma.favourite.findMany()
    * ```
    */
  get favourite(): Prisma.FavouriteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lowStockReport`: Exposes CRUD operations for the **LowStockReport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LowStockReports
    * const lowStockReports = await prisma.lowStockReport.findMany()
    * ```
    */
  get lowStockReport(): Prisma.LowStockReportDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.submittedVendor`: Exposes CRUD operations for the **SubmittedVendor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SubmittedVendors
    * const submittedVendors = await prisma.submittedVendor.findMany()
    * ```
    */
  get submittedVendor(): Prisma.SubmittedVendorDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Vendor: 'Vendor',
    VendorType: 'VendorType',
    VendorTypeRelation: 'VendorTypeRelation',
    Favourite: 'Favourite',
    LowStockReport: 'LowStockReport',
    SubmittedVendor: 'SubmittedVendor'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "vendor" | "vendorType" | "vendorTypeRelation" | "favourite" | "lowStockReport" | "submittedVendor"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Vendor: {
        payload: Prisma.$VendorPayload<ExtArgs>
        fields: Prisma.VendorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VendorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VendorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          findFirst: {
            args: Prisma.VendorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VendorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          findMany: {
            args: Prisma.VendorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>[]
          }
          create: {
            args: Prisma.VendorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          createMany: {
            args: Prisma.VendorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VendorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>[]
          }
          delete: {
            args: Prisma.VendorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          update: {
            args: Prisma.VendorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          deleteMany: {
            args: Prisma.VendorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VendorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VendorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>[]
          }
          upsert: {
            args: Prisma.VendorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          aggregate: {
            args: Prisma.VendorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVendor>
          }
          groupBy: {
            args: Prisma.VendorGroupByArgs<ExtArgs>
            result: $Utils.Optional<VendorGroupByOutputType>[]
          }
          count: {
            args: Prisma.VendorCountArgs<ExtArgs>
            result: $Utils.Optional<VendorCountAggregateOutputType> | number
          }
        }
      }
      VendorType: {
        payload: Prisma.$VendorTypePayload<ExtArgs>
        fields: Prisma.VendorTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VendorTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VendorTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorTypePayload>
          }
          findFirst: {
            args: Prisma.VendorTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VendorTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorTypePayload>
          }
          findMany: {
            args: Prisma.VendorTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorTypePayload>[]
          }
          create: {
            args: Prisma.VendorTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorTypePayload>
          }
          createMany: {
            args: Prisma.VendorTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VendorTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorTypePayload>[]
          }
          delete: {
            args: Prisma.VendorTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorTypePayload>
          }
          update: {
            args: Prisma.VendorTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorTypePayload>
          }
          deleteMany: {
            args: Prisma.VendorTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VendorTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VendorTypeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorTypePayload>[]
          }
          upsert: {
            args: Prisma.VendorTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorTypePayload>
          }
          aggregate: {
            args: Prisma.VendorTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVendorType>
          }
          groupBy: {
            args: Prisma.VendorTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<VendorTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.VendorTypeCountArgs<ExtArgs>
            result: $Utils.Optional<VendorTypeCountAggregateOutputType> | number
          }
        }
      }
      VendorTypeRelation: {
        payload: Prisma.$VendorTypeRelationPayload<ExtArgs>
        fields: Prisma.VendorTypeRelationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VendorTypeRelationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorTypeRelationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VendorTypeRelationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorTypeRelationPayload>
          }
          findFirst: {
            args: Prisma.VendorTypeRelationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorTypeRelationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VendorTypeRelationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorTypeRelationPayload>
          }
          findMany: {
            args: Prisma.VendorTypeRelationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorTypeRelationPayload>[]
          }
          create: {
            args: Prisma.VendorTypeRelationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorTypeRelationPayload>
          }
          createMany: {
            args: Prisma.VendorTypeRelationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VendorTypeRelationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorTypeRelationPayload>[]
          }
          delete: {
            args: Prisma.VendorTypeRelationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorTypeRelationPayload>
          }
          update: {
            args: Prisma.VendorTypeRelationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorTypeRelationPayload>
          }
          deleteMany: {
            args: Prisma.VendorTypeRelationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VendorTypeRelationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VendorTypeRelationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorTypeRelationPayload>[]
          }
          upsert: {
            args: Prisma.VendorTypeRelationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorTypeRelationPayload>
          }
          aggregate: {
            args: Prisma.VendorTypeRelationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVendorTypeRelation>
          }
          groupBy: {
            args: Prisma.VendorTypeRelationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VendorTypeRelationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VendorTypeRelationCountArgs<ExtArgs>
            result: $Utils.Optional<VendorTypeRelationCountAggregateOutputType> | number
          }
        }
      }
      Favourite: {
        payload: Prisma.$FavouritePayload<ExtArgs>
        fields: Prisma.FavouriteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FavouriteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavouritePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FavouriteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavouritePayload>
          }
          findFirst: {
            args: Prisma.FavouriteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavouritePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FavouriteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavouritePayload>
          }
          findMany: {
            args: Prisma.FavouriteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavouritePayload>[]
          }
          create: {
            args: Prisma.FavouriteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavouritePayload>
          }
          createMany: {
            args: Prisma.FavouriteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FavouriteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavouritePayload>[]
          }
          delete: {
            args: Prisma.FavouriteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavouritePayload>
          }
          update: {
            args: Prisma.FavouriteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavouritePayload>
          }
          deleteMany: {
            args: Prisma.FavouriteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FavouriteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FavouriteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavouritePayload>[]
          }
          upsert: {
            args: Prisma.FavouriteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavouritePayload>
          }
          aggregate: {
            args: Prisma.FavouriteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFavourite>
          }
          groupBy: {
            args: Prisma.FavouriteGroupByArgs<ExtArgs>
            result: $Utils.Optional<FavouriteGroupByOutputType>[]
          }
          count: {
            args: Prisma.FavouriteCountArgs<ExtArgs>
            result: $Utils.Optional<FavouriteCountAggregateOutputType> | number
          }
        }
      }
      LowStockReport: {
        payload: Prisma.$LowStockReportPayload<ExtArgs>
        fields: Prisma.LowStockReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LowStockReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LowStockReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LowStockReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LowStockReportPayload>
          }
          findFirst: {
            args: Prisma.LowStockReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LowStockReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LowStockReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LowStockReportPayload>
          }
          findMany: {
            args: Prisma.LowStockReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LowStockReportPayload>[]
          }
          create: {
            args: Prisma.LowStockReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LowStockReportPayload>
          }
          createMany: {
            args: Prisma.LowStockReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LowStockReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LowStockReportPayload>[]
          }
          delete: {
            args: Prisma.LowStockReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LowStockReportPayload>
          }
          update: {
            args: Prisma.LowStockReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LowStockReportPayload>
          }
          deleteMany: {
            args: Prisma.LowStockReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LowStockReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LowStockReportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LowStockReportPayload>[]
          }
          upsert: {
            args: Prisma.LowStockReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LowStockReportPayload>
          }
          aggregate: {
            args: Prisma.LowStockReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLowStockReport>
          }
          groupBy: {
            args: Prisma.LowStockReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<LowStockReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.LowStockReportCountArgs<ExtArgs>
            result: $Utils.Optional<LowStockReportCountAggregateOutputType> | number
          }
        }
      }
      SubmittedVendor: {
        payload: Prisma.$SubmittedVendorPayload<ExtArgs>
        fields: Prisma.SubmittedVendorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubmittedVendorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmittedVendorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubmittedVendorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmittedVendorPayload>
          }
          findFirst: {
            args: Prisma.SubmittedVendorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmittedVendorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubmittedVendorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmittedVendorPayload>
          }
          findMany: {
            args: Prisma.SubmittedVendorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmittedVendorPayload>[]
          }
          create: {
            args: Prisma.SubmittedVendorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmittedVendorPayload>
          }
          createMany: {
            args: Prisma.SubmittedVendorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubmittedVendorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmittedVendorPayload>[]
          }
          delete: {
            args: Prisma.SubmittedVendorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmittedVendorPayload>
          }
          update: {
            args: Prisma.SubmittedVendorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmittedVendorPayload>
          }
          deleteMany: {
            args: Prisma.SubmittedVendorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubmittedVendorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubmittedVendorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmittedVendorPayload>[]
          }
          upsert: {
            args: Prisma.SubmittedVendorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmittedVendorPayload>
          }
          aggregate: {
            args: Prisma.SubmittedVendorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubmittedVendor>
          }
          groupBy: {
            args: Prisma.SubmittedVendorGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubmittedVendorGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubmittedVendorCountArgs<ExtArgs>
            result: $Utils.Optional<SubmittedVendorCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    vendor?: VendorOmit
    vendorType?: VendorTypeOmit
    vendorTypeRelation?: VendorTypeRelationOmit
    favourite?: FavouriteOmit
    lowStockReport?: LowStockReportOmit
    submittedVendor?: SubmittedVendorOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    submittedVendors: number
    favouriteVendors: number
    lowStockReports: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submittedVendors?: boolean | UserCountOutputTypeCountSubmittedVendorsArgs
    favouriteVendors?: boolean | UserCountOutputTypeCountFavouriteVendorsArgs
    lowStockReports?: boolean | UserCountOutputTypeCountLowStockReportsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSubmittedVendorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmittedVendorWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFavouriteVendorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavouriteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLowStockReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LowStockReportWhereInput
  }


  /**
   * Count Type VendorCountOutputType
   */

  export type VendorCountOutputType = {
    vendorTypes: number
    favourites: number
    lowStockReports: number
  }

  export type VendorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendorTypes?: boolean | VendorCountOutputTypeCountVendorTypesArgs
    favourites?: boolean | VendorCountOutputTypeCountFavouritesArgs
    lowStockReports?: boolean | VendorCountOutputTypeCountLowStockReportsArgs
  }

  // Custom InputTypes
  /**
   * VendorCountOutputType without action
   */
  export type VendorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorCountOutputType
     */
    select?: VendorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VendorCountOutputType without action
   */
  export type VendorCountOutputTypeCountVendorTypesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendorTypeRelationWhereInput
  }

  /**
   * VendorCountOutputType without action
   */
  export type VendorCountOutputTypeCountFavouritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavouriteWhereInput
  }

  /**
   * VendorCountOutputType without action
   */
  export type VendorCountOutputTypeCountLowStockReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LowStockReportWhereInput
  }


  /**
   * Count Type VendorTypeCountOutputType
   */

  export type VendorTypeCountOutputType = {
    vendors: number
  }

  export type VendorTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendors?: boolean | VendorTypeCountOutputTypeCountVendorsArgs
  }

  // Custom InputTypes
  /**
   * VendorTypeCountOutputType without action
   */
  export type VendorTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorTypeCountOutputType
     */
    select?: VendorTypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VendorTypeCountOutputType without action
   */
  export type VendorTypeCountOutputTypeCountVendorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendorTypeRelationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    password: string
    name: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    submittedVendors?: boolean | User$submittedVendorsArgs<ExtArgs>
    favouriteVendors?: boolean | User$favouriteVendorsArgs<ExtArgs>
    lowStockReports?: boolean | User$lowStockReportsArgs<ExtArgs>
    ownedVendor?: boolean | User$ownedVendorArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submittedVendors?: boolean | User$submittedVendorsArgs<ExtArgs>
    favouriteVendors?: boolean | User$favouriteVendorsArgs<ExtArgs>
    lowStockReports?: boolean | User$lowStockReportsArgs<ExtArgs>
    ownedVendor?: boolean | User$ownedVendorArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      submittedVendors: Prisma.$SubmittedVendorPayload<ExtArgs>[]
      favouriteVendors: Prisma.$FavouritePayload<ExtArgs>[]
      lowStockReports: Prisma.$LowStockReportPayload<ExtArgs>[]
      ownedVendor: Prisma.$VendorPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password: string
      name: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    submittedVendors<T extends User$submittedVendorsArgs<ExtArgs> = {}>(args?: Subset<T, User$submittedVendorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmittedVendorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    favouriteVendors<T extends User$favouriteVendorsArgs<ExtArgs> = {}>(args?: Subset<T, User$favouriteVendorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavouritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    lowStockReports<T extends User$lowStockReportsArgs<ExtArgs> = {}>(args?: Subset<T, User$lowStockReportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LowStockReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ownedVendor<T extends User$ownedVendorArgs<ExtArgs> = {}>(args?: Subset<T, User$ownedVendorArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.submittedVendors
   */
  export type User$submittedVendorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmittedVendor
     */
    select?: SubmittedVendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmittedVendor
     */
    omit?: SubmittedVendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmittedVendorInclude<ExtArgs> | null
    where?: SubmittedVendorWhereInput
    orderBy?: SubmittedVendorOrderByWithRelationInput | SubmittedVendorOrderByWithRelationInput[]
    cursor?: SubmittedVendorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubmittedVendorScalarFieldEnum | SubmittedVendorScalarFieldEnum[]
  }

  /**
   * User.favouriteVendors
   */
  export type User$favouriteVendorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favourite
     */
    select?: FavouriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favourite
     */
    omit?: FavouriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavouriteInclude<ExtArgs> | null
    where?: FavouriteWhereInput
    orderBy?: FavouriteOrderByWithRelationInput | FavouriteOrderByWithRelationInput[]
    cursor?: FavouriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FavouriteScalarFieldEnum | FavouriteScalarFieldEnum[]
  }

  /**
   * User.lowStockReports
   */
  export type User$lowStockReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LowStockReport
     */
    select?: LowStockReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LowStockReport
     */
    omit?: LowStockReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LowStockReportInclude<ExtArgs> | null
    where?: LowStockReportWhereInput
    orderBy?: LowStockReportOrderByWithRelationInput | LowStockReportOrderByWithRelationInput[]
    cursor?: LowStockReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LowStockReportScalarFieldEnum | LowStockReportScalarFieldEnum[]
  }

  /**
   * User.ownedVendor
   */
  export type User$ownedVendorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    where?: VendorWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Vendor
   */

  export type AggregateVendor = {
    _count: VendorCountAggregateOutputType | null
    _avg: VendorAvgAggregateOutputType | null
    _sum: VendorSumAggregateOutputType | null
    _min: VendorMinAggregateOutputType | null
    _max: VendorMaxAggregateOutputType | null
  }

  export type VendorAvgAggregateOutputType = {
    id: number | null
    ownerId: number | null
  }

  export type VendorSumAggregateOutputType = {
    id: number | null
    ownerId: number | null
  }

  export type VendorMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    isVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    ownerId: number | null
  }

  export type VendorMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    isVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    ownerId: number | null
  }

  export type VendorCountAggregateOutputType = {
    id: number
    name: number
    description: number
    hours: number
    isVerified: number
    photos: number
    paymentMethods: number
    createdAt: number
    updatedAt: number
    ownerId: number
    _all: number
  }


  export type VendorAvgAggregateInputType = {
    id?: true
    ownerId?: true
  }

  export type VendorSumAggregateInputType = {
    id?: true
    ownerId?: true
  }

  export type VendorMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
  }

  export type VendorMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
  }

  export type VendorCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    hours?: true
    isVerified?: true
    photos?: true
    paymentMethods?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
    _all?: true
  }

  export type VendorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vendor to aggregate.
     */
    where?: VendorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendors to fetch.
     */
    orderBy?: VendorOrderByWithRelationInput | VendorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VendorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vendors
    **/
    _count?: true | VendorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VendorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VendorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VendorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VendorMaxAggregateInputType
  }

  export type GetVendorAggregateType<T extends VendorAggregateArgs> = {
        [P in keyof T & keyof AggregateVendor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVendor[P]>
      : GetScalarType<T[P], AggregateVendor[P]>
  }




  export type VendorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendorWhereInput
    orderBy?: VendorOrderByWithAggregationInput | VendorOrderByWithAggregationInput[]
    by: VendorScalarFieldEnum[] | VendorScalarFieldEnum
    having?: VendorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VendorCountAggregateInputType | true
    _avg?: VendorAvgAggregateInputType
    _sum?: VendorSumAggregateInputType
    _min?: VendorMinAggregateInputType
    _max?: VendorMaxAggregateInputType
  }

  export type VendorGroupByOutputType = {
    id: number
    name: string
    description: string | null
    hours: JsonValue | null
    isVerified: boolean
    photos: JsonValue | null
    paymentMethods: JsonValue | null
    createdAt: Date
    updatedAt: Date
    ownerId: number | null
    _count: VendorCountAggregateOutputType | null
    _avg: VendorAvgAggregateOutputType | null
    _sum: VendorSumAggregateOutputType | null
    _min: VendorMinAggregateOutputType | null
    _max: VendorMaxAggregateOutputType | null
  }

  type GetVendorGroupByPayload<T extends VendorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VendorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VendorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VendorGroupByOutputType[P]>
            : GetScalarType<T[P], VendorGroupByOutputType[P]>
        }
      >
    >


  export type VendorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    hours?: boolean
    isVerified?: boolean
    photos?: boolean
    paymentMethods?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    owner?: boolean | Vendor$ownerArgs<ExtArgs>
    vendorTypes?: boolean | Vendor$vendorTypesArgs<ExtArgs>
    favourites?: boolean | Vendor$favouritesArgs<ExtArgs>
    lowStockReports?: boolean | Vendor$lowStockReportsArgs<ExtArgs>
    _count?: boolean | VendorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendor"]>

  export type VendorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    hours?: boolean
    isVerified?: boolean
    photos?: boolean
    paymentMethods?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    owner?: boolean | Vendor$ownerArgs<ExtArgs>
  }, ExtArgs["result"]["vendor"]>

  export type VendorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    hours?: boolean
    isVerified?: boolean
    photos?: boolean
    paymentMethods?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    owner?: boolean | Vendor$ownerArgs<ExtArgs>
  }, ExtArgs["result"]["vendor"]>

  export type VendorSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    hours?: boolean
    isVerified?: boolean
    photos?: boolean
    paymentMethods?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
  }

  export type VendorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "hours" | "isVerified" | "photos" | "paymentMethods" | "createdAt" | "updatedAt" | "ownerId", ExtArgs["result"]["vendor"]>
  export type VendorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | Vendor$ownerArgs<ExtArgs>
    vendorTypes?: boolean | Vendor$vendorTypesArgs<ExtArgs>
    favourites?: boolean | Vendor$favouritesArgs<ExtArgs>
    lowStockReports?: boolean | Vendor$lowStockReportsArgs<ExtArgs>
    _count?: boolean | VendorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VendorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | Vendor$ownerArgs<ExtArgs>
  }
  export type VendorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | Vendor$ownerArgs<ExtArgs>
  }

  export type $VendorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vendor"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs> | null
      vendorTypes: Prisma.$VendorTypeRelationPayload<ExtArgs>[]
      favourites: Prisma.$FavouritePayload<ExtArgs>[]
      lowStockReports: Prisma.$LowStockReportPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      hours: Prisma.JsonValue | null
      isVerified: boolean
      photos: Prisma.JsonValue | null
      paymentMethods: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
      ownerId: number | null
    }, ExtArgs["result"]["vendor"]>
    composites: {}
  }

  type VendorGetPayload<S extends boolean | null | undefined | VendorDefaultArgs> = $Result.GetResult<Prisma.$VendorPayload, S>

  type VendorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VendorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VendorCountAggregateInputType | true
    }

  export interface VendorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vendor'], meta: { name: 'Vendor' } }
    /**
     * Find zero or one Vendor that matches the filter.
     * @param {VendorFindUniqueArgs} args - Arguments to find a Vendor
     * @example
     * // Get one Vendor
     * const vendor = await prisma.vendor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VendorFindUniqueArgs>(args: SelectSubset<T, VendorFindUniqueArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vendor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VendorFindUniqueOrThrowArgs} args - Arguments to find a Vendor
     * @example
     * // Get one Vendor
     * const vendor = await prisma.vendor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VendorFindUniqueOrThrowArgs>(args: SelectSubset<T, VendorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vendor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorFindFirstArgs} args - Arguments to find a Vendor
     * @example
     * // Get one Vendor
     * const vendor = await prisma.vendor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VendorFindFirstArgs>(args?: SelectSubset<T, VendorFindFirstArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vendor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorFindFirstOrThrowArgs} args - Arguments to find a Vendor
     * @example
     * // Get one Vendor
     * const vendor = await prisma.vendor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VendorFindFirstOrThrowArgs>(args?: SelectSubset<T, VendorFindFirstOrThrowArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vendors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vendors
     * const vendors = await prisma.vendor.findMany()
     * 
     * // Get first 10 Vendors
     * const vendors = await prisma.vendor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vendorWithIdOnly = await prisma.vendor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VendorFindManyArgs>(args?: SelectSubset<T, VendorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vendor.
     * @param {VendorCreateArgs} args - Arguments to create a Vendor.
     * @example
     * // Create one Vendor
     * const Vendor = await prisma.vendor.create({
     *   data: {
     *     // ... data to create a Vendor
     *   }
     * })
     * 
     */
    create<T extends VendorCreateArgs>(args: SelectSubset<T, VendorCreateArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vendors.
     * @param {VendorCreateManyArgs} args - Arguments to create many Vendors.
     * @example
     * // Create many Vendors
     * const vendor = await prisma.vendor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VendorCreateManyArgs>(args?: SelectSubset<T, VendorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vendors and returns the data saved in the database.
     * @param {VendorCreateManyAndReturnArgs} args - Arguments to create many Vendors.
     * @example
     * // Create many Vendors
     * const vendor = await prisma.vendor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vendors and only return the `id`
     * const vendorWithIdOnly = await prisma.vendor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VendorCreateManyAndReturnArgs>(args?: SelectSubset<T, VendorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vendor.
     * @param {VendorDeleteArgs} args - Arguments to delete one Vendor.
     * @example
     * // Delete one Vendor
     * const Vendor = await prisma.vendor.delete({
     *   where: {
     *     // ... filter to delete one Vendor
     *   }
     * })
     * 
     */
    delete<T extends VendorDeleteArgs>(args: SelectSubset<T, VendorDeleteArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vendor.
     * @param {VendorUpdateArgs} args - Arguments to update one Vendor.
     * @example
     * // Update one Vendor
     * const vendor = await prisma.vendor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VendorUpdateArgs>(args: SelectSubset<T, VendorUpdateArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vendors.
     * @param {VendorDeleteManyArgs} args - Arguments to filter Vendors to delete.
     * @example
     * // Delete a few Vendors
     * const { count } = await prisma.vendor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VendorDeleteManyArgs>(args?: SelectSubset<T, VendorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vendors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vendors
     * const vendor = await prisma.vendor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VendorUpdateManyArgs>(args: SelectSubset<T, VendorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vendors and returns the data updated in the database.
     * @param {VendorUpdateManyAndReturnArgs} args - Arguments to update many Vendors.
     * @example
     * // Update many Vendors
     * const vendor = await prisma.vendor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vendors and only return the `id`
     * const vendorWithIdOnly = await prisma.vendor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VendorUpdateManyAndReturnArgs>(args: SelectSubset<T, VendorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vendor.
     * @param {VendorUpsertArgs} args - Arguments to update or create a Vendor.
     * @example
     * // Update or create a Vendor
     * const vendor = await prisma.vendor.upsert({
     *   create: {
     *     // ... data to create a Vendor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vendor we want to update
     *   }
     * })
     */
    upsert<T extends VendorUpsertArgs>(args: SelectSubset<T, VendorUpsertArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vendors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorCountArgs} args - Arguments to filter Vendors to count.
     * @example
     * // Count the number of Vendors
     * const count = await prisma.vendor.count({
     *   where: {
     *     // ... the filter for the Vendors we want to count
     *   }
     * })
    **/
    count<T extends VendorCountArgs>(
      args?: Subset<T, VendorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VendorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vendor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VendorAggregateArgs>(args: Subset<T, VendorAggregateArgs>): Prisma.PrismaPromise<GetVendorAggregateType<T>>

    /**
     * Group by Vendor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VendorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VendorGroupByArgs['orderBy'] }
        : { orderBy?: VendorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VendorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVendorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vendor model
   */
  readonly fields: VendorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vendor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VendorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends Vendor$ownerArgs<ExtArgs> = {}>(args?: Subset<T, Vendor$ownerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    vendorTypes<T extends Vendor$vendorTypesArgs<ExtArgs> = {}>(args?: Subset<T, Vendor$vendorTypesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorTypeRelationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    favourites<T extends Vendor$favouritesArgs<ExtArgs> = {}>(args?: Subset<T, Vendor$favouritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavouritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    lowStockReports<T extends Vendor$lowStockReportsArgs<ExtArgs> = {}>(args?: Subset<T, Vendor$lowStockReportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LowStockReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vendor model
   */
  interface VendorFieldRefs {
    readonly id: FieldRef<"Vendor", 'Int'>
    readonly name: FieldRef<"Vendor", 'String'>
    readonly description: FieldRef<"Vendor", 'String'>
    readonly hours: FieldRef<"Vendor", 'Json'>
    readonly isVerified: FieldRef<"Vendor", 'Boolean'>
    readonly photos: FieldRef<"Vendor", 'Json'>
    readonly paymentMethods: FieldRef<"Vendor", 'Json'>
    readonly createdAt: FieldRef<"Vendor", 'DateTime'>
    readonly updatedAt: FieldRef<"Vendor", 'DateTime'>
    readonly ownerId: FieldRef<"Vendor", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Vendor findUnique
   */
  export type VendorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * Filter, which Vendor to fetch.
     */
    where: VendorWhereUniqueInput
  }

  /**
   * Vendor findUniqueOrThrow
   */
  export type VendorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * Filter, which Vendor to fetch.
     */
    where: VendorWhereUniqueInput
  }

  /**
   * Vendor findFirst
   */
  export type VendorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * Filter, which Vendor to fetch.
     */
    where?: VendorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendors to fetch.
     */
    orderBy?: VendorOrderByWithRelationInput | VendorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vendors.
     */
    cursor?: VendorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vendors.
     */
    distinct?: VendorScalarFieldEnum | VendorScalarFieldEnum[]
  }

  /**
   * Vendor findFirstOrThrow
   */
  export type VendorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * Filter, which Vendor to fetch.
     */
    where?: VendorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendors to fetch.
     */
    orderBy?: VendorOrderByWithRelationInput | VendorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vendors.
     */
    cursor?: VendorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vendors.
     */
    distinct?: VendorScalarFieldEnum | VendorScalarFieldEnum[]
  }

  /**
   * Vendor findMany
   */
  export type VendorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * Filter, which Vendors to fetch.
     */
    where?: VendorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendors to fetch.
     */
    orderBy?: VendorOrderByWithRelationInput | VendorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vendors.
     */
    cursor?: VendorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendors.
     */
    skip?: number
    distinct?: VendorScalarFieldEnum | VendorScalarFieldEnum[]
  }

  /**
   * Vendor create
   */
  export type VendorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * The data needed to create a Vendor.
     */
    data: XOR<VendorCreateInput, VendorUncheckedCreateInput>
  }

  /**
   * Vendor createMany
   */
  export type VendorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vendors.
     */
    data: VendorCreateManyInput | VendorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vendor createManyAndReturn
   */
  export type VendorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * The data used to create many Vendors.
     */
    data: VendorCreateManyInput | VendorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vendor update
   */
  export type VendorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * The data needed to update a Vendor.
     */
    data: XOR<VendorUpdateInput, VendorUncheckedUpdateInput>
    /**
     * Choose, which Vendor to update.
     */
    where: VendorWhereUniqueInput
  }

  /**
   * Vendor updateMany
   */
  export type VendorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vendors.
     */
    data: XOR<VendorUpdateManyMutationInput, VendorUncheckedUpdateManyInput>
    /**
     * Filter which Vendors to update
     */
    where?: VendorWhereInput
    /**
     * Limit how many Vendors to update.
     */
    limit?: number
  }

  /**
   * Vendor updateManyAndReturn
   */
  export type VendorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * The data used to update Vendors.
     */
    data: XOR<VendorUpdateManyMutationInput, VendorUncheckedUpdateManyInput>
    /**
     * Filter which Vendors to update
     */
    where?: VendorWhereInput
    /**
     * Limit how many Vendors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vendor upsert
   */
  export type VendorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * The filter to search for the Vendor to update in case it exists.
     */
    where: VendorWhereUniqueInput
    /**
     * In case the Vendor found by the `where` argument doesn't exist, create a new Vendor with this data.
     */
    create: XOR<VendorCreateInput, VendorUncheckedCreateInput>
    /**
     * In case the Vendor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VendorUpdateInput, VendorUncheckedUpdateInput>
  }

  /**
   * Vendor delete
   */
  export type VendorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * Filter which Vendor to delete.
     */
    where: VendorWhereUniqueInput
  }

  /**
   * Vendor deleteMany
   */
  export type VendorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vendors to delete
     */
    where?: VendorWhereInput
    /**
     * Limit how many Vendors to delete.
     */
    limit?: number
  }

  /**
   * Vendor.owner
   */
  export type Vendor$ownerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Vendor.vendorTypes
   */
  export type Vendor$vendorTypesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorTypeRelation
     */
    select?: VendorTypeRelationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorTypeRelation
     */
    omit?: VendorTypeRelationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorTypeRelationInclude<ExtArgs> | null
    where?: VendorTypeRelationWhereInput
    orderBy?: VendorTypeRelationOrderByWithRelationInput | VendorTypeRelationOrderByWithRelationInput[]
    cursor?: VendorTypeRelationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VendorTypeRelationScalarFieldEnum | VendorTypeRelationScalarFieldEnum[]
  }

  /**
   * Vendor.favourites
   */
  export type Vendor$favouritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favourite
     */
    select?: FavouriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favourite
     */
    omit?: FavouriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavouriteInclude<ExtArgs> | null
    where?: FavouriteWhereInput
    orderBy?: FavouriteOrderByWithRelationInput | FavouriteOrderByWithRelationInput[]
    cursor?: FavouriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FavouriteScalarFieldEnum | FavouriteScalarFieldEnum[]
  }

  /**
   * Vendor.lowStockReports
   */
  export type Vendor$lowStockReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LowStockReport
     */
    select?: LowStockReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LowStockReport
     */
    omit?: LowStockReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LowStockReportInclude<ExtArgs> | null
    where?: LowStockReportWhereInput
    orderBy?: LowStockReportOrderByWithRelationInput | LowStockReportOrderByWithRelationInput[]
    cursor?: LowStockReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LowStockReportScalarFieldEnum | LowStockReportScalarFieldEnum[]
  }

  /**
   * Vendor without action
   */
  export type VendorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
  }


  /**
   * Model VendorType
   */

  export type AggregateVendorType = {
    _count: VendorTypeCountAggregateOutputType | null
    _avg: VendorTypeAvgAggregateOutputType | null
    _sum: VendorTypeSumAggregateOutputType | null
    _min: VendorTypeMinAggregateOutputType | null
    _max: VendorTypeMaxAggregateOutputType | null
  }

  export type VendorTypeAvgAggregateOutputType = {
    id: number | null
  }

  export type VendorTypeSumAggregateOutputType = {
    id: number | null
  }

  export type VendorTypeMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type VendorTypeMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type VendorTypeCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type VendorTypeAvgAggregateInputType = {
    id?: true
  }

  export type VendorTypeSumAggregateInputType = {
    id?: true
  }

  export type VendorTypeMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type VendorTypeMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type VendorTypeCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type VendorTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VendorType to aggregate.
     */
    where?: VendorTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendorTypes to fetch.
     */
    orderBy?: VendorTypeOrderByWithRelationInput | VendorTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VendorTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendorTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendorTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VendorTypes
    **/
    _count?: true | VendorTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VendorTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VendorTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VendorTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VendorTypeMaxAggregateInputType
  }

  export type GetVendorTypeAggregateType<T extends VendorTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateVendorType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVendorType[P]>
      : GetScalarType<T[P], AggregateVendorType[P]>
  }




  export type VendorTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendorTypeWhereInput
    orderBy?: VendorTypeOrderByWithAggregationInput | VendorTypeOrderByWithAggregationInput[]
    by: VendorTypeScalarFieldEnum[] | VendorTypeScalarFieldEnum
    having?: VendorTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VendorTypeCountAggregateInputType | true
    _avg?: VendorTypeAvgAggregateInputType
    _sum?: VendorTypeSumAggregateInputType
    _min?: VendorTypeMinAggregateInputType
    _max?: VendorTypeMaxAggregateInputType
  }

  export type VendorTypeGroupByOutputType = {
    id: number
    name: string
    _count: VendorTypeCountAggregateOutputType | null
    _avg: VendorTypeAvgAggregateOutputType | null
    _sum: VendorTypeSumAggregateOutputType | null
    _min: VendorTypeMinAggregateOutputType | null
    _max: VendorTypeMaxAggregateOutputType | null
  }

  type GetVendorTypeGroupByPayload<T extends VendorTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VendorTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VendorTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VendorTypeGroupByOutputType[P]>
            : GetScalarType<T[P], VendorTypeGroupByOutputType[P]>
        }
      >
    >


  export type VendorTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    vendors?: boolean | VendorType$vendorsArgs<ExtArgs>
    _count?: boolean | VendorTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendorType"]>

  export type VendorTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["vendorType"]>

  export type VendorTypeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["vendorType"]>

  export type VendorTypeSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type VendorTypeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["vendorType"]>
  export type VendorTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendors?: boolean | VendorType$vendorsArgs<ExtArgs>
    _count?: boolean | VendorTypeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VendorTypeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type VendorTypeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $VendorTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VendorType"
    objects: {
      vendors: Prisma.$VendorTypeRelationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["vendorType"]>
    composites: {}
  }

  type VendorTypeGetPayload<S extends boolean | null | undefined | VendorTypeDefaultArgs> = $Result.GetResult<Prisma.$VendorTypePayload, S>

  type VendorTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VendorTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VendorTypeCountAggregateInputType | true
    }

  export interface VendorTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VendorType'], meta: { name: 'VendorType' } }
    /**
     * Find zero or one VendorType that matches the filter.
     * @param {VendorTypeFindUniqueArgs} args - Arguments to find a VendorType
     * @example
     * // Get one VendorType
     * const vendorType = await prisma.vendorType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VendorTypeFindUniqueArgs>(args: SelectSubset<T, VendorTypeFindUniqueArgs<ExtArgs>>): Prisma__VendorTypeClient<$Result.GetResult<Prisma.$VendorTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VendorType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VendorTypeFindUniqueOrThrowArgs} args - Arguments to find a VendorType
     * @example
     * // Get one VendorType
     * const vendorType = await prisma.vendorType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VendorTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, VendorTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VendorTypeClient<$Result.GetResult<Prisma.$VendorTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VendorType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorTypeFindFirstArgs} args - Arguments to find a VendorType
     * @example
     * // Get one VendorType
     * const vendorType = await prisma.vendorType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VendorTypeFindFirstArgs>(args?: SelectSubset<T, VendorTypeFindFirstArgs<ExtArgs>>): Prisma__VendorTypeClient<$Result.GetResult<Prisma.$VendorTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VendorType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorTypeFindFirstOrThrowArgs} args - Arguments to find a VendorType
     * @example
     * // Get one VendorType
     * const vendorType = await prisma.vendorType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VendorTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, VendorTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__VendorTypeClient<$Result.GetResult<Prisma.$VendorTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VendorTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VendorTypes
     * const vendorTypes = await prisma.vendorType.findMany()
     * 
     * // Get first 10 VendorTypes
     * const vendorTypes = await prisma.vendorType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vendorTypeWithIdOnly = await prisma.vendorType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VendorTypeFindManyArgs>(args?: SelectSubset<T, VendorTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VendorType.
     * @param {VendorTypeCreateArgs} args - Arguments to create a VendorType.
     * @example
     * // Create one VendorType
     * const VendorType = await prisma.vendorType.create({
     *   data: {
     *     // ... data to create a VendorType
     *   }
     * })
     * 
     */
    create<T extends VendorTypeCreateArgs>(args: SelectSubset<T, VendorTypeCreateArgs<ExtArgs>>): Prisma__VendorTypeClient<$Result.GetResult<Prisma.$VendorTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VendorTypes.
     * @param {VendorTypeCreateManyArgs} args - Arguments to create many VendorTypes.
     * @example
     * // Create many VendorTypes
     * const vendorType = await prisma.vendorType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VendorTypeCreateManyArgs>(args?: SelectSubset<T, VendorTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VendorTypes and returns the data saved in the database.
     * @param {VendorTypeCreateManyAndReturnArgs} args - Arguments to create many VendorTypes.
     * @example
     * // Create many VendorTypes
     * const vendorType = await prisma.vendorType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VendorTypes and only return the `id`
     * const vendorTypeWithIdOnly = await prisma.vendorType.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VendorTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, VendorTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VendorType.
     * @param {VendorTypeDeleteArgs} args - Arguments to delete one VendorType.
     * @example
     * // Delete one VendorType
     * const VendorType = await prisma.vendorType.delete({
     *   where: {
     *     // ... filter to delete one VendorType
     *   }
     * })
     * 
     */
    delete<T extends VendorTypeDeleteArgs>(args: SelectSubset<T, VendorTypeDeleteArgs<ExtArgs>>): Prisma__VendorTypeClient<$Result.GetResult<Prisma.$VendorTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VendorType.
     * @param {VendorTypeUpdateArgs} args - Arguments to update one VendorType.
     * @example
     * // Update one VendorType
     * const vendorType = await prisma.vendorType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VendorTypeUpdateArgs>(args: SelectSubset<T, VendorTypeUpdateArgs<ExtArgs>>): Prisma__VendorTypeClient<$Result.GetResult<Prisma.$VendorTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VendorTypes.
     * @param {VendorTypeDeleteManyArgs} args - Arguments to filter VendorTypes to delete.
     * @example
     * // Delete a few VendorTypes
     * const { count } = await prisma.vendorType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VendorTypeDeleteManyArgs>(args?: SelectSubset<T, VendorTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VendorTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VendorTypes
     * const vendorType = await prisma.vendorType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VendorTypeUpdateManyArgs>(args: SelectSubset<T, VendorTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VendorTypes and returns the data updated in the database.
     * @param {VendorTypeUpdateManyAndReturnArgs} args - Arguments to update many VendorTypes.
     * @example
     * // Update many VendorTypes
     * const vendorType = await prisma.vendorType.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VendorTypes and only return the `id`
     * const vendorTypeWithIdOnly = await prisma.vendorType.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VendorTypeUpdateManyAndReturnArgs>(args: SelectSubset<T, VendorTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VendorType.
     * @param {VendorTypeUpsertArgs} args - Arguments to update or create a VendorType.
     * @example
     * // Update or create a VendorType
     * const vendorType = await prisma.vendorType.upsert({
     *   create: {
     *     // ... data to create a VendorType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VendorType we want to update
     *   }
     * })
     */
    upsert<T extends VendorTypeUpsertArgs>(args: SelectSubset<T, VendorTypeUpsertArgs<ExtArgs>>): Prisma__VendorTypeClient<$Result.GetResult<Prisma.$VendorTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VendorTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorTypeCountArgs} args - Arguments to filter VendorTypes to count.
     * @example
     * // Count the number of VendorTypes
     * const count = await prisma.vendorType.count({
     *   where: {
     *     // ... the filter for the VendorTypes we want to count
     *   }
     * })
    **/
    count<T extends VendorTypeCountArgs>(
      args?: Subset<T, VendorTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VendorTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VendorType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VendorTypeAggregateArgs>(args: Subset<T, VendorTypeAggregateArgs>): Prisma.PrismaPromise<GetVendorTypeAggregateType<T>>

    /**
     * Group by VendorType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VendorTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VendorTypeGroupByArgs['orderBy'] }
        : { orderBy?: VendorTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VendorTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVendorTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VendorType model
   */
  readonly fields: VendorTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VendorType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VendorTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vendors<T extends VendorType$vendorsArgs<ExtArgs> = {}>(args?: Subset<T, VendorType$vendorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorTypeRelationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VendorType model
   */
  interface VendorTypeFieldRefs {
    readonly id: FieldRef<"VendorType", 'Int'>
    readonly name: FieldRef<"VendorType", 'String'>
  }
    

  // Custom InputTypes
  /**
   * VendorType findUnique
   */
  export type VendorTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorType
     */
    select?: VendorTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorType
     */
    omit?: VendorTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorTypeInclude<ExtArgs> | null
    /**
     * Filter, which VendorType to fetch.
     */
    where: VendorTypeWhereUniqueInput
  }

  /**
   * VendorType findUniqueOrThrow
   */
  export type VendorTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorType
     */
    select?: VendorTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorType
     */
    omit?: VendorTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorTypeInclude<ExtArgs> | null
    /**
     * Filter, which VendorType to fetch.
     */
    where: VendorTypeWhereUniqueInput
  }

  /**
   * VendorType findFirst
   */
  export type VendorTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorType
     */
    select?: VendorTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorType
     */
    omit?: VendorTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorTypeInclude<ExtArgs> | null
    /**
     * Filter, which VendorType to fetch.
     */
    where?: VendorTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendorTypes to fetch.
     */
    orderBy?: VendorTypeOrderByWithRelationInput | VendorTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VendorTypes.
     */
    cursor?: VendorTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendorTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendorTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VendorTypes.
     */
    distinct?: VendorTypeScalarFieldEnum | VendorTypeScalarFieldEnum[]
  }

  /**
   * VendorType findFirstOrThrow
   */
  export type VendorTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorType
     */
    select?: VendorTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorType
     */
    omit?: VendorTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorTypeInclude<ExtArgs> | null
    /**
     * Filter, which VendorType to fetch.
     */
    where?: VendorTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendorTypes to fetch.
     */
    orderBy?: VendorTypeOrderByWithRelationInput | VendorTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VendorTypes.
     */
    cursor?: VendorTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendorTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendorTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VendorTypes.
     */
    distinct?: VendorTypeScalarFieldEnum | VendorTypeScalarFieldEnum[]
  }

  /**
   * VendorType findMany
   */
  export type VendorTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorType
     */
    select?: VendorTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorType
     */
    omit?: VendorTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorTypeInclude<ExtArgs> | null
    /**
     * Filter, which VendorTypes to fetch.
     */
    where?: VendorTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendorTypes to fetch.
     */
    orderBy?: VendorTypeOrderByWithRelationInput | VendorTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VendorTypes.
     */
    cursor?: VendorTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendorTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendorTypes.
     */
    skip?: number
    distinct?: VendorTypeScalarFieldEnum | VendorTypeScalarFieldEnum[]
  }

  /**
   * VendorType create
   */
  export type VendorTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorType
     */
    select?: VendorTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorType
     */
    omit?: VendorTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a VendorType.
     */
    data: XOR<VendorTypeCreateInput, VendorTypeUncheckedCreateInput>
  }

  /**
   * VendorType createMany
   */
  export type VendorTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VendorTypes.
     */
    data: VendorTypeCreateManyInput | VendorTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VendorType createManyAndReturn
   */
  export type VendorTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorType
     */
    select?: VendorTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VendorType
     */
    omit?: VendorTypeOmit<ExtArgs> | null
    /**
     * The data used to create many VendorTypes.
     */
    data: VendorTypeCreateManyInput | VendorTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VendorType update
   */
  export type VendorTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorType
     */
    select?: VendorTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorType
     */
    omit?: VendorTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a VendorType.
     */
    data: XOR<VendorTypeUpdateInput, VendorTypeUncheckedUpdateInput>
    /**
     * Choose, which VendorType to update.
     */
    where: VendorTypeWhereUniqueInput
  }

  /**
   * VendorType updateMany
   */
  export type VendorTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VendorTypes.
     */
    data: XOR<VendorTypeUpdateManyMutationInput, VendorTypeUncheckedUpdateManyInput>
    /**
     * Filter which VendorTypes to update
     */
    where?: VendorTypeWhereInput
    /**
     * Limit how many VendorTypes to update.
     */
    limit?: number
  }

  /**
   * VendorType updateManyAndReturn
   */
  export type VendorTypeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorType
     */
    select?: VendorTypeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VendorType
     */
    omit?: VendorTypeOmit<ExtArgs> | null
    /**
     * The data used to update VendorTypes.
     */
    data: XOR<VendorTypeUpdateManyMutationInput, VendorTypeUncheckedUpdateManyInput>
    /**
     * Filter which VendorTypes to update
     */
    where?: VendorTypeWhereInput
    /**
     * Limit how many VendorTypes to update.
     */
    limit?: number
  }

  /**
   * VendorType upsert
   */
  export type VendorTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorType
     */
    select?: VendorTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorType
     */
    omit?: VendorTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the VendorType to update in case it exists.
     */
    where: VendorTypeWhereUniqueInput
    /**
     * In case the VendorType found by the `where` argument doesn't exist, create a new VendorType with this data.
     */
    create: XOR<VendorTypeCreateInput, VendorTypeUncheckedCreateInput>
    /**
     * In case the VendorType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VendorTypeUpdateInput, VendorTypeUncheckedUpdateInput>
  }

  /**
   * VendorType delete
   */
  export type VendorTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorType
     */
    select?: VendorTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorType
     */
    omit?: VendorTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorTypeInclude<ExtArgs> | null
    /**
     * Filter which VendorType to delete.
     */
    where: VendorTypeWhereUniqueInput
  }

  /**
   * VendorType deleteMany
   */
  export type VendorTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VendorTypes to delete
     */
    where?: VendorTypeWhereInput
    /**
     * Limit how many VendorTypes to delete.
     */
    limit?: number
  }

  /**
   * VendorType.vendors
   */
  export type VendorType$vendorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorTypeRelation
     */
    select?: VendorTypeRelationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorTypeRelation
     */
    omit?: VendorTypeRelationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorTypeRelationInclude<ExtArgs> | null
    where?: VendorTypeRelationWhereInput
    orderBy?: VendorTypeRelationOrderByWithRelationInput | VendorTypeRelationOrderByWithRelationInput[]
    cursor?: VendorTypeRelationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VendorTypeRelationScalarFieldEnum | VendorTypeRelationScalarFieldEnum[]
  }

  /**
   * VendorType without action
   */
  export type VendorTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorType
     */
    select?: VendorTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorType
     */
    omit?: VendorTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorTypeInclude<ExtArgs> | null
  }


  /**
   * Model VendorTypeRelation
   */

  export type AggregateVendorTypeRelation = {
    _count: VendorTypeRelationCountAggregateOutputType | null
    _avg: VendorTypeRelationAvgAggregateOutputType | null
    _sum: VendorTypeRelationSumAggregateOutputType | null
    _min: VendorTypeRelationMinAggregateOutputType | null
    _max: VendorTypeRelationMaxAggregateOutputType | null
  }

  export type VendorTypeRelationAvgAggregateOutputType = {
    vendorId: number | null
    typeId: number | null
  }

  export type VendorTypeRelationSumAggregateOutputType = {
    vendorId: number | null
    typeId: number | null
  }

  export type VendorTypeRelationMinAggregateOutputType = {
    vendorId: number | null
    typeId: number | null
  }

  export type VendorTypeRelationMaxAggregateOutputType = {
    vendorId: number | null
    typeId: number | null
  }

  export type VendorTypeRelationCountAggregateOutputType = {
    vendorId: number
    typeId: number
    _all: number
  }


  export type VendorTypeRelationAvgAggregateInputType = {
    vendorId?: true
    typeId?: true
  }

  export type VendorTypeRelationSumAggregateInputType = {
    vendorId?: true
    typeId?: true
  }

  export type VendorTypeRelationMinAggregateInputType = {
    vendorId?: true
    typeId?: true
  }

  export type VendorTypeRelationMaxAggregateInputType = {
    vendorId?: true
    typeId?: true
  }

  export type VendorTypeRelationCountAggregateInputType = {
    vendorId?: true
    typeId?: true
    _all?: true
  }

  export type VendorTypeRelationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VendorTypeRelation to aggregate.
     */
    where?: VendorTypeRelationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendorTypeRelations to fetch.
     */
    orderBy?: VendorTypeRelationOrderByWithRelationInput | VendorTypeRelationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VendorTypeRelationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendorTypeRelations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendorTypeRelations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VendorTypeRelations
    **/
    _count?: true | VendorTypeRelationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VendorTypeRelationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VendorTypeRelationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VendorTypeRelationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VendorTypeRelationMaxAggregateInputType
  }

  export type GetVendorTypeRelationAggregateType<T extends VendorTypeRelationAggregateArgs> = {
        [P in keyof T & keyof AggregateVendorTypeRelation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVendorTypeRelation[P]>
      : GetScalarType<T[P], AggregateVendorTypeRelation[P]>
  }




  export type VendorTypeRelationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendorTypeRelationWhereInput
    orderBy?: VendorTypeRelationOrderByWithAggregationInput | VendorTypeRelationOrderByWithAggregationInput[]
    by: VendorTypeRelationScalarFieldEnum[] | VendorTypeRelationScalarFieldEnum
    having?: VendorTypeRelationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VendorTypeRelationCountAggregateInputType | true
    _avg?: VendorTypeRelationAvgAggregateInputType
    _sum?: VendorTypeRelationSumAggregateInputType
    _min?: VendorTypeRelationMinAggregateInputType
    _max?: VendorTypeRelationMaxAggregateInputType
  }

  export type VendorTypeRelationGroupByOutputType = {
    vendorId: number
    typeId: number
    _count: VendorTypeRelationCountAggregateOutputType | null
    _avg: VendorTypeRelationAvgAggregateOutputType | null
    _sum: VendorTypeRelationSumAggregateOutputType | null
    _min: VendorTypeRelationMinAggregateOutputType | null
    _max: VendorTypeRelationMaxAggregateOutputType | null
  }

  type GetVendorTypeRelationGroupByPayload<T extends VendorTypeRelationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VendorTypeRelationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VendorTypeRelationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VendorTypeRelationGroupByOutputType[P]>
            : GetScalarType<T[P], VendorTypeRelationGroupByOutputType[P]>
        }
      >
    >


  export type VendorTypeRelationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    vendorId?: boolean
    typeId?: boolean
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
    type?: boolean | VendorTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendorTypeRelation"]>

  export type VendorTypeRelationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    vendorId?: boolean
    typeId?: boolean
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
    type?: boolean | VendorTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendorTypeRelation"]>

  export type VendorTypeRelationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    vendorId?: boolean
    typeId?: boolean
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
    type?: boolean | VendorTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendorTypeRelation"]>

  export type VendorTypeRelationSelectScalar = {
    vendorId?: boolean
    typeId?: boolean
  }

  export type VendorTypeRelationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"vendorId" | "typeId", ExtArgs["result"]["vendorTypeRelation"]>
  export type VendorTypeRelationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
    type?: boolean | VendorTypeDefaultArgs<ExtArgs>
  }
  export type VendorTypeRelationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
    type?: boolean | VendorTypeDefaultArgs<ExtArgs>
  }
  export type VendorTypeRelationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
    type?: boolean | VendorTypeDefaultArgs<ExtArgs>
  }

  export type $VendorTypeRelationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VendorTypeRelation"
    objects: {
      vendor: Prisma.$VendorPayload<ExtArgs>
      type: Prisma.$VendorTypePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      vendorId: number
      typeId: number
    }, ExtArgs["result"]["vendorTypeRelation"]>
    composites: {}
  }

  type VendorTypeRelationGetPayload<S extends boolean | null | undefined | VendorTypeRelationDefaultArgs> = $Result.GetResult<Prisma.$VendorTypeRelationPayload, S>

  type VendorTypeRelationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VendorTypeRelationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VendorTypeRelationCountAggregateInputType | true
    }

  export interface VendorTypeRelationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VendorTypeRelation'], meta: { name: 'VendorTypeRelation' } }
    /**
     * Find zero or one VendorTypeRelation that matches the filter.
     * @param {VendorTypeRelationFindUniqueArgs} args - Arguments to find a VendorTypeRelation
     * @example
     * // Get one VendorTypeRelation
     * const vendorTypeRelation = await prisma.vendorTypeRelation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VendorTypeRelationFindUniqueArgs>(args: SelectSubset<T, VendorTypeRelationFindUniqueArgs<ExtArgs>>): Prisma__VendorTypeRelationClient<$Result.GetResult<Prisma.$VendorTypeRelationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VendorTypeRelation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VendorTypeRelationFindUniqueOrThrowArgs} args - Arguments to find a VendorTypeRelation
     * @example
     * // Get one VendorTypeRelation
     * const vendorTypeRelation = await prisma.vendorTypeRelation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VendorTypeRelationFindUniqueOrThrowArgs>(args: SelectSubset<T, VendorTypeRelationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VendorTypeRelationClient<$Result.GetResult<Prisma.$VendorTypeRelationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VendorTypeRelation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorTypeRelationFindFirstArgs} args - Arguments to find a VendorTypeRelation
     * @example
     * // Get one VendorTypeRelation
     * const vendorTypeRelation = await prisma.vendorTypeRelation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VendorTypeRelationFindFirstArgs>(args?: SelectSubset<T, VendorTypeRelationFindFirstArgs<ExtArgs>>): Prisma__VendorTypeRelationClient<$Result.GetResult<Prisma.$VendorTypeRelationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VendorTypeRelation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorTypeRelationFindFirstOrThrowArgs} args - Arguments to find a VendorTypeRelation
     * @example
     * // Get one VendorTypeRelation
     * const vendorTypeRelation = await prisma.vendorTypeRelation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VendorTypeRelationFindFirstOrThrowArgs>(args?: SelectSubset<T, VendorTypeRelationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VendorTypeRelationClient<$Result.GetResult<Prisma.$VendorTypeRelationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VendorTypeRelations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorTypeRelationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VendorTypeRelations
     * const vendorTypeRelations = await prisma.vendorTypeRelation.findMany()
     * 
     * // Get first 10 VendorTypeRelations
     * const vendorTypeRelations = await prisma.vendorTypeRelation.findMany({ take: 10 })
     * 
     * // Only select the `vendorId`
     * const vendorTypeRelationWithVendorIdOnly = await prisma.vendorTypeRelation.findMany({ select: { vendorId: true } })
     * 
     */
    findMany<T extends VendorTypeRelationFindManyArgs>(args?: SelectSubset<T, VendorTypeRelationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorTypeRelationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VendorTypeRelation.
     * @param {VendorTypeRelationCreateArgs} args - Arguments to create a VendorTypeRelation.
     * @example
     * // Create one VendorTypeRelation
     * const VendorTypeRelation = await prisma.vendorTypeRelation.create({
     *   data: {
     *     // ... data to create a VendorTypeRelation
     *   }
     * })
     * 
     */
    create<T extends VendorTypeRelationCreateArgs>(args: SelectSubset<T, VendorTypeRelationCreateArgs<ExtArgs>>): Prisma__VendorTypeRelationClient<$Result.GetResult<Prisma.$VendorTypeRelationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VendorTypeRelations.
     * @param {VendorTypeRelationCreateManyArgs} args - Arguments to create many VendorTypeRelations.
     * @example
     * // Create many VendorTypeRelations
     * const vendorTypeRelation = await prisma.vendorTypeRelation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VendorTypeRelationCreateManyArgs>(args?: SelectSubset<T, VendorTypeRelationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VendorTypeRelations and returns the data saved in the database.
     * @param {VendorTypeRelationCreateManyAndReturnArgs} args - Arguments to create many VendorTypeRelations.
     * @example
     * // Create many VendorTypeRelations
     * const vendorTypeRelation = await prisma.vendorTypeRelation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VendorTypeRelations and only return the `vendorId`
     * const vendorTypeRelationWithVendorIdOnly = await prisma.vendorTypeRelation.createManyAndReturn({
     *   select: { vendorId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VendorTypeRelationCreateManyAndReturnArgs>(args?: SelectSubset<T, VendorTypeRelationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorTypeRelationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VendorTypeRelation.
     * @param {VendorTypeRelationDeleteArgs} args - Arguments to delete one VendorTypeRelation.
     * @example
     * // Delete one VendorTypeRelation
     * const VendorTypeRelation = await prisma.vendorTypeRelation.delete({
     *   where: {
     *     // ... filter to delete one VendorTypeRelation
     *   }
     * })
     * 
     */
    delete<T extends VendorTypeRelationDeleteArgs>(args: SelectSubset<T, VendorTypeRelationDeleteArgs<ExtArgs>>): Prisma__VendorTypeRelationClient<$Result.GetResult<Prisma.$VendorTypeRelationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VendorTypeRelation.
     * @param {VendorTypeRelationUpdateArgs} args - Arguments to update one VendorTypeRelation.
     * @example
     * // Update one VendorTypeRelation
     * const vendorTypeRelation = await prisma.vendorTypeRelation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VendorTypeRelationUpdateArgs>(args: SelectSubset<T, VendorTypeRelationUpdateArgs<ExtArgs>>): Prisma__VendorTypeRelationClient<$Result.GetResult<Prisma.$VendorTypeRelationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VendorTypeRelations.
     * @param {VendorTypeRelationDeleteManyArgs} args - Arguments to filter VendorTypeRelations to delete.
     * @example
     * // Delete a few VendorTypeRelations
     * const { count } = await prisma.vendorTypeRelation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VendorTypeRelationDeleteManyArgs>(args?: SelectSubset<T, VendorTypeRelationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VendorTypeRelations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorTypeRelationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VendorTypeRelations
     * const vendorTypeRelation = await prisma.vendorTypeRelation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VendorTypeRelationUpdateManyArgs>(args: SelectSubset<T, VendorTypeRelationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VendorTypeRelations and returns the data updated in the database.
     * @param {VendorTypeRelationUpdateManyAndReturnArgs} args - Arguments to update many VendorTypeRelations.
     * @example
     * // Update many VendorTypeRelations
     * const vendorTypeRelation = await prisma.vendorTypeRelation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VendorTypeRelations and only return the `vendorId`
     * const vendorTypeRelationWithVendorIdOnly = await prisma.vendorTypeRelation.updateManyAndReturn({
     *   select: { vendorId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VendorTypeRelationUpdateManyAndReturnArgs>(args: SelectSubset<T, VendorTypeRelationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorTypeRelationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VendorTypeRelation.
     * @param {VendorTypeRelationUpsertArgs} args - Arguments to update or create a VendorTypeRelation.
     * @example
     * // Update or create a VendorTypeRelation
     * const vendorTypeRelation = await prisma.vendorTypeRelation.upsert({
     *   create: {
     *     // ... data to create a VendorTypeRelation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VendorTypeRelation we want to update
     *   }
     * })
     */
    upsert<T extends VendorTypeRelationUpsertArgs>(args: SelectSubset<T, VendorTypeRelationUpsertArgs<ExtArgs>>): Prisma__VendorTypeRelationClient<$Result.GetResult<Prisma.$VendorTypeRelationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VendorTypeRelations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorTypeRelationCountArgs} args - Arguments to filter VendorTypeRelations to count.
     * @example
     * // Count the number of VendorTypeRelations
     * const count = await prisma.vendorTypeRelation.count({
     *   where: {
     *     // ... the filter for the VendorTypeRelations we want to count
     *   }
     * })
    **/
    count<T extends VendorTypeRelationCountArgs>(
      args?: Subset<T, VendorTypeRelationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VendorTypeRelationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VendorTypeRelation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorTypeRelationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VendorTypeRelationAggregateArgs>(args: Subset<T, VendorTypeRelationAggregateArgs>): Prisma.PrismaPromise<GetVendorTypeRelationAggregateType<T>>

    /**
     * Group by VendorTypeRelation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorTypeRelationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VendorTypeRelationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VendorTypeRelationGroupByArgs['orderBy'] }
        : { orderBy?: VendorTypeRelationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VendorTypeRelationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVendorTypeRelationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VendorTypeRelation model
   */
  readonly fields: VendorTypeRelationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VendorTypeRelation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VendorTypeRelationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vendor<T extends VendorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VendorDefaultArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    type<T extends VendorTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VendorTypeDefaultArgs<ExtArgs>>): Prisma__VendorTypeClient<$Result.GetResult<Prisma.$VendorTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VendorTypeRelation model
   */
  interface VendorTypeRelationFieldRefs {
    readonly vendorId: FieldRef<"VendorTypeRelation", 'Int'>
    readonly typeId: FieldRef<"VendorTypeRelation", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * VendorTypeRelation findUnique
   */
  export type VendorTypeRelationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorTypeRelation
     */
    select?: VendorTypeRelationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorTypeRelation
     */
    omit?: VendorTypeRelationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorTypeRelationInclude<ExtArgs> | null
    /**
     * Filter, which VendorTypeRelation to fetch.
     */
    where: VendorTypeRelationWhereUniqueInput
  }

  /**
   * VendorTypeRelation findUniqueOrThrow
   */
  export type VendorTypeRelationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorTypeRelation
     */
    select?: VendorTypeRelationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorTypeRelation
     */
    omit?: VendorTypeRelationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorTypeRelationInclude<ExtArgs> | null
    /**
     * Filter, which VendorTypeRelation to fetch.
     */
    where: VendorTypeRelationWhereUniqueInput
  }

  /**
   * VendorTypeRelation findFirst
   */
  export type VendorTypeRelationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorTypeRelation
     */
    select?: VendorTypeRelationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorTypeRelation
     */
    omit?: VendorTypeRelationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorTypeRelationInclude<ExtArgs> | null
    /**
     * Filter, which VendorTypeRelation to fetch.
     */
    where?: VendorTypeRelationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendorTypeRelations to fetch.
     */
    orderBy?: VendorTypeRelationOrderByWithRelationInput | VendorTypeRelationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VendorTypeRelations.
     */
    cursor?: VendorTypeRelationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendorTypeRelations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendorTypeRelations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VendorTypeRelations.
     */
    distinct?: VendorTypeRelationScalarFieldEnum | VendorTypeRelationScalarFieldEnum[]
  }

  /**
   * VendorTypeRelation findFirstOrThrow
   */
  export type VendorTypeRelationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorTypeRelation
     */
    select?: VendorTypeRelationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorTypeRelation
     */
    omit?: VendorTypeRelationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorTypeRelationInclude<ExtArgs> | null
    /**
     * Filter, which VendorTypeRelation to fetch.
     */
    where?: VendorTypeRelationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendorTypeRelations to fetch.
     */
    orderBy?: VendorTypeRelationOrderByWithRelationInput | VendorTypeRelationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VendorTypeRelations.
     */
    cursor?: VendorTypeRelationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendorTypeRelations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendorTypeRelations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VendorTypeRelations.
     */
    distinct?: VendorTypeRelationScalarFieldEnum | VendorTypeRelationScalarFieldEnum[]
  }

  /**
   * VendorTypeRelation findMany
   */
  export type VendorTypeRelationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorTypeRelation
     */
    select?: VendorTypeRelationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorTypeRelation
     */
    omit?: VendorTypeRelationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorTypeRelationInclude<ExtArgs> | null
    /**
     * Filter, which VendorTypeRelations to fetch.
     */
    where?: VendorTypeRelationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendorTypeRelations to fetch.
     */
    orderBy?: VendorTypeRelationOrderByWithRelationInput | VendorTypeRelationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VendorTypeRelations.
     */
    cursor?: VendorTypeRelationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendorTypeRelations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendorTypeRelations.
     */
    skip?: number
    distinct?: VendorTypeRelationScalarFieldEnum | VendorTypeRelationScalarFieldEnum[]
  }

  /**
   * VendorTypeRelation create
   */
  export type VendorTypeRelationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorTypeRelation
     */
    select?: VendorTypeRelationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorTypeRelation
     */
    omit?: VendorTypeRelationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorTypeRelationInclude<ExtArgs> | null
    /**
     * The data needed to create a VendorTypeRelation.
     */
    data: XOR<VendorTypeRelationCreateInput, VendorTypeRelationUncheckedCreateInput>
  }

  /**
   * VendorTypeRelation createMany
   */
  export type VendorTypeRelationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VendorTypeRelations.
     */
    data: VendorTypeRelationCreateManyInput | VendorTypeRelationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VendorTypeRelation createManyAndReturn
   */
  export type VendorTypeRelationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorTypeRelation
     */
    select?: VendorTypeRelationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VendorTypeRelation
     */
    omit?: VendorTypeRelationOmit<ExtArgs> | null
    /**
     * The data used to create many VendorTypeRelations.
     */
    data: VendorTypeRelationCreateManyInput | VendorTypeRelationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorTypeRelationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VendorTypeRelation update
   */
  export type VendorTypeRelationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorTypeRelation
     */
    select?: VendorTypeRelationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorTypeRelation
     */
    omit?: VendorTypeRelationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorTypeRelationInclude<ExtArgs> | null
    /**
     * The data needed to update a VendorTypeRelation.
     */
    data: XOR<VendorTypeRelationUpdateInput, VendorTypeRelationUncheckedUpdateInput>
    /**
     * Choose, which VendorTypeRelation to update.
     */
    where: VendorTypeRelationWhereUniqueInput
  }

  /**
   * VendorTypeRelation updateMany
   */
  export type VendorTypeRelationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VendorTypeRelations.
     */
    data: XOR<VendorTypeRelationUpdateManyMutationInput, VendorTypeRelationUncheckedUpdateManyInput>
    /**
     * Filter which VendorTypeRelations to update
     */
    where?: VendorTypeRelationWhereInput
    /**
     * Limit how many VendorTypeRelations to update.
     */
    limit?: number
  }

  /**
   * VendorTypeRelation updateManyAndReturn
   */
  export type VendorTypeRelationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorTypeRelation
     */
    select?: VendorTypeRelationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VendorTypeRelation
     */
    omit?: VendorTypeRelationOmit<ExtArgs> | null
    /**
     * The data used to update VendorTypeRelations.
     */
    data: XOR<VendorTypeRelationUpdateManyMutationInput, VendorTypeRelationUncheckedUpdateManyInput>
    /**
     * Filter which VendorTypeRelations to update
     */
    where?: VendorTypeRelationWhereInput
    /**
     * Limit how many VendorTypeRelations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorTypeRelationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VendorTypeRelation upsert
   */
  export type VendorTypeRelationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorTypeRelation
     */
    select?: VendorTypeRelationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorTypeRelation
     */
    omit?: VendorTypeRelationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorTypeRelationInclude<ExtArgs> | null
    /**
     * The filter to search for the VendorTypeRelation to update in case it exists.
     */
    where: VendorTypeRelationWhereUniqueInput
    /**
     * In case the VendorTypeRelation found by the `where` argument doesn't exist, create a new VendorTypeRelation with this data.
     */
    create: XOR<VendorTypeRelationCreateInput, VendorTypeRelationUncheckedCreateInput>
    /**
     * In case the VendorTypeRelation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VendorTypeRelationUpdateInput, VendorTypeRelationUncheckedUpdateInput>
  }

  /**
   * VendorTypeRelation delete
   */
  export type VendorTypeRelationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorTypeRelation
     */
    select?: VendorTypeRelationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorTypeRelation
     */
    omit?: VendorTypeRelationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorTypeRelationInclude<ExtArgs> | null
    /**
     * Filter which VendorTypeRelation to delete.
     */
    where: VendorTypeRelationWhereUniqueInput
  }

  /**
   * VendorTypeRelation deleteMany
   */
  export type VendorTypeRelationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VendorTypeRelations to delete
     */
    where?: VendorTypeRelationWhereInput
    /**
     * Limit how many VendorTypeRelations to delete.
     */
    limit?: number
  }

  /**
   * VendorTypeRelation without action
   */
  export type VendorTypeRelationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorTypeRelation
     */
    select?: VendorTypeRelationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorTypeRelation
     */
    omit?: VendorTypeRelationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorTypeRelationInclude<ExtArgs> | null
  }


  /**
   * Model Favourite
   */

  export type AggregateFavourite = {
    _count: FavouriteCountAggregateOutputType | null
    _avg: FavouriteAvgAggregateOutputType | null
    _sum: FavouriteSumAggregateOutputType | null
    _min: FavouriteMinAggregateOutputType | null
    _max: FavouriteMaxAggregateOutputType | null
  }

  export type FavouriteAvgAggregateOutputType = {
    userId: number | null
    vendorId: number | null
  }

  export type FavouriteSumAggregateOutputType = {
    userId: number | null
    vendorId: number | null
  }

  export type FavouriteMinAggregateOutputType = {
    userId: number | null
    vendorId: number | null
  }

  export type FavouriteMaxAggregateOutputType = {
    userId: number | null
    vendorId: number | null
  }

  export type FavouriteCountAggregateOutputType = {
    userId: number
    vendorId: number
    _all: number
  }


  export type FavouriteAvgAggregateInputType = {
    userId?: true
    vendorId?: true
  }

  export type FavouriteSumAggregateInputType = {
    userId?: true
    vendorId?: true
  }

  export type FavouriteMinAggregateInputType = {
    userId?: true
    vendorId?: true
  }

  export type FavouriteMaxAggregateInputType = {
    userId?: true
    vendorId?: true
  }

  export type FavouriteCountAggregateInputType = {
    userId?: true
    vendorId?: true
    _all?: true
  }

  export type FavouriteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Favourite to aggregate.
     */
    where?: FavouriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favourites to fetch.
     */
    orderBy?: FavouriteOrderByWithRelationInput | FavouriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FavouriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favourites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favourites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Favourites
    **/
    _count?: true | FavouriteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FavouriteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FavouriteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FavouriteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FavouriteMaxAggregateInputType
  }

  export type GetFavouriteAggregateType<T extends FavouriteAggregateArgs> = {
        [P in keyof T & keyof AggregateFavourite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFavourite[P]>
      : GetScalarType<T[P], AggregateFavourite[P]>
  }




  export type FavouriteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavouriteWhereInput
    orderBy?: FavouriteOrderByWithAggregationInput | FavouriteOrderByWithAggregationInput[]
    by: FavouriteScalarFieldEnum[] | FavouriteScalarFieldEnum
    having?: FavouriteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FavouriteCountAggregateInputType | true
    _avg?: FavouriteAvgAggregateInputType
    _sum?: FavouriteSumAggregateInputType
    _min?: FavouriteMinAggregateInputType
    _max?: FavouriteMaxAggregateInputType
  }

  export type FavouriteGroupByOutputType = {
    userId: number
    vendorId: number
    _count: FavouriteCountAggregateOutputType | null
    _avg: FavouriteAvgAggregateOutputType | null
    _sum: FavouriteSumAggregateOutputType | null
    _min: FavouriteMinAggregateOutputType | null
    _max: FavouriteMaxAggregateOutputType | null
  }

  type GetFavouriteGroupByPayload<T extends FavouriteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FavouriteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FavouriteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FavouriteGroupByOutputType[P]>
            : GetScalarType<T[P], FavouriteGroupByOutputType[P]>
        }
      >
    >


  export type FavouriteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    vendorId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favourite"]>

  export type FavouriteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    vendorId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favourite"]>

  export type FavouriteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    vendorId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favourite"]>

  export type FavouriteSelectScalar = {
    userId?: boolean
    vendorId?: boolean
  }

  export type FavouriteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "vendorId", ExtArgs["result"]["favourite"]>
  export type FavouriteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
  }
  export type FavouriteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
  }
  export type FavouriteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
  }

  export type $FavouritePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Favourite"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      vendor: Prisma.$VendorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: number
      vendorId: number
    }, ExtArgs["result"]["favourite"]>
    composites: {}
  }

  type FavouriteGetPayload<S extends boolean | null | undefined | FavouriteDefaultArgs> = $Result.GetResult<Prisma.$FavouritePayload, S>

  type FavouriteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FavouriteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FavouriteCountAggregateInputType | true
    }

  export interface FavouriteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Favourite'], meta: { name: 'Favourite' } }
    /**
     * Find zero or one Favourite that matches the filter.
     * @param {FavouriteFindUniqueArgs} args - Arguments to find a Favourite
     * @example
     * // Get one Favourite
     * const favourite = await prisma.favourite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FavouriteFindUniqueArgs>(args: SelectSubset<T, FavouriteFindUniqueArgs<ExtArgs>>): Prisma__FavouriteClient<$Result.GetResult<Prisma.$FavouritePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Favourite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FavouriteFindUniqueOrThrowArgs} args - Arguments to find a Favourite
     * @example
     * // Get one Favourite
     * const favourite = await prisma.favourite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FavouriteFindUniqueOrThrowArgs>(args: SelectSubset<T, FavouriteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FavouriteClient<$Result.GetResult<Prisma.$FavouritePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Favourite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavouriteFindFirstArgs} args - Arguments to find a Favourite
     * @example
     * // Get one Favourite
     * const favourite = await prisma.favourite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FavouriteFindFirstArgs>(args?: SelectSubset<T, FavouriteFindFirstArgs<ExtArgs>>): Prisma__FavouriteClient<$Result.GetResult<Prisma.$FavouritePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Favourite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavouriteFindFirstOrThrowArgs} args - Arguments to find a Favourite
     * @example
     * // Get one Favourite
     * const favourite = await prisma.favourite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FavouriteFindFirstOrThrowArgs>(args?: SelectSubset<T, FavouriteFindFirstOrThrowArgs<ExtArgs>>): Prisma__FavouriteClient<$Result.GetResult<Prisma.$FavouritePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Favourites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavouriteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Favourites
     * const favourites = await prisma.favourite.findMany()
     * 
     * // Get first 10 Favourites
     * const favourites = await prisma.favourite.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const favouriteWithUserIdOnly = await prisma.favourite.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends FavouriteFindManyArgs>(args?: SelectSubset<T, FavouriteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavouritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Favourite.
     * @param {FavouriteCreateArgs} args - Arguments to create a Favourite.
     * @example
     * // Create one Favourite
     * const Favourite = await prisma.favourite.create({
     *   data: {
     *     // ... data to create a Favourite
     *   }
     * })
     * 
     */
    create<T extends FavouriteCreateArgs>(args: SelectSubset<T, FavouriteCreateArgs<ExtArgs>>): Prisma__FavouriteClient<$Result.GetResult<Prisma.$FavouritePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Favourites.
     * @param {FavouriteCreateManyArgs} args - Arguments to create many Favourites.
     * @example
     * // Create many Favourites
     * const favourite = await prisma.favourite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FavouriteCreateManyArgs>(args?: SelectSubset<T, FavouriteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Favourites and returns the data saved in the database.
     * @param {FavouriteCreateManyAndReturnArgs} args - Arguments to create many Favourites.
     * @example
     * // Create many Favourites
     * const favourite = await prisma.favourite.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Favourites and only return the `userId`
     * const favouriteWithUserIdOnly = await prisma.favourite.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FavouriteCreateManyAndReturnArgs>(args?: SelectSubset<T, FavouriteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavouritePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Favourite.
     * @param {FavouriteDeleteArgs} args - Arguments to delete one Favourite.
     * @example
     * // Delete one Favourite
     * const Favourite = await prisma.favourite.delete({
     *   where: {
     *     // ... filter to delete one Favourite
     *   }
     * })
     * 
     */
    delete<T extends FavouriteDeleteArgs>(args: SelectSubset<T, FavouriteDeleteArgs<ExtArgs>>): Prisma__FavouriteClient<$Result.GetResult<Prisma.$FavouritePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Favourite.
     * @param {FavouriteUpdateArgs} args - Arguments to update one Favourite.
     * @example
     * // Update one Favourite
     * const favourite = await prisma.favourite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FavouriteUpdateArgs>(args: SelectSubset<T, FavouriteUpdateArgs<ExtArgs>>): Prisma__FavouriteClient<$Result.GetResult<Prisma.$FavouritePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Favourites.
     * @param {FavouriteDeleteManyArgs} args - Arguments to filter Favourites to delete.
     * @example
     * // Delete a few Favourites
     * const { count } = await prisma.favourite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FavouriteDeleteManyArgs>(args?: SelectSubset<T, FavouriteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Favourites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavouriteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Favourites
     * const favourite = await prisma.favourite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FavouriteUpdateManyArgs>(args: SelectSubset<T, FavouriteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Favourites and returns the data updated in the database.
     * @param {FavouriteUpdateManyAndReturnArgs} args - Arguments to update many Favourites.
     * @example
     * // Update many Favourites
     * const favourite = await prisma.favourite.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Favourites and only return the `userId`
     * const favouriteWithUserIdOnly = await prisma.favourite.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FavouriteUpdateManyAndReturnArgs>(args: SelectSubset<T, FavouriteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavouritePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Favourite.
     * @param {FavouriteUpsertArgs} args - Arguments to update or create a Favourite.
     * @example
     * // Update or create a Favourite
     * const favourite = await prisma.favourite.upsert({
     *   create: {
     *     // ... data to create a Favourite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Favourite we want to update
     *   }
     * })
     */
    upsert<T extends FavouriteUpsertArgs>(args: SelectSubset<T, FavouriteUpsertArgs<ExtArgs>>): Prisma__FavouriteClient<$Result.GetResult<Prisma.$FavouritePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Favourites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavouriteCountArgs} args - Arguments to filter Favourites to count.
     * @example
     * // Count the number of Favourites
     * const count = await prisma.favourite.count({
     *   where: {
     *     // ... the filter for the Favourites we want to count
     *   }
     * })
    **/
    count<T extends FavouriteCountArgs>(
      args?: Subset<T, FavouriteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FavouriteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Favourite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavouriteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FavouriteAggregateArgs>(args: Subset<T, FavouriteAggregateArgs>): Prisma.PrismaPromise<GetFavouriteAggregateType<T>>

    /**
     * Group by Favourite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavouriteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FavouriteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FavouriteGroupByArgs['orderBy'] }
        : { orderBy?: FavouriteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FavouriteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFavouriteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Favourite model
   */
  readonly fields: FavouriteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Favourite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FavouriteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    vendor<T extends VendorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VendorDefaultArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Favourite model
   */
  interface FavouriteFieldRefs {
    readonly userId: FieldRef<"Favourite", 'Int'>
    readonly vendorId: FieldRef<"Favourite", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Favourite findUnique
   */
  export type FavouriteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favourite
     */
    select?: FavouriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favourite
     */
    omit?: FavouriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavouriteInclude<ExtArgs> | null
    /**
     * Filter, which Favourite to fetch.
     */
    where: FavouriteWhereUniqueInput
  }

  /**
   * Favourite findUniqueOrThrow
   */
  export type FavouriteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favourite
     */
    select?: FavouriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favourite
     */
    omit?: FavouriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavouriteInclude<ExtArgs> | null
    /**
     * Filter, which Favourite to fetch.
     */
    where: FavouriteWhereUniqueInput
  }

  /**
   * Favourite findFirst
   */
  export type FavouriteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favourite
     */
    select?: FavouriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favourite
     */
    omit?: FavouriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavouriteInclude<ExtArgs> | null
    /**
     * Filter, which Favourite to fetch.
     */
    where?: FavouriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favourites to fetch.
     */
    orderBy?: FavouriteOrderByWithRelationInput | FavouriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Favourites.
     */
    cursor?: FavouriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favourites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favourites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favourites.
     */
    distinct?: FavouriteScalarFieldEnum | FavouriteScalarFieldEnum[]
  }

  /**
   * Favourite findFirstOrThrow
   */
  export type FavouriteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favourite
     */
    select?: FavouriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favourite
     */
    omit?: FavouriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavouriteInclude<ExtArgs> | null
    /**
     * Filter, which Favourite to fetch.
     */
    where?: FavouriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favourites to fetch.
     */
    orderBy?: FavouriteOrderByWithRelationInput | FavouriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Favourites.
     */
    cursor?: FavouriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favourites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favourites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favourites.
     */
    distinct?: FavouriteScalarFieldEnum | FavouriteScalarFieldEnum[]
  }

  /**
   * Favourite findMany
   */
  export type FavouriteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favourite
     */
    select?: FavouriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favourite
     */
    omit?: FavouriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavouriteInclude<ExtArgs> | null
    /**
     * Filter, which Favourites to fetch.
     */
    where?: FavouriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favourites to fetch.
     */
    orderBy?: FavouriteOrderByWithRelationInput | FavouriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Favourites.
     */
    cursor?: FavouriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favourites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favourites.
     */
    skip?: number
    distinct?: FavouriteScalarFieldEnum | FavouriteScalarFieldEnum[]
  }

  /**
   * Favourite create
   */
  export type FavouriteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favourite
     */
    select?: FavouriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favourite
     */
    omit?: FavouriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavouriteInclude<ExtArgs> | null
    /**
     * The data needed to create a Favourite.
     */
    data: XOR<FavouriteCreateInput, FavouriteUncheckedCreateInput>
  }

  /**
   * Favourite createMany
   */
  export type FavouriteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Favourites.
     */
    data: FavouriteCreateManyInput | FavouriteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Favourite createManyAndReturn
   */
  export type FavouriteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favourite
     */
    select?: FavouriteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Favourite
     */
    omit?: FavouriteOmit<ExtArgs> | null
    /**
     * The data used to create many Favourites.
     */
    data: FavouriteCreateManyInput | FavouriteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavouriteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Favourite update
   */
  export type FavouriteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favourite
     */
    select?: FavouriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favourite
     */
    omit?: FavouriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavouriteInclude<ExtArgs> | null
    /**
     * The data needed to update a Favourite.
     */
    data: XOR<FavouriteUpdateInput, FavouriteUncheckedUpdateInput>
    /**
     * Choose, which Favourite to update.
     */
    where: FavouriteWhereUniqueInput
  }

  /**
   * Favourite updateMany
   */
  export type FavouriteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Favourites.
     */
    data: XOR<FavouriteUpdateManyMutationInput, FavouriteUncheckedUpdateManyInput>
    /**
     * Filter which Favourites to update
     */
    where?: FavouriteWhereInput
    /**
     * Limit how many Favourites to update.
     */
    limit?: number
  }

  /**
   * Favourite updateManyAndReturn
   */
  export type FavouriteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favourite
     */
    select?: FavouriteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Favourite
     */
    omit?: FavouriteOmit<ExtArgs> | null
    /**
     * The data used to update Favourites.
     */
    data: XOR<FavouriteUpdateManyMutationInput, FavouriteUncheckedUpdateManyInput>
    /**
     * Filter which Favourites to update
     */
    where?: FavouriteWhereInput
    /**
     * Limit how many Favourites to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavouriteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Favourite upsert
   */
  export type FavouriteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favourite
     */
    select?: FavouriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favourite
     */
    omit?: FavouriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavouriteInclude<ExtArgs> | null
    /**
     * The filter to search for the Favourite to update in case it exists.
     */
    where: FavouriteWhereUniqueInput
    /**
     * In case the Favourite found by the `where` argument doesn't exist, create a new Favourite with this data.
     */
    create: XOR<FavouriteCreateInput, FavouriteUncheckedCreateInput>
    /**
     * In case the Favourite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FavouriteUpdateInput, FavouriteUncheckedUpdateInput>
  }

  /**
   * Favourite delete
   */
  export type FavouriteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favourite
     */
    select?: FavouriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favourite
     */
    omit?: FavouriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavouriteInclude<ExtArgs> | null
    /**
     * Filter which Favourite to delete.
     */
    where: FavouriteWhereUniqueInput
  }

  /**
   * Favourite deleteMany
   */
  export type FavouriteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Favourites to delete
     */
    where?: FavouriteWhereInput
    /**
     * Limit how many Favourites to delete.
     */
    limit?: number
  }

  /**
   * Favourite without action
   */
  export type FavouriteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favourite
     */
    select?: FavouriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favourite
     */
    omit?: FavouriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavouriteInclude<ExtArgs> | null
  }


  /**
   * Model LowStockReport
   */

  export type AggregateLowStockReport = {
    _count: LowStockReportCountAggregateOutputType | null
    _avg: LowStockReportAvgAggregateOutputType | null
    _sum: LowStockReportSumAggregateOutputType | null
    _min: LowStockReportMinAggregateOutputType | null
    _max: LowStockReportMaxAggregateOutputType | null
  }

  export type LowStockReportAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    vendorId: number | null
  }

  export type LowStockReportSumAggregateOutputType = {
    id: number | null
    userId: number | null
    vendorId: number | null
  }

  export type LowStockReportMinAggregateOutputType = {
    id: number | null
    userId: number | null
    vendorId: number | null
    comment: string | null
    photoUrl: string | null
    createdAt: Date | null
  }

  export type LowStockReportMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    vendorId: number | null
    comment: string | null
    photoUrl: string | null
    createdAt: Date | null
  }

  export type LowStockReportCountAggregateOutputType = {
    id: number
    userId: number
    vendorId: number
    comment: number
    photoUrl: number
    createdAt: number
    _all: number
  }


  export type LowStockReportAvgAggregateInputType = {
    id?: true
    userId?: true
    vendorId?: true
  }

  export type LowStockReportSumAggregateInputType = {
    id?: true
    userId?: true
    vendorId?: true
  }

  export type LowStockReportMinAggregateInputType = {
    id?: true
    userId?: true
    vendorId?: true
    comment?: true
    photoUrl?: true
    createdAt?: true
  }

  export type LowStockReportMaxAggregateInputType = {
    id?: true
    userId?: true
    vendorId?: true
    comment?: true
    photoUrl?: true
    createdAt?: true
  }

  export type LowStockReportCountAggregateInputType = {
    id?: true
    userId?: true
    vendorId?: true
    comment?: true
    photoUrl?: true
    createdAt?: true
    _all?: true
  }

  export type LowStockReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LowStockReport to aggregate.
     */
    where?: LowStockReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LowStockReports to fetch.
     */
    orderBy?: LowStockReportOrderByWithRelationInput | LowStockReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LowStockReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LowStockReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LowStockReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LowStockReports
    **/
    _count?: true | LowStockReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LowStockReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LowStockReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LowStockReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LowStockReportMaxAggregateInputType
  }

  export type GetLowStockReportAggregateType<T extends LowStockReportAggregateArgs> = {
        [P in keyof T & keyof AggregateLowStockReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLowStockReport[P]>
      : GetScalarType<T[P], AggregateLowStockReport[P]>
  }




  export type LowStockReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LowStockReportWhereInput
    orderBy?: LowStockReportOrderByWithAggregationInput | LowStockReportOrderByWithAggregationInput[]
    by: LowStockReportScalarFieldEnum[] | LowStockReportScalarFieldEnum
    having?: LowStockReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LowStockReportCountAggregateInputType | true
    _avg?: LowStockReportAvgAggregateInputType
    _sum?: LowStockReportSumAggregateInputType
    _min?: LowStockReportMinAggregateInputType
    _max?: LowStockReportMaxAggregateInputType
  }

  export type LowStockReportGroupByOutputType = {
    id: number
    userId: number
    vendorId: number
    comment: string | null
    photoUrl: string | null
    createdAt: Date
    _count: LowStockReportCountAggregateOutputType | null
    _avg: LowStockReportAvgAggregateOutputType | null
    _sum: LowStockReportSumAggregateOutputType | null
    _min: LowStockReportMinAggregateOutputType | null
    _max: LowStockReportMaxAggregateOutputType | null
  }

  type GetLowStockReportGroupByPayload<T extends LowStockReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LowStockReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LowStockReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LowStockReportGroupByOutputType[P]>
            : GetScalarType<T[P], LowStockReportGroupByOutputType[P]>
        }
      >
    >


  export type LowStockReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    vendorId?: boolean
    comment?: boolean
    photoUrl?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lowStockReport"]>

  export type LowStockReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    vendorId?: boolean
    comment?: boolean
    photoUrl?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lowStockReport"]>

  export type LowStockReportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    vendorId?: boolean
    comment?: boolean
    photoUrl?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lowStockReport"]>

  export type LowStockReportSelectScalar = {
    id?: boolean
    userId?: boolean
    vendorId?: boolean
    comment?: boolean
    photoUrl?: boolean
    createdAt?: boolean
  }

  export type LowStockReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "vendorId" | "comment" | "photoUrl" | "createdAt", ExtArgs["result"]["lowStockReport"]>
  export type LowStockReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
  }
  export type LowStockReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
  }
  export type LowStockReportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
  }

  export type $LowStockReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LowStockReport"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      vendor: Prisma.$VendorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      vendorId: number
      comment: string | null
      photoUrl: string | null
      createdAt: Date
    }, ExtArgs["result"]["lowStockReport"]>
    composites: {}
  }

  type LowStockReportGetPayload<S extends boolean | null | undefined | LowStockReportDefaultArgs> = $Result.GetResult<Prisma.$LowStockReportPayload, S>

  type LowStockReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LowStockReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LowStockReportCountAggregateInputType | true
    }

  export interface LowStockReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LowStockReport'], meta: { name: 'LowStockReport' } }
    /**
     * Find zero or one LowStockReport that matches the filter.
     * @param {LowStockReportFindUniqueArgs} args - Arguments to find a LowStockReport
     * @example
     * // Get one LowStockReport
     * const lowStockReport = await prisma.lowStockReport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LowStockReportFindUniqueArgs>(args: SelectSubset<T, LowStockReportFindUniqueArgs<ExtArgs>>): Prisma__LowStockReportClient<$Result.GetResult<Prisma.$LowStockReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LowStockReport that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LowStockReportFindUniqueOrThrowArgs} args - Arguments to find a LowStockReport
     * @example
     * // Get one LowStockReport
     * const lowStockReport = await prisma.lowStockReport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LowStockReportFindUniqueOrThrowArgs>(args: SelectSubset<T, LowStockReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LowStockReportClient<$Result.GetResult<Prisma.$LowStockReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LowStockReport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LowStockReportFindFirstArgs} args - Arguments to find a LowStockReport
     * @example
     * // Get one LowStockReport
     * const lowStockReport = await prisma.lowStockReport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LowStockReportFindFirstArgs>(args?: SelectSubset<T, LowStockReportFindFirstArgs<ExtArgs>>): Prisma__LowStockReportClient<$Result.GetResult<Prisma.$LowStockReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LowStockReport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LowStockReportFindFirstOrThrowArgs} args - Arguments to find a LowStockReport
     * @example
     * // Get one LowStockReport
     * const lowStockReport = await prisma.lowStockReport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LowStockReportFindFirstOrThrowArgs>(args?: SelectSubset<T, LowStockReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__LowStockReportClient<$Result.GetResult<Prisma.$LowStockReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LowStockReports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LowStockReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LowStockReports
     * const lowStockReports = await prisma.lowStockReport.findMany()
     * 
     * // Get first 10 LowStockReports
     * const lowStockReports = await prisma.lowStockReport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lowStockReportWithIdOnly = await prisma.lowStockReport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LowStockReportFindManyArgs>(args?: SelectSubset<T, LowStockReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LowStockReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LowStockReport.
     * @param {LowStockReportCreateArgs} args - Arguments to create a LowStockReport.
     * @example
     * // Create one LowStockReport
     * const LowStockReport = await prisma.lowStockReport.create({
     *   data: {
     *     // ... data to create a LowStockReport
     *   }
     * })
     * 
     */
    create<T extends LowStockReportCreateArgs>(args: SelectSubset<T, LowStockReportCreateArgs<ExtArgs>>): Prisma__LowStockReportClient<$Result.GetResult<Prisma.$LowStockReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LowStockReports.
     * @param {LowStockReportCreateManyArgs} args - Arguments to create many LowStockReports.
     * @example
     * // Create many LowStockReports
     * const lowStockReport = await prisma.lowStockReport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LowStockReportCreateManyArgs>(args?: SelectSubset<T, LowStockReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LowStockReports and returns the data saved in the database.
     * @param {LowStockReportCreateManyAndReturnArgs} args - Arguments to create many LowStockReports.
     * @example
     * // Create many LowStockReports
     * const lowStockReport = await prisma.lowStockReport.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LowStockReports and only return the `id`
     * const lowStockReportWithIdOnly = await prisma.lowStockReport.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LowStockReportCreateManyAndReturnArgs>(args?: SelectSubset<T, LowStockReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LowStockReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LowStockReport.
     * @param {LowStockReportDeleteArgs} args - Arguments to delete one LowStockReport.
     * @example
     * // Delete one LowStockReport
     * const LowStockReport = await prisma.lowStockReport.delete({
     *   where: {
     *     // ... filter to delete one LowStockReport
     *   }
     * })
     * 
     */
    delete<T extends LowStockReportDeleteArgs>(args: SelectSubset<T, LowStockReportDeleteArgs<ExtArgs>>): Prisma__LowStockReportClient<$Result.GetResult<Prisma.$LowStockReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LowStockReport.
     * @param {LowStockReportUpdateArgs} args - Arguments to update one LowStockReport.
     * @example
     * // Update one LowStockReport
     * const lowStockReport = await prisma.lowStockReport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LowStockReportUpdateArgs>(args: SelectSubset<T, LowStockReportUpdateArgs<ExtArgs>>): Prisma__LowStockReportClient<$Result.GetResult<Prisma.$LowStockReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LowStockReports.
     * @param {LowStockReportDeleteManyArgs} args - Arguments to filter LowStockReports to delete.
     * @example
     * // Delete a few LowStockReports
     * const { count } = await prisma.lowStockReport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LowStockReportDeleteManyArgs>(args?: SelectSubset<T, LowStockReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LowStockReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LowStockReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LowStockReports
     * const lowStockReport = await prisma.lowStockReport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LowStockReportUpdateManyArgs>(args: SelectSubset<T, LowStockReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LowStockReports and returns the data updated in the database.
     * @param {LowStockReportUpdateManyAndReturnArgs} args - Arguments to update many LowStockReports.
     * @example
     * // Update many LowStockReports
     * const lowStockReport = await prisma.lowStockReport.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LowStockReports and only return the `id`
     * const lowStockReportWithIdOnly = await prisma.lowStockReport.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LowStockReportUpdateManyAndReturnArgs>(args: SelectSubset<T, LowStockReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LowStockReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LowStockReport.
     * @param {LowStockReportUpsertArgs} args - Arguments to update or create a LowStockReport.
     * @example
     * // Update or create a LowStockReport
     * const lowStockReport = await prisma.lowStockReport.upsert({
     *   create: {
     *     // ... data to create a LowStockReport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LowStockReport we want to update
     *   }
     * })
     */
    upsert<T extends LowStockReportUpsertArgs>(args: SelectSubset<T, LowStockReportUpsertArgs<ExtArgs>>): Prisma__LowStockReportClient<$Result.GetResult<Prisma.$LowStockReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LowStockReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LowStockReportCountArgs} args - Arguments to filter LowStockReports to count.
     * @example
     * // Count the number of LowStockReports
     * const count = await prisma.lowStockReport.count({
     *   where: {
     *     // ... the filter for the LowStockReports we want to count
     *   }
     * })
    **/
    count<T extends LowStockReportCountArgs>(
      args?: Subset<T, LowStockReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LowStockReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LowStockReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LowStockReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LowStockReportAggregateArgs>(args: Subset<T, LowStockReportAggregateArgs>): Prisma.PrismaPromise<GetLowStockReportAggregateType<T>>

    /**
     * Group by LowStockReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LowStockReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LowStockReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LowStockReportGroupByArgs['orderBy'] }
        : { orderBy?: LowStockReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LowStockReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLowStockReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LowStockReport model
   */
  readonly fields: LowStockReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LowStockReport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LowStockReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    vendor<T extends VendorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VendorDefaultArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LowStockReport model
   */
  interface LowStockReportFieldRefs {
    readonly id: FieldRef<"LowStockReport", 'Int'>
    readonly userId: FieldRef<"LowStockReport", 'Int'>
    readonly vendorId: FieldRef<"LowStockReport", 'Int'>
    readonly comment: FieldRef<"LowStockReport", 'String'>
    readonly photoUrl: FieldRef<"LowStockReport", 'String'>
    readonly createdAt: FieldRef<"LowStockReport", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LowStockReport findUnique
   */
  export type LowStockReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LowStockReport
     */
    select?: LowStockReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LowStockReport
     */
    omit?: LowStockReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LowStockReportInclude<ExtArgs> | null
    /**
     * Filter, which LowStockReport to fetch.
     */
    where: LowStockReportWhereUniqueInput
  }

  /**
   * LowStockReport findUniqueOrThrow
   */
  export type LowStockReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LowStockReport
     */
    select?: LowStockReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LowStockReport
     */
    omit?: LowStockReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LowStockReportInclude<ExtArgs> | null
    /**
     * Filter, which LowStockReport to fetch.
     */
    where: LowStockReportWhereUniqueInput
  }

  /**
   * LowStockReport findFirst
   */
  export type LowStockReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LowStockReport
     */
    select?: LowStockReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LowStockReport
     */
    omit?: LowStockReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LowStockReportInclude<ExtArgs> | null
    /**
     * Filter, which LowStockReport to fetch.
     */
    where?: LowStockReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LowStockReports to fetch.
     */
    orderBy?: LowStockReportOrderByWithRelationInput | LowStockReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LowStockReports.
     */
    cursor?: LowStockReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LowStockReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LowStockReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LowStockReports.
     */
    distinct?: LowStockReportScalarFieldEnum | LowStockReportScalarFieldEnum[]
  }

  /**
   * LowStockReport findFirstOrThrow
   */
  export type LowStockReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LowStockReport
     */
    select?: LowStockReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LowStockReport
     */
    omit?: LowStockReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LowStockReportInclude<ExtArgs> | null
    /**
     * Filter, which LowStockReport to fetch.
     */
    where?: LowStockReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LowStockReports to fetch.
     */
    orderBy?: LowStockReportOrderByWithRelationInput | LowStockReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LowStockReports.
     */
    cursor?: LowStockReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LowStockReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LowStockReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LowStockReports.
     */
    distinct?: LowStockReportScalarFieldEnum | LowStockReportScalarFieldEnum[]
  }

  /**
   * LowStockReport findMany
   */
  export type LowStockReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LowStockReport
     */
    select?: LowStockReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LowStockReport
     */
    omit?: LowStockReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LowStockReportInclude<ExtArgs> | null
    /**
     * Filter, which LowStockReports to fetch.
     */
    where?: LowStockReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LowStockReports to fetch.
     */
    orderBy?: LowStockReportOrderByWithRelationInput | LowStockReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LowStockReports.
     */
    cursor?: LowStockReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LowStockReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LowStockReports.
     */
    skip?: number
    distinct?: LowStockReportScalarFieldEnum | LowStockReportScalarFieldEnum[]
  }

  /**
   * LowStockReport create
   */
  export type LowStockReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LowStockReport
     */
    select?: LowStockReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LowStockReport
     */
    omit?: LowStockReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LowStockReportInclude<ExtArgs> | null
    /**
     * The data needed to create a LowStockReport.
     */
    data: XOR<LowStockReportCreateInput, LowStockReportUncheckedCreateInput>
  }

  /**
   * LowStockReport createMany
   */
  export type LowStockReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LowStockReports.
     */
    data: LowStockReportCreateManyInput | LowStockReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LowStockReport createManyAndReturn
   */
  export type LowStockReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LowStockReport
     */
    select?: LowStockReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LowStockReport
     */
    omit?: LowStockReportOmit<ExtArgs> | null
    /**
     * The data used to create many LowStockReports.
     */
    data: LowStockReportCreateManyInput | LowStockReportCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LowStockReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LowStockReport update
   */
  export type LowStockReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LowStockReport
     */
    select?: LowStockReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LowStockReport
     */
    omit?: LowStockReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LowStockReportInclude<ExtArgs> | null
    /**
     * The data needed to update a LowStockReport.
     */
    data: XOR<LowStockReportUpdateInput, LowStockReportUncheckedUpdateInput>
    /**
     * Choose, which LowStockReport to update.
     */
    where: LowStockReportWhereUniqueInput
  }

  /**
   * LowStockReport updateMany
   */
  export type LowStockReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LowStockReports.
     */
    data: XOR<LowStockReportUpdateManyMutationInput, LowStockReportUncheckedUpdateManyInput>
    /**
     * Filter which LowStockReports to update
     */
    where?: LowStockReportWhereInput
    /**
     * Limit how many LowStockReports to update.
     */
    limit?: number
  }

  /**
   * LowStockReport updateManyAndReturn
   */
  export type LowStockReportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LowStockReport
     */
    select?: LowStockReportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LowStockReport
     */
    omit?: LowStockReportOmit<ExtArgs> | null
    /**
     * The data used to update LowStockReports.
     */
    data: XOR<LowStockReportUpdateManyMutationInput, LowStockReportUncheckedUpdateManyInput>
    /**
     * Filter which LowStockReports to update
     */
    where?: LowStockReportWhereInput
    /**
     * Limit how many LowStockReports to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LowStockReportIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LowStockReport upsert
   */
  export type LowStockReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LowStockReport
     */
    select?: LowStockReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LowStockReport
     */
    omit?: LowStockReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LowStockReportInclude<ExtArgs> | null
    /**
     * The filter to search for the LowStockReport to update in case it exists.
     */
    where: LowStockReportWhereUniqueInput
    /**
     * In case the LowStockReport found by the `where` argument doesn't exist, create a new LowStockReport with this data.
     */
    create: XOR<LowStockReportCreateInput, LowStockReportUncheckedCreateInput>
    /**
     * In case the LowStockReport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LowStockReportUpdateInput, LowStockReportUncheckedUpdateInput>
  }

  /**
   * LowStockReport delete
   */
  export type LowStockReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LowStockReport
     */
    select?: LowStockReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LowStockReport
     */
    omit?: LowStockReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LowStockReportInclude<ExtArgs> | null
    /**
     * Filter which LowStockReport to delete.
     */
    where: LowStockReportWhereUniqueInput
  }

  /**
   * LowStockReport deleteMany
   */
  export type LowStockReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LowStockReports to delete
     */
    where?: LowStockReportWhereInput
    /**
     * Limit how many LowStockReports to delete.
     */
    limit?: number
  }

  /**
   * LowStockReport without action
   */
  export type LowStockReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LowStockReport
     */
    select?: LowStockReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LowStockReport
     */
    omit?: LowStockReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LowStockReportInclude<ExtArgs> | null
  }


  /**
   * Model SubmittedVendor
   */

  export type AggregateSubmittedVendor = {
    _count: SubmittedVendorCountAggregateOutputType | null
    _avg: SubmittedVendorAvgAggregateOutputType | null
    _sum: SubmittedVendorSumAggregateOutputType | null
    _min: SubmittedVendorMinAggregateOutputType | null
    _max: SubmittedVendorMaxAggregateOutputType | null
  }

  export type SubmittedVendorAvgAggregateOutputType = {
    id: number | null
    submitterId: number | null
  }

  export type SubmittedVendorSumAggregateOutputType = {
    id: number | null
    submitterId: number | null
  }

  export type SubmittedVendorMinAggregateOutputType = {
    id: number | null
    submitterId: number | null
    name: string | null
    type: string | null
    description: string | null
    photoUrl: string | null
    createdAt: Date | null
  }

  export type SubmittedVendorMaxAggregateOutputType = {
    id: number | null
    submitterId: number | null
    name: string | null
    type: string | null
    description: string | null
    photoUrl: string | null
    createdAt: Date | null
  }

  export type SubmittedVendorCountAggregateOutputType = {
    id: number
    submitterId: number
    name: number
    type: number
    description: number
    photoUrl: number
    createdAt: number
    _all: number
  }


  export type SubmittedVendorAvgAggregateInputType = {
    id?: true
    submitterId?: true
  }

  export type SubmittedVendorSumAggregateInputType = {
    id?: true
    submitterId?: true
  }

  export type SubmittedVendorMinAggregateInputType = {
    id?: true
    submitterId?: true
    name?: true
    type?: true
    description?: true
    photoUrl?: true
    createdAt?: true
  }

  export type SubmittedVendorMaxAggregateInputType = {
    id?: true
    submitterId?: true
    name?: true
    type?: true
    description?: true
    photoUrl?: true
    createdAt?: true
  }

  export type SubmittedVendorCountAggregateInputType = {
    id?: true
    submitterId?: true
    name?: true
    type?: true
    description?: true
    photoUrl?: true
    createdAt?: true
    _all?: true
  }

  export type SubmittedVendorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubmittedVendor to aggregate.
     */
    where?: SubmittedVendorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubmittedVendors to fetch.
     */
    orderBy?: SubmittedVendorOrderByWithRelationInput | SubmittedVendorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubmittedVendorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubmittedVendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubmittedVendors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SubmittedVendors
    **/
    _count?: true | SubmittedVendorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubmittedVendorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubmittedVendorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubmittedVendorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubmittedVendorMaxAggregateInputType
  }

  export type GetSubmittedVendorAggregateType<T extends SubmittedVendorAggregateArgs> = {
        [P in keyof T & keyof AggregateSubmittedVendor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubmittedVendor[P]>
      : GetScalarType<T[P], AggregateSubmittedVendor[P]>
  }




  export type SubmittedVendorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmittedVendorWhereInput
    orderBy?: SubmittedVendorOrderByWithAggregationInput | SubmittedVendorOrderByWithAggregationInput[]
    by: SubmittedVendorScalarFieldEnum[] | SubmittedVendorScalarFieldEnum
    having?: SubmittedVendorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubmittedVendorCountAggregateInputType | true
    _avg?: SubmittedVendorAvgAggregateInputType
    _sum?: SubmittedVendorSumAggregateInputType
    _min?: SubmittedVendorMinAggregateInputType
    _max?: SubmittedVendorMaxAggregateInputType
  }

  export type SubmittedVendorGroupByOutputType = {
    id: number
    submitterId: number
    name: string
    type: string
    description: string | null
    photoUrl: string | null
    createdAt: Date
    _count: SubmittedVendorCountAggregateOutputType | null
    _avg: SubmittedVendorAvgAggregateOutputType | null
    _sum: SubmittedVendorSumAggregateOutputType | null
    _min: SubmittedVendorMinAggregateOutputType | null
    _max: SubmittedVendorMaxAggregateOutputType | null
  }

  type GetSubmittedVendorGroupByPayload<T extends SubmittedVendorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubmittedVendorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubmittedVendorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubmittedVendorGroupByOutputType[P]>
            : GetScalarType<T[P], SubmittedVendorGroupByOutputType[P]>
        }
      >
    >


  export type SubmittedVendorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    submitterId?: boolean
    name?: boolean
    type?: boolean
    description?: boolean
    photoUrl?: boolean
    createdAt?: boolean
    submitter?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["submittedVendor"]>

  export type SubmittedVendorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    submitterId?: boolean
    name?: boolean
    type?: boolean
    description?: boolean
    photoUrl?: boolean
    createdAt?: boolean
    submitter?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["submittedVendor"]>

  export type SubmittedVendorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    submitterId?: boolean
    name?: boolean
    type?: boolean
    description?: boolean
    photoUrl?: boolean
    createdAt?: boolean
    submitter?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["submittedVendor"]>

  export type SubmittedVendorSelectScalar = {
    id?: boolean
    submitterId?: boolean
    name?: boolean
    type?: boolean
    description?: boolean
    photoUrl?: boolean
    createdAt?: boolean
  }

  export type SubmittedVendorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "submitterId" | "name" | "type" | "description" | "photoUrl" | "createdAt", ExtArgs["result"]["submittedVendor"]>
  export type SubmittedVendorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submitter?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SubmittedVendorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submitter?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SubmittedVendorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submitter?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SubmittedVendorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SubmittedVendor"
    objects: {
      submitter: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      submitterId: number
      name: string
      type: string
      description: string | null
      photoUrl: string | null
      createdAt: Date
    }, ExtArgs["result"]["submittedVendor"]>
    composites: {}
  }

  type SubmittedVendorGetPayload<S extends boolean | null | undefined | SubmittedVendorDefaultArgs> = $Result.GetResult<Prisma.$SubmittedVendorPayload, S>

  type SubmittedVendorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubmittedVendorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubmittedVendorCountAggregateInputType | true
    }

  export interface SubmittedVendorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SubmittedVendor'], meta: { name: 'SubmittedVendor' } }
    /**
     * Find zero or one SubmittedVendor that matches the filter.
     * @param {SubmittedVendorFindUniqueArgs} args - Arguments to find a SubmittedVendor
     * @example
     * // Get one SubmittedVendor
     * const submittedVendor = await prisma.submittedVendor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubmittedVendorFindUniqueArgs>(args: SelectSubset<T, SubmittedVendorFindUniqueArgs<ExtArgs>>): Prisma__SubmittedVendorClient<$Result.GetResult<Prisma.$SubmittedVendorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SubmittedVendor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubmittedVendorFindUniqueOrThrowArgs} args - Arguments to find a SubmittedVendor
     * @example
     * // Get one SubmittedVendor
     * const submittedVendor = await prisma.submittedVendor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubmittedVendorFindUniqueOrThrowArgs>(args: SelectSubset<T, SubmittedVendorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubmittedVendorClient<$Result.GetResult<Prisma.$SubmittedVendorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubmittedVendor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmittedVendorFindFirstArgs} args - Arguments to find a SubmittedVendor
     * @example
     * // Get one SubmittedVendor
     * const submittedVendor = await prisma.submittedVendor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubmittedVendorFindFirstArgs>(args?: SelectSubset<T, SubmittedVendorFindFirstArgs<ExtArgs>>): Prisma__SubmittedVendorClient<$Result.GetResult<Prisma.$SubmittedVendorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubmittedVendor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmittedVendorFindFirstOrThrowArgs} args - Arguments to find a SubmittedVendor
     * @example
     * // Get one SubmittedVendor
     * const submittedVendor = await prisma.submittedVendor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubmittedVendorFindFirstOrThrowArgs>(args?: SelectSubset<T, SubmittedVendorFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubmittedVendorClient<$Result.GetResult<Prisma.$SubmittedVendorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SubmittedVendors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmittedVendorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SubmittedVendors
     * const submittedVendors = await prisma.submittedVendor.findMany()
     * 
     * // Get first 10 SubmittedVendors
     * const submittedVendors = await prisma.submittedVendor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const submittedVendorWithIdOnly = await prisma.submittedVendor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubmittedVendorFindManyArgs>(args?: SelectSubset<T, SubmittedVendorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmittedVendorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SubmittedVendor.
     * @param {SubmittedVendorCreateArgs} args - Arguments to create a SubmittedVendor.
     * @example
     * // Create one SubmittedVendor
     * const SubmittedVendor = await prisma.submittedVendor.create({
     *   data: {
     *     // ... data to create a SubmittedVendor
     *   }
     * })
     * 
     */
    create<T extends SubmittedVendorCreateArgs>(args: SelectSubset<T, SubmittedVendorCreateArgs<ExtArgs>>): Prisma__SubmittedVendorClient<$Result.GetResult<Prisma.$SubmittedVendorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SubmittedVendors.
     * @param {SubmittedVendorCreateManyArgs} args - Arguments to create many SubmittedVendors.
     * @example
     * // Create many SubmittedVendors
     * const submittedVendor = await prisma.submittedVendor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubmittedVendorCreateManyArgs>(args?: SelectSubset<T, SubmittedVendorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SubmittedVendors and returns the data saved in the database.
     * @param {SubmittedVendorCreateManyAndReturnArgs} args - Arguments to create many SubmittedVendors.
     * @example
     * // Create many SubmittedVendors
     * const submittedVendor = await prisma.submittedVendor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SubmittedVendors and only return the `id`
     * const submittedVendorWithIdOnly = await prisma.submittedVendor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubmittedVendorCreateManyAndReturnArgs>(args?: SelectSubset<T, SubmittedVendorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmittedVendorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SubmittedVendor.
     * @param {SubmittedVendorDeleteArgs} args - Arguments to delete one SubmittedVendor.
     * @example
     * // Delete one SubmittedVendor
     * const SubmittedVendor = await prisma.submittedVendor.delete({
     *   where: {
     *     // ... filter to delete one SubmittedVendor
     *   }
     * })
     * 
     */
    delete<T extends SubmittedVendorDeleteArgs>(args: SelectSubset<T, SubmittedVendorDeleteArgs<ExtArgs>>): Prisma__SubmittedVendorClient<$Result.GetResult<Prisma.$SubmittedVendorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SubmittedVendor.
     * @param {SubmittedVendorUpdateArgs} args - Arguments to update one SubmittedVendor.
     * @example
     * // Update one SubmittedVendor
     * const submittedVendor = await prisma.submittedVendor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubmittedVendorUpdateArgs>(args: SelectSubset<T, SubmittedVendorUpdateArgs<ExtArgs>>): Prisma__SubmittedVendorClient<$Result.GetResult<Prisma.$SubmittedVendorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SubmittedVendors.
     * @param {SubmittedVendorDeleteManyArgs} args - Arguments to filter SubmittedVendors to delete.
     * @example
     * // Delete a few SubmittedVendors
     * const { count } = await prisma.submittedVendor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubmittedVendorDeleteManyArgs>(args?: SelectSubset<T, SubmittedVendorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubmittedVendors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmittedVendorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SubmittedVendors
     * const submittedVendor = await prisma.submittedVendor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubmittedVendorUpdateManyArgs>(args: SelectSubset<T, SubmittedVendorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubmittedVendors and returns the data updated in the database.
     * @param {SubmittedVendorUpdateManyAndReturnArgs} args - Arguments to update many SubmittedVendors.
     * @example
     * // Update many SubmittedVendors
     * const submittedVendor = await prisma.submittedVendor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SubmittedVendors and only return the `id`
     * const submittedVendorWithIdOnly = await prisma.submittedVendor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubmittedVendorUpdateManyAndReturnArgs>(args: SelectSubset<T, SubmittedVendorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmittedVendorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SubmittedVendor.
     * @param {SubmittedVendorUpsertArgs} args - Arguments to update or create a SubmittedVendor.
     * @example
     * // Update or create a SubmittedVendor
     * const submittedVendor = await prisma.submittedVendor.upsert({
     *   create: {
     *     // ... data to create a SubmittedVendor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SubmittedVendor we want to update
     *   }
     * })
     */
    upsert<T extends SubmittedVendorUpsertArgs>(args: SelectSubset<T, SubmittedVendorUpsertArgs<ExtArgs>>): Prisma__SubmittedVendorClient<$Result.GetResult<Prisma.$SubmittedVendorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SubmittedVendors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmittedVendorCountArgs} args - Arguments to filter SubmittedVendors to count.
     * @example
     * // Count the number of SubmittedVendors
     * const count = await prisma.submittedVendor.count({
     *   where: {
     *     // ... the filter for the SubmittedVendors we want to count
     *   }
     * })
    **/
    count<T extends SubmittedVendorCountArgs>(
      args?: Subset<T, SubmittedVendorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubmittedVendorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SubmittedVendor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmittedVendorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubmittedVendorAggregateArgs>(args: Subset<T, SubmittedVendorAggregateArgs>): Prisma.PrismaPromise<GetSubmittedVendorAggregateType<T>>

    /**
     * Group by SubmittedVendor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmittedVendorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubmittedVendorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubmittedVendorGroupByArgs['orderBy'] }
        : { orderBy?: SubmittedVendorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubmittedVendorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubmittedVendorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SubmittedVendor model
   */
  readonly fields: SubmittedVendorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SubmittedVendor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubmittedVendorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    submitter<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SubmittedVendor model
   */
  interface SubmittedVendorFieldRefs {
    readonly id: FieldRef<"SubmittedVendor", 'Int'>
    readonly submitterId: FieldRef<"SubmittedVendor", 'Int'>
    readonly name: FieldRef<"SubmittedVendor", 'String'>
    readonly type: FieldRef<"SubmittedVendor", 'String'>
    readonly description: FieldRef<"SubmittedVendor", 'String'>
    readonly photoUrl: FieldRef<"SubmittedVendor", 'String'>
    readonly createdAt: FieldRef<"SubmittedVendor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SubmittedVendor findUnique
   */
  export type SubmittedVendorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmittedVendor
     */
    select?: SubmittedVendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmittedVendor
     */
    omit?: SubmittedVendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmittedVendorInclude<ExtArgs> | null
    /**
     * Filter, which SubmittedVendor to fetch.
     */
    where: SubmittedVendorWhereUniqueInput
  }

  /**
   * SubmittedVendor findUniqueOrThrow
   */
  export type SubmittedVendorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmittedVendor
     */
    select?: SubmittedVendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmittedVendor
     */
    omit?: SubmittedVendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmittedVendorInclude<ExtArgs> | null
    /**
     * Filter, which SubmittedVendor to fetch.
     */
    where: SubmittedVendorWhereUniqueInput
  }

  /**
   * SubmittedVendor findFirst
   */
  export type SubmittedVendorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmittedVendor
     */
    select?: SubmittedVendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmittedVendor
     */
    omit?: SubmittedVendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmittedVendorInclude<ExtArgs> | null
    /**
     * Filter, which SubmittedVendor to fetch.
     */
    where?: SubmittedVendorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubmittedVendors to fetch.
     */
    orderBy?: SubmittedVendorOrderByWithRelationInput | SubmittedVendorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubmittedVendors.
     */
    cursor?: SubmittedVendorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubmittedVendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubmittedVendors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubmittedVendors.
     */
    distinct?: SubmittedVendorScalarFieldEnum | SubmittedVendorScalarFieldEnum[]
  }

  /**
   * SubmittedVendor findFirstOrThrow
   */
  export type SubmittedVendorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmittedVendor
     */
    select?: SubmittedVendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmittedVendor
     */
    omit?: SubmittedVendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmittedVendorInclude<ExtArgs> | null
    /**
     * Filter, which SubmittedVendor to fetch.
     */
    where?: SubmittedVendorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubmittedVendors to fetch.
     */
    orderBy?: SubmittedVendorOrderByWithRelationInput | SubmittedVendorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubmittedVendors.
     */
    cursor?: SubmittedVendorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubmittedVendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubmittedVendors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubmittedVendors.
     */
    distinct?: SubmittedVendorScalarFieldEnum | SubmittedVendorScalarFieldEnum[]
  }

  /**
   * SubmittedVendor findMany
   */
  export type SubmittedVendorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmittedVendor
     */
    select?: SubmittedVendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmittedVendor
     */
    omit?: SubmittedVendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmittedVendorInclude<ExtArgs> | null
    /**
     * Filter, which SubmittedVendors to fetch.
     */
    where?: SubmittedVendorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubmittedVendors to fetch.
     */
    orderBy?: SubmittedVendorOrderByWithRelationInput | SubmittedVendorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SubmittedVendors.
     */
    cursor?: SubmittedVendorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubmittedVendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubmittedVendors.
     */
    skip?: number
    distinct?: SubmittedVendorScalarFieldEnum | SubmittedVendorScalarFieldEnum[]
  }

  /**
   * SubmittedVendor create
   */
  export type SubmittedVendorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmittedVendor
     */
    select?: SubmittedVendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmittedVendor
     */
    omit?: SubmittedVendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmittedVendorInclude<ExtArgs> | null
    /**
     * The data needed to create a SubmittedVendor.
     */
    data: XOR<SubmittedVendorCreateInput, SubmittedVendorUncheckedCreateInput>
  }

  /**
   * SubmittedVendor createMany
   */
  export type SubmittedVendorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SubmittedVendors.
     */
    data: SubmittedVendorCreateManyInput | SubmittedVendorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SubmittedVendor createManyAndReturn
   */
  export type SubmittedVendorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmittedVendor
     */
    select?: SubmittedVendorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubmittedVendor
     */
    omit?: SubmittedVendorOmit<ExtArgs> | null
    /**
     * The data used to create many SubmittedVendors.
     */
    data: SubmittedVendorCreateManyInput | SubmittedVendorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmittedVendorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubmittedVendor update
   */
  export type SubmittedVendorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmittedVendor
     */
    select?: SubmittedVendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmittedVendor
     */
    omit?: SubmittedVendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmittedVendorInclude<ExtArgs> | null
    /**
     * The data needed to update a SubmittedVendor.
     */
    data: XOR<SubmittedVendorUpdateInput, SubmittedVendorUncheckedUpdateInput>
    /**
     * Choose, which SubmittedVendor to update.
     */
    where: SubmittedVendorWhereUniqueInput
  }

  /**
   * SubmittedVendor updateMany
   */
  export type SubmittedVendorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SubmittedVendors.
     */
    data: XOR<SubmittedVendorUpdateManyMutationInput, SubmittedVendorUncheckedUpdateManyInput>
    /**
     * Filter which SubmittedVendors to update
     */
    where?: SubmittedVendorWhereInput
    /**
     * Limit how many SubmittedVendors to update.
     */
    limit?: number
  }

  /**
   * SubmittedVendor updateManyAndReturn
   */
  export type SubmittedVendorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmittedVendor
     */
    select?: SubmittedVendorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubmittedVendor
     */
    omit?: SubmittedVendorOmit<ExtArgs> | null
    /**
     * The data used to update SubmittedVendors.
     */
    data: XOR<SubmittedVendorUpdateManyMutationInput, SubmittedVendorUncheckedUpdateManyInput>
    /**
     * Filter which SubmittedVendors to update
     */
    where?: SubmittedVendorWhereInput
    /**
     * Limit how many SubmittedVendors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmittedVendorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubmittedVendor upsert
   */
  export type SubmittedVendorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmittedVendor
     */
    select?: SubmittedVendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmittedVendor
     */
    omit?: SubmittedVendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmittedVendorInclude<ExtArgs> | null
    /**
     * The filter to search for the SubmittedVendor to update in case it exists.
     */
    where: SubmittedVendorWhereUniqueInput
    /**
     * In case the SubmittedVendor found by the `where` argument doesn't exist, create a new SubmittedVendor with this data.
     */
    create: XOR<SubmittedVendorCreateInput, SubmittedVendorUncheckedCreateInput>
    /**
     * In case the SubmittedVendor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubmittedVendorUpdateInput, SubmittedVendorUncheckedUpdateInput>
  }

  /**
   * SubmittedVendor delete
   */
  export type SubmittedVendorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmittedVendor
     */
    select?: SubmittedVendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmittedVendor
     */
    omit?: SubmittedVendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmittedVendorInclude<ExtArgs> | null
    /**
     * Filter which SubmittedVendor to delete.
     */
    where: SubmittedVendorWhereUniqueInput
  }

  /**
   * SubmittedVendor deleteMany
   */
  export type SubmittedVendorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubmittedVendors to delete
     */
    where?: SubmittedVendorWhereInput
    /**
     * Limit how many SubmittedVendors to delete.
     */
    limit?: number
  }

  /**
   * SubmittedVendor without action
   */
  export type SubmittedVendorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmittedVendor
     */
    select?: SubmittedVendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmittedVendor
     */
    omit?: SubmittedVendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmittedVendorInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const VendorScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    hours: 'hours',
    isVerified: 'isVerified',
    photos: 'photos',
    paymentMethods: 'paymentMethods',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ownerId: 'ownerId'
  };

  export type VendorScalarFieldEnum = (typeof VendorScalarFieldEnum)[keyof typeof VendorScalarFieldEnum]


  export const VendorTypeScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type VendorTypeScalarFieldEnum = (typeof VendorTypeScalarFieldEnum)[keyof typeof VendorTypeScalarFieldEnum]


  export const VendorTypeRelationScalarFieldEnum: {
    vendorId: 'vendorId',
    typeId: 'typeId'
  };

  export type VendorTypeRelationScalarFieldEnum = (typeof VendorTypeRelationScalarFieldEnum)[keyof typeof VendorTypeRelationScalarFieldEnum]


  export const FavouriteScalarFieldEnum: {
    userId: 'userId',
    vendorId: 'vendorId'
  };

  export type FavouriteScalarFieldEnum = (typeof FavouriteScalarFieldEnum)[keyof typeof FavouriteScalarFieldEnum]


  export const LowStockReportScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    vendorId: 'vendorId',
    comment: 'comment',
    photoUrl: 'photoUrl',
    createdAt: 'createdAt'
  };

  export type LowStockReportScalarFieldEnum = (typeof LowStockReportScalarFieldEnum)[keyof typeof LowStockReportScalarFieldEnum]


  export const SubmittedVendorScalarFieldEnum: {
    id: 'id',
    submitterId: 'submitterId',
    name: 'name',
    type: 'type',
    description: 'description',
    photoUrl: 'photoUrl',
    createdAt: 'createdAt'
  };

  export type SubmittedVendorScalarFieldEnum = (typeof SubmittedVendorScalarFieldEnum)[keyof typeof SubmittedVendorScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    submittedVendors?: SubmittedVendorListRelationFilter
    favouriteVendors?: FavouriteListRelationFilter
    lowStockReports?: LowStockReportListRelationFilter
    ownedVendor?: XOR<VendorNullableScalarRelationFilter, VendorWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    submittedVendors?: SubmittedVendorOrderByRelationAggregateInput
    favouriteVendors?: FavouriteOrderByRelationAggregateInput
    lowStockReports?: LowStockReportOrderByRelationAggregateInput
    ownedVendor?: VendorOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    submittedVendors?: SubmittedVendorListRelationFilter
    favouriteVendors?: FavouriteListRelationFilter
    lowStockReports?: LowStockReportListRelationFilter
    ownedVendor?: XOR<VendorNullableScalarRelationFilter, VendorWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type VendorWhereInput = {
    AND?: VendorWhereInput | VendorWhereInput[]
    OR?: VendorWhereInput[]
    NOT?: VendorWhereInput | VendorWhereInput[]
    id?: IntFilter<"Vendor"> | number
    name?: StringFilter<"Vendor"> | string
    description?: StringNullableFilter<"Vendor"> | string | null
    hours?: JsonNullableFilter<"Vendor">
    isVerified?: BoolFilter<"Vendor"> | boolean
    photos?: JsonNullableFilter<"Vendor">
    paymentMethods?: JsonNullableFilter<"Vendor">
    createdAt?: DateTimeFilter<"Vendor"> | Date | string
    updatedAt?: DateTimeFilter<"Vendor"> | Date | string
    ownerId?: IntNullableFilter<"Vendor"> | number | null
    owner?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    vendorTypes?: VendorTypeRelationListRelationFilter
    favourites?: FavouriteListRelationFilter
    lowStockReports?: LowStockReportListRelationFilter
  }

  export type VendorOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    hours?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    photos?: SortOrderInput | SortOrder
    paymentMethods?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrderInput | SortOrder
    owner?: UserOrderByWithRelationInput
    vendorTypes?: VendorTypeRelationOrderByRelationAggregateInput
    favourites?: FavouriteOrderByRelationAggregateInput
    lowStockReports?: LowStockReportOrderByRelationAggregateInput
  }

  export type VendorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    ownerId?: number
    AND?: VendorWhereInput | VendorWhereInput[]
    OR?: VendorWhereInput[]
    NOT?: VendorWhereInput | VendorWhereInput[]
    name?: StringFilter<"Vendor"> | string
    description?: StringNullableFilter<"Vendor"> | string | null
    hours?: JsonNullableFilter<"Vendor">
    isVerified?: BoolFilter<"Vendor"> | boolean
    photos?: JsonNullableFilter<"Vendor">
    paymentMethods?: JsonNullableFilter<"Vendor">
    createdAt?: DateTimeFilter<"Vendor"> | Date | string
    updatedAt?: DateTimeFilter<"Vendor"> | Date | string
    owner?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    vendorTypes?: VendorTypeRelationListRelationFilter
    favourites?: FavouriteListRelationFilter
    lowStockReports?: LowStockReportListRelationFilter
  }, "id" | "ownerId">

  export type VendorOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    hours?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    photos?: SortOrderInput | SortOrder
    paymentMethods?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrderInput | SortOrder
    _count?: VendorCountOrderByAggregateInput
    _avg?: VendorAvgOrderByAggregateInput
    _max?: VendorMaxOrderByAggregateInput
    _min?: VendorMinOrderByAggregateInput
    _sum?: VendorSumOrderByAggregateInput
  }

  export type VendorScalarWhereWithAggregatesInput = {
    AND?: VendorScalarWhereWithAggregatesInput | VendorScalarWhereWithAggregatesInput[]
    OR?: VendorScalarWhereWithAggregatesInput[]
    NOT?: VendorScalarWhereWithAggregatesInput | VendorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Vendor"> | number
    name?: StringWithAggregatesFilter<"Vendor"> | string
    description?: StringNullableWithAggregatesFilter<"Vendor"> | string | null
    hours?: JsonNullableWithAggregatesFilter<"Vendor">
    isVerified?: BoolWithAggregatesFilter<"Vendor"> | boolean
    photos?: JsonNullableWithAggregatesFilter<"Vendor">
    paymentMethods?: JsonNullableWithAggregatesFilter<"Vendor">
    createdAt?: DateTimeWithAggregatesFilter<"Vendor"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Vendor"> | Date | string
    ownerId?: IntNullableWithAggregatesFilter<"Vendor"> | number | null
  }

  export type VendorTypeWhereInput = {
    AND?: VendorTypeWhereInput | VendorTypeWhereInput[]
    OR?: VendorTypeWhereInput[]
    NOT?: VendorTypeWhereInput | VendorTypeWhereInput[]
    id?: IntFilter<"VendorType"> | number
    name?: StringFilter<"VendorType"> | string
    vendors?: VendorTypeRelationListRelationFilter
  }

  export type VendorTypeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    vendors?: VendorTypeRelationOrderByRelationAggregateInput
  }

  export type VendorTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: VendorTypeWhereInput | VendorTypeWhereInput[]
    OR?: VendorTypeWhereInput[]
    NOT?: VendorTypeWhereInput | VendorTypeWhereInput[]
    vendors?: VendorTypeRelationListRelationFilter
  }, "id" | "name">

  export type VendorTypeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: VendorTypeCountOrderByAggregateInput
    _avg?: VendorTypeAvgOrderByAggregateInput
    _max?: VendorTypeMaxOrderByAggregateInput
    _min?: VendorTypeMinOrderByAggregateInput
    _sum?: VendorTypeSumOrderByAggregateInput
  }

  export type VendorTypeScalarWhereWithAggregatesInput = {
    AND?: VendorTypeScalarWhereWithAggregatesInput | VendorTypeScalarWhereWithAggregatesInput[]
    OR?: VendorTypeScalarWhereWithAggregatesInput[]
    NOT?: VendorTypeScalarWhereWithAggregatesInput | VendorTypeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"VendorType"> | number
    name?: StringWithAggregatesFilter<"VendorType"> | string
  }

  export type VendorTypeRelationWhereInput = {
    AND?: VendorTypeRelationWhereInput | VendorTypeRelationWhereInput[]
    OR?: VendorTypeRelationWhereInput[]
    NOT?: VendorTypeRelationWhereInput | VendorTypeRelationWhereInput[]
    vendorId?: IntFilter<"VendorTypeRelation"> | number
    typeId?: IntFilter<"VendorTypeRelation"> | number
    vendor?: XOR<VendorScalarRelationFilter, VendorWhereInput>
    type?: XOR<VendorTypeScalarRelationFilter, VendorTypeWhereInput>
  }

  export type VendorTypeRelationOrderByWithRelationInput = {
    vendorId?: SortOrder
    typeId?: SortOrder
    vendor?: VendorOrderByWithRelationInput
    type?: VendorTypeOrderByWithRelationInput
  }

  export type VendorTypeRelationWhereUniqueInput = Prisma.AtLeast<{
    vendorId_typeId?: VendorTypeRelationVendorIdTypeIdCompoundUniqueInput
    AND?: VendorTypeRelationWhereInput | VendorTypeRelationWhereInput[]
    OR?: VendorTypeRelationWhereInput[]
    NOT?: VendorTypeRelationWhereInput | VendorTypeRelationWhereInput[]
    vendorId?: IntFilter<"VendorTypeRelation"> | number
    typeId?: IntFilter<"VendorTypeRelation"> | number
    vendor?: XOR<VendorScalarRelationFilter, VendorWhereInput>
    type?: XOR<VendorTypeScalarRelationFilter, VendorTypeWhereInput>
  }, "vendorId_typeId">

  export type VendorTypeRelationOrderByWithAggregationInput = {
    vendorId?: SortOrder
    typeId?: SortOrder
    _count?: VendorTypeRelationCountOrderByAggregateInput
    _avg?: VendorTypeRelationAvgOrderByAggregateInput
    _max?: VendorTypeRelationMaxOrderByAggregateInput
    _min?: VendorTypeRelationMinOrderByAggregateInput
    _sum?: VendorTypeRelationSumOrderByAggregateInput
  }

  export type VendorTypeRelationScalarWhereWithAggregatesInput = {
    AND?: VendorTypeRelationScalarWhereWithAggregatesInput | VendorTypeRelationScalarWhereWithAggregatesInput[]
    OR?: VendorTypeRelationScalarWhereWithAggregatesInput[]
    NOT?: VendorTypeRelationScalarWhereWithAggregatesInput | VendorTypeRelationScalarWhereWithAggregatesInput[]
    vendorId?: IntWithAggregatesFilter<"VendorTypeRelation"> | number
    typeId?: IntWithAggregatesFilter<"VendorTypeRelation"> | number
  }

  export type FavouriteWhereInput = {
    AND?: FavouriteWhereInput | FavouriteWhereInput[]
    OR?: FavouriteWhereInput[]
    NOT?: FavouriteWhereInput | FavouriteWhereInput[]
    userId?: IntFilter<"Favourite"> | number
    vendorId?: IntFilter<"Favourite"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    vendor?: XOR<VendorScalarRelationFilter, VendorWhereInput>
  }

  export type FavouriteOrderByWithRelationInput = {
    userId?: SortOrder
    vendorId?: SortOrder
    user?: UserOrderByWithRelationInput
    vendor?: VendorOrderByWithRelationInput
  }

  export type FavouriteWhereUniqueInput = Prisma.AtLeast<{
    userId_vendorId?: FavouriteUserIdVendorIdCompoundUniqueInput
    AND?: FavouriteWhereInput | FavouriteWhereInput[]
    OR?: FavouriteWhereInput[]
    NOT?: FavouriteWhereInput | FavouriteWhereInput[]
    userId?: IntFilter<"Favourite"> | number
    vendorId?: IntFilter<"Favourite"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    vendor?: XOR<VendorScalarRelationFilter, VendorWhereInput>
  }, "userId_vendorId">

  export type FavouriteOrderByWithAggregationInput = {
    userId?: SortOrder
    vendorId?: SortOrder
    _count?: FavouriteCountOrderByAggregateInput
    _avg?: FavouriteAvgOrderByAggregateInput
    _max?: FavouriteMaxOrderByAggregateInput
    _min?: FavouriteMinOrderByAggregateInput
    _sum?: FavouriteSumOrderByAggregateInput
  }

  export type FavouriteScalarWhereWithAggregatesInput = {
    AND?: FavouriteScalarWhereWithAggregatesInput | FavouriteScalarWhereWithAggregatesInput[]
    OR?: FavouriteScalarWhereWithAggregatesInput[]
    NOT?: FavouriteScalarWhereWithAggregatesInput | FavouriteScalarWhereWithAggregatesInput[]
    userId?: IntWithAggregatesFilter<"Favourite"> | number
    vendorId?: IntWithAggregatesFilter<"Favourite"> | number
  }

  export type LowStockReportWhereInput = {
    AND?: LowStockReportWhereInput | LowStockReportWhereInput[]
    OR?: LowStockReportWhereInput[]
    NOT?: LowStockReportWhereInput | LowStockReportWhereInput[]
    id?: IntFilter<"LowStockReport"> | number
    userId?: IntFilter<"LowStockReport"> | number
    vendorId?: IntFilter<"LowStockReport"> | number
    comment?: StringNullableFilter<"LowStockReport"> | string | null
    photoUrl?: StringNullableFilter<"LowStockReport"> | string | null
    createdAt?: DateTimeFilter<"LowStockReport"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    vendor?: XOR<VendorScalarRelationFilter, VendorWhereInput>
  }

  export type LowStockReportOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    vendorId?: SortOrder
    comment?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    vendor?: VendorOrderByWithRelationInput
  }

  export type LowStockReportWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: LowStockReportWhereInput | LowStockReportWhereInput[]
    OR?: LowStockReportWhereInput[]
    NOT?: LowStockReportWhereInput | LowStockReportWhereInput[]
    userId?: IntFilter<"LowStockReport"> | number
    vendorId?: IntFilter<"LowStockReport"> | number
    comment?: StringNullableFilter<"LowStockReport"> | string | null
    photoUrl?: StringNullableFilter<"LowStockReport"> | string | null
    createdAt?: DateTimeFilter<"LowStockReport"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    vendor?: XOR<VendorScalarRelationFilter, VendorWhereInput>
  }, "id">

  export type LowStockReportOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    vendorId?: SortOrder
    comment?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: LowStockReportCountOrderByAggregateInput
    _avg?: LowStockReportAvgOrderByAggregateInput
    _max?: LowStockReportMaxOrderByAggregateInput
    _min?: LowStockReportMinOrderByAggregateInput
    _sum?: LowStockReportSumOrderByAggregateInput
  }

  export type LowStockReportScalarWhereWithAggregatesInput = {
    AND?: LowStockReportScalarWhereWithAggregatesInput | LowStockReportScalarWhereWithAggregatesInput[]
    OR?: LowStockReportScalarWhereWithAggregatesInput[]
    NOT?: LowStockReportScalarWhereWithAggregatesInput | LowStockReportScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"LowStockReport"> | number
    userId?: IntWithAggregatesFilter<"LowStockReport"> | number
    vendorId?: IntWithAggregatesFilter<"LowStockReport"> | number
    comment?: StringNullableWithAggregatesFilter<"LowStockReport"> | string | null
    photoUrl?: StringNullableWithAggregatesFilter<"LowStockReport"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LowStockReport"> | Date | string
  }

  export type SubmittedVendorWhereInput = {
    AND?: SubmittedVendorWhereInput | SubmittedVendorWhereInput[]
    OR?: SubmittedVendorWhereInput[]
    NOT?: SubmittedVendorWhereInput | SubmittedVendorWhereInput[]
    id?: IntFilter<"SubmittedVendor"> | number
    submitterId?: IntFilter<"SubmittedVendor"> | number
    name?: StringFilter<"SubmittedVendor"> | string
    type?: StringFilter<"SubmittedVendor"> | string
    description?: StringNullableFilter<"SubmittedVendor"> | string | null
    photoUrl?: StringNullableFilter<"SubmittedVendor"> | string | null
    createdAt?: DateTimeFilter<"SubmittedVendor"> | Date | string
    submitter?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SubmittedVendorOrderByWithRelationInput = {
    id?: SortOrder
    submitterId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    description?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    submitter?: UserOrderByWithRelationInput
  }

  export type SubmittedVendorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SubmittedVendorWhereInput | SubmittedVendorWhereInput[]
    OR?: SubmittedVendorWhereInput[]
    NOT?: SubmittedVendorWhereInput | SubmittedVendorWhereInput[]
    submitterId?: IntFilter<"SubmittedVendor"> | number
    name?: StringFilter<"SubmittedVendor"> | string
    type?: StringFilter<"SubmittedVendor"> | string
    description?: StringNullableFilter<"SubmittedVendor"> | string | null
    photoUrl?: StringNullableFilter<"SubmittedVendor"> | string | null
    createdAt?: DateTimeFilter<"SubmittedVendor"> | Date | string
    submitter?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type SubmittedVendorOrderByWithAggregationInput = {
    id?: SortOrder
    submitterId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    description?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SubmittedVendorCountOrderByAggregateInput
    _avg?: SubmittedVendorAvgOrderByAggregateInput
    _max?: SubmittedVendorMaxOrderByAggregateInput
    _min?: SubmittedVendorMinOrderByAggregateInput
    _sum?: SubmittedVendorSumOrderByAggregateInput
  }

  export type SubmittedVendorScalarWhereWithAggregatesInput = {
    AND?: SubmittedVendorScalarWhereWithAggregatesInput | SubmittedVendorScalarWhereWithAggregatesInput[]
    OR?: SubmittedVendorScalarWhereWithAggregatesInput[]
    NOT?: SubmittedVendorScalarWhereWithAggregatesInput | SubmittedVendorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SubmittedVendor"> | number
    submitterId?: IntWithAggregatesFilter<"SubmittedVendor"> | number
    name?: StringWithAggregatesFilter<"SubmittedVendor"> | string
    type?: StringWithAggregatesFilter<"SubmittedVendor"> | string
    description?: StringNullableWithAggregatesFilter<"SubmittedVendor"> | string | null
    photoUrl?: StringNullableWithAggregatesFilter<"SubmittedVendor"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SubmittedVendor"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedVendors?: SubmittedVendorCreateNestedManyWithoutSubmitterInput
    favouriteVendors?: FavouriteCreateNestedManyWithoutUserInput
    lowStockReports?: LowStockReportCreateNestedManyWithoutUserInput
    ownedVendor?: VendorCreateNestedOneWithoutOwnerInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedVendors?: SubmittedVendorUncheckedCreateNestedManyWithoutSubmitterInput
    favouriteVendors?: FavouriteUncheckedCreateNestedManyWithoutUserInput
    lowStockReports?: LowStockReportUncheckedCreateNestedManyWithoutUserInput
    ownedVendor?: VendorUncheckedCreateNestedOneWithoutOwnerInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedVendors?: SubmittedVendorUpdateManyWithoutSubmitterNestedInput
    favouriteVendors?: FavouriteUpdateManyWithoutUserNestedInput
    lowStockReports?: LowStockReportUpdateManyWithoutUserNestedInput
    ownedVendor?: VendorUpdateOneWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedVendors?: SubmittedVendorUncheckedUpdateManyWithoutSubmitterNestedInput
    favouriteVendors?: FavouriteUncheckedUpdateManyWithoutUserNestedInput
    lowStockReports?: LowStockReportUncheckedUpdateManyWithoutUserNestedInput
    ownedVendor?: VendorUncheckedUpdateOneWithoutOwnerNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorCreateInput = {
    name: string
    description?: string | null
    hours?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: boolean
    photos?: NullableJsonNullValueInput | InputJsonValue
    paymentMethods?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: UserCreateNestedOneWithoutOwnedVendorInput
    vendorTypes?: VendorTypeRelationCreateNestedManyWithoutVendorInput
    favourites?: FavouriteCreateNestedManyWithoutVendorInput
    lowStockReports?: LowStockReportCreateNestedManyWithoutVendorInput
  }

  export type VendorUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    hours?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: boolean
    photos?: NullableJsonNullValueInput | InputJsonValue
    paymentMethods?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: number | null
    vendorTypes?: VendorTypeRelationUncheckedCreateNestedManyWithoutVendorInput
    favourites?: FavouriteUncheckedCreateNestedManyWithoutVendorInput
    lowStockReports?: LowStockReportUncheckedCreateNestedManyWithoutVendorInput
  }

  export type VendorUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    photos?: NullableJsonNullValueInput | InputJsonValue
    paymentMethods?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneWithoutOwnedVendorNestedInput
    vendorTypes?: VendorTypeRelationUpdateManyWithoutVendorNestedInput
    favourites?: FavouriteUpdateManyWithoutVendorNestedInput
    lowStockReports?: LowStockReportUpdateManyWithoutVendorNestedInput
  }

  export type VendorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    photos?: NullableJsonNullValueInput | InputJsonValue
    paymentMethods?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
    vendorTypes?: VendorTypeRelationUncheckedUpdateManyWithoutVendorNestedInput
    favourites?: FavouriteUncheckedUpdateManyWithoutVendorNestedInput
    lowStockReports?: LowStockReportUncheckedUpdateManyWithoutVendorNestedInput
  }

  export type VendorCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    hours?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: boolean
    photos?: NullableJsonNullValueInput | InputJsonValue
    paymentMethods?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: number | null
  }

  export type VendorUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    photos?: NullableJsonNullValueInput | InputJsonValue
    paymentMethods?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    photos?: NullableJsonNullValueInput | InputJsonValue
    paymentMethods?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type VendorTypeCreateInput = {
    name: string
    vendors?: VendorTypeRelationCreateNestedManyWithoutTypeInput
  }

  export type VendorTypeUncheckedCreateInput = {
    id?: number
    name: string
    vendors?: VendorTypeRelationUncheckedCreateNestedManyWithoutTypeInput
  }

  export type VendorTypeUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    vendors?: VendorTypeRelationUpdateManyWithoutTypeNestedInput
  }

  export type VendorTypeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    vendors?: VendorTypeRelationUncheckedUpdateManyWithoutTypeNestedInput
  }

  export type VendorTypeCreateManyInput = {
    id?: number
    name: string
  }

  export type VendorTypeUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type VendorTypeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type VendorTypeRelationCreateInput = {
    vendor: VendorCreateNestedOneWithoutVendorTypesInput
    type: VendorTypeCreateNestedOneWithoutVendorsInput
  }

  export type VendorTypeRelationUncheckedCreateInput = {
    vendorId: number
    typeId: number
  }

  export type VendorTypeRelationUpdateInput = {
    vendor?: VendorUpdateOneRequiredWithoutVendorTypesNestedInput
    type?: VendorTypeUpdateOneRequiredWithoutVendorsNestedInput
  }

  export type VendorTypeRelationUncheckedUpdateInput = {
    vendorId?: IntFieldUpdateOperationsInput | number
    typeId?: IntFieldUpdateOperationsInput | number
  }

  export type VendorTypeRelationCreateManyInput = {
    vendorId: number
    typeId: number
  }

  export type VendorTypeRelationUpdateManyMutationInput = {

  }

  export type VendorTypeRelationUncheckedUpdateManyInput = {
    vendorId?: IntFieldUpdateOperationsInput | number
    typeId?: IntFieldUpdateOperationsInput | number
  }

  export type FavouriteCreateInput = {
    user: UserCreateNestedOneWithoutFavouriteVendorsInput
    vendor: VendorCreateNestedOneWithoutFavouritesInput
  }

  export type FavouriteUncheckedCreateInput = {
    userId: number
    vendorId: number
  }

  export type FavouriteUpdateInput = {
    user?: UserUpdateOneRequiredWithoutFavouriteVendorsNestedInput
    vendor?: VendorUpdateOneRequiredWithoutFavouritesNestedInput
  }

  export type FavouriteUncheckedUpdateInput = {
    userId?: IntFieldUpdateOperationsInput | number
    vendorId?: IntFieldUpdateOperationsInput | number
  }

  export type FavouriteCreateManyInput = {
    userId: number
    vendorId: number
  }

  export type FavouriteUpdateManyMutationInput = {

  }

  export type FavouriteUncheckedUpdateManyInput = {
    userId?: IntFieldUpdateOperationsInput | number
    vendorId?: IntFieldUpdateOperationsInput | number
  }

  export type LowStockReportCreateInput = {
    comment?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutLowStockReportsInput
    vendor: VendorCreateNestedOneWithoutLowStockReportsInput
  }

  export type LowStockReportUncheckedCreateInput = {
    id?: number
    userId: number
    vendorId: number
    comment?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
  }

  export type LowStockReportUpdateInput = {
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLowStockReportsNestedInput
    vendor?: VendorUpdateOneRequiredWithoutLowStockReportsNestedInput
  }

  export type LowStockReportUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    vendorId?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LowStockReportCreateManyInput = {
    id?: number
    userId: number
    vendorId: number
    comment?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
  }

  export type LowStockReportUpdateManyMutationInput = {
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LowStockReportUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    vendorId?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmittedVendorCreateInput = {
    name: string
    type: string
    description?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    submitter: UserCreateNestedOneWithoutSubmittedVendorsInput
  }

  export type SubmittedVendorUncheckedCreateInput = {
    id?: number
    submitterId: number
    name: string
    type: string
    description?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
  }

  export type SubmittedVendorUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submitter?: UserUpdateOneRequiredWithoutSubmittedVendorsNestedInput
  }

  export type SubmittedVendorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    submitterId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmittedVendorCreateManyInput = {
    id?: number
    submitterId: number
    name: string
    type: string
    description?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
  }

  export type SubmittedVendorUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmittedVendorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    submitterId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SubmittedVendorListRelationFilter = {
    every?: SubmittedVendorWhereInput
    some?: SubmittedVendorWhereInput
    none?: SubmittedVendorWhereInput
  }

  export type FavouriteListRelationFilter = {
    every?: FavouriteWhereInput
    some?: FavouriteWhereInput
    none?: FavouriteWhereInput
  }

  export type LowStockReportListRelationFilter = {
    every?: LowStockReportWhereInput
    some?: LowStockReportWhereInput
    none?: LowStockReportWhereInput
  }

  export type VendorNullableScalarRelationFilter = {
    is?: VendorWhereInput | null
    isNot?: VendorWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SubmittedVendorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FavouriteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LowStockReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type VendorTypeRelationListRelationFilter = {
    every?: VendorTypeRelationWhereInput
    some?: VendorTypeRelationWhereInput
    none?: VendorTypeRelationWhereInput
  }

  export type VendorTypeRelationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VendorCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    hours?: SortOrder
    isVerified?: SortOrder
    photos?: SortOrder
    paymentMethods?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
  }

  export type VendorAvgOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
  }

  export type VendorMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
  }

  export type VendorMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
  }

  export type VendorSumOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type VendorTypeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type VendorTypeAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type VendorTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type VendorTypeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type VendorTypeSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type VendorScalarRelationFilter = {
    is?: VendorWhereInput
    isNot?: VendorWhereInput
  }

  export type VendorTypeScalarRelationFilter = {
    is?: VendorTypeWhereInput
    isNot?: VendorTypeWhereInput
  }

  export type VendorTypeRelationVendorIdTypeIdCompoundUniqueInput = {
    vendorId: number
    typeId: number
  }

  export type VendorTypeRelationCountOrderByAggregateInput = {
    vendorId?: SortOrder
    typeId?: SortOrder
  }

  export type VendorTypeRelationAvgOrderByAggregateInput = {
    vendorId?: SortOrder
    typeId?: SortOrder
  }

  export type VendorTypeRelationMaxOrderByAggregateInput = {
    vendorId?: SortOrder
    typeId?: SortOrder
  }

  export type VendorTypeRelationMinOrderByAggregateInput = {
    vendorId?: SortOrder
    typeId?: SortOrder
  }

  export type VendorTypeRelationSumOrderByAggregateInput = {
    vendorId?: SortOrder
    typeId?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type FavouriteUserIdVendorIdCompoundUniqueInput = {
    userId: number
    vendorId: number
  }

  export type FavouriteCountOrderByAggregateInput = {
    userId?: SortOrder
    vendorId?: SortOrder
  }

  export type FavouriteAvgOrderByAggregateInput = {
    userId?: SortOrder
    vendorId?: SortOrder
  }

  export type FavouriteMaxOrderByAggregateInput = {
    userId?: SortOrder
    vendorId?: SortOrder
  }

  export type FavouriteMinOrderByAggregateInput = {
    userId?: SortOrder
    vendorId?: SortOrder
  }

  export type FavouriteSumOrderByAggregateInput = {
    userId?: SortOrder
    vendorId?: SortOrder
  }

  export type LowStockReportCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    vendorId?: SortOrder
    comment?: SortOrder
    photoUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type LowStockReportAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    vendorId?: SortOrder
  }

  export type LowStockReportMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    vendorId?: SortOrder
    comment?: SortOrder
    photoUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type LowStockReportMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    vendorId?: SortOrder
    comment?: SortOrder
    photoUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type LowStockReportSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    vendorId?: SortOrder
  }

  export type SubmittedVendorCountOrderByAggregateInput = {
    id?: SortOrder
    submitterId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    description?: SortOrder
    photoUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type SubmittedVendorAvgOrderByAggregateInput = {
    id?: SortOrder
    submitterId?: SortOrder
  }

  export type SubmittedVendorMaxOrderByAggregateInput = {
    id?: SortOrder
    submitterId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    description?: SortOrder
    photoUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type SubmittedVendorMinOrderByAggregateInput = {
    id?: SortOrder
    submitterId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    description?: SortOrder
    photoUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type SubmittedVendorSumOrderByAggregateInput = {
    id?: SortOrder
    submitterId?: SortOrder
  }

  export type SubmittedVendorCreateNestedManyWithoutSubmitterInput = {
    create?: XOR<SubmittedVendorCreateWithoutSubmitterInput, SubmittedVendorUncheckedCreateWithoutSubmitterInput> | SubmittedVendorCreateWithoutSubmitterInput[] | SubmittedVendorUncheckedCreateWithoutSubmitterInput[]
    connectOrCreate?: SubmittedVendorCreateOrConnectWithoutSubmitterInput | SubmittedVendorCreateOrConnectWithoutSubmitterInput[]
    createMany?: SubmittedVendorCreateManySubmitterInputEnvelope
    connect?: SubmittedVendorWhereUniqueInput | SubmittedVendorWhereUniqueInput[]
  }

  export type FavouriteCreateNestedManyWithoutUserInput = {
    create?: XOR<FavouriteCreateWithoutUserInput, FavouriteUncheckedCreateWithoutUserInput> | FavouriteCreateWithoutUserInput[] | FavouriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavouriteCreateOrConnectWithoutUserInput | FavouriteCreateOrConnectWithoutUserInput[]
    createMany?: FavouriteCreateManyUserInputEnvelope
    connect?: FavouriteWhereUniqueInput | FavouriteWhereUniqueInput[]
  }

  export type LowStockReportCreateNestedManyWithoutUserInput = {
    create?: XOR<LowStockReportCreateWithoutUserInput, LowStockReportUncheckedCreateWithoutUserInput> | LowStockReportCreateWithoutUserInput[] | LowStockReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LowStockReportCreateOrConnectWithoutUserInput | LowStockReportCreateOrConnectWithoutUserInput[]
    createMany?: LowStockReportCreateManyUserInputEnvelope
    connect?: LowStockReportWhereUniqueInput | LowStockReportWhereUniqueInput[]
  }

  export type VendorCreateNestedOneWithoutOwnerInput = {
    create?: XOR<VendorCreateWithoutOwnerInput, VendorUncheckedCreateWithoutOwnerInput>
    connectOrCreate?: VendorCreateOrConnectWithoutOwnerInput
    connect?: VendorWhereUniqueInput
  }

  export type SubmittedVendorUncheckedCreateNestedManyWithoutSubmitterInput = {
    create?: XOR<SubmittedVendorCreateWithoutSubmitterInput, SubmittedVendorUncheckedCreateWithoutSubmitterInput> | SubmittedVendorCreateWithoutSubmitterInput[] | SubmittedVendorUncheckedCreateWithoutSubmitterInput[]
    connectOrCreate?: SubmittedVendorCreateOrConnectWithoutSubmitterInput | SubmittedVendorCreateOrConnectWithoutSubmitterInput[]
    createMany?: SubmittedVendorCreateManySubmitterInputEnvelope
    connect?: SubmittedVendorWhereUniqueInput | SubmittedVendorWhereUniqueInput[]
  }

  export type FavouriteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FavouriteCreateWithoutUserInput, FavouriteUncheckedCreateWithoutUserInput> | FavouriteCreateWithoutUserInput[] | FavouriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavouriteCreateOrConnectWithoutUserInput | FavouriteCreateOrConnectWithoutUserInput[]
    createMany?: FavouriteCreateManyUserInputEnvelope
    connect?: FavouriteWhereUniqueInput | FavouriteWhereUniqueInput[]
  }

  export type LowStockReportUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LowStockReportCreateWithoutUserInput, LowStockReportUncheckedCreateWithoutUserInput> | LowStockReportCreateWithoutUserInput[] | LowStockReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LowStockReportCreateOrConnectWithoutUserInput | LowStockReportCreateOrConnectWithoutUserInput[]
    createMany?: LowStockReportCreateManyUserInputEnvelope
    connect?: LowStockReportWhereUniqueInput | LowStockReportWhereUniqueInput[]
  }

  export type VendorUncheckedCreateNestedOneWithoutOwnerInput = {
    create?: XOR<VendorCreateWithoutOwnerInput, VendorUncheckedCreateWithoutOwnerInput>
    connectOrCreate?: VendorCreateOrConnectWithoutOwnerInput
    connect?: VendorWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SubmittedVendorUpdateManyWithoutSubmitterNestedInput = {
    create?: XOR<SubmittedVendorCreateWithoutSubmitterInput, SubmittedVendorUncheckedCreateWithoutSubmitterInput> | SubmittedVendorCreateWithoutSubmitterInput[] | SubmittedVendorUncheckedCreateWithoutSubmitterInput[]
    connectOrCreate?: SubmittedVendorCreateOrConnectWithoutSubmitterInput | SubmittedVendorCreateOrConnectWithoutSubmitterInput[]
    upsert?: SubmittedVendorUpsertWithWhereUniqueWithoutSubmitterInput | SubmittedVendorUpsertWithWhereUniqueWithoutSubmitterInput[]
    createMany?: SubmittedVendorCreateManySubmitterInputEnvelope
    set?: SubmittedVendorWhereUniqueInput | SubmittedVendorWhereUniqueInput[]
    disconnect?: SubmittedVendorWhereUniqueInput | SubmittedVendorWhereUniqueInput[]
    delete?: SubmittedVendorWhereUniqueInput | SubmittedVendorWhereUniqueInput[]
    connect?: SubmittedVendorWhereUniqueInput | SubmittedVendorWhereUniqueInput[]
    update?: SubmittedVendorUpdateWithWhereUniqueWithoutSubmitterInput | SubmittedVendorUpdateWithWhereUniqueWithoutSubmitterInput[]
    updateMany?: SubmittedVendorUpdateManyWithWhereWithoutSubmitterInput | SubmittedVendorUpdateManyWithWhereWithoutSubmitterInput[]
    deleteMany?: SubmittedVendorScalarWhereInput | SubmittedVendorScalarWhereInput[]
  }

  export type FavouriteUpdateManyWithoutUserNestedInput = {
    create?: XOR<FavouriteCreateWithoutUserInput, FavouriteUncheckedCreateWithoutUserInput> | FavouriteCreateWithoutUserInput[] | FavouriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavouriteCreateOrConnectWithoutUserInput | FavouriteCreateOrConnectWithoutUserInput[]
    upsert?: FavouriteUpsertWithWhereUniqueWithoutUserInput | FavouriteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FavouriteCreateManyUserInputEnvelope
    set?: FavouriteWhereUniqueInput | FavouriteWhereUniqueInput[]
    disconnect?: FavouriteWhereUniqueInput | FavouriteWhereUniqueInput[]
    delete?: FavouriteWhereUniqueInput | FavouriteWhereUniqueInput[]
    connect?: FavouriteWhereUniqueInput | FavouriteWhereUniqueInput[]
    update?: FavouriteUpdateWithWhereUniqueWithoutUserInput | FavouriteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FavouriteUpdateManyWithWhereWithoutUserInput | FavouriteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FavouriteScalarWhereInput | FavouriteScalarWhereInput[]
  }

  export type LowStockReportUpdateManyWithoutUserNestedInput = {
    create?: XOR<LowStockReportCreateWithoutUserInput, LowStockReportUncheckedCreateWithoutUserInput> | LowStockReportCreateWithoutUserInput[] | LowStockReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LowStockReportCreateOrConnectWithoutUserInput | LowStockReportCreateOrConnectWithoutUserInput[]
    upsert?: LowStockReportUpsertWithWhereUniqueWithoutUserInput | LowStockReportUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LowStockReportCreateManyUserInputEnvelope
    set?: LowStockReportWhereUniqueInput | LowStockReportWhereUniqueInput[]
    disconnect?: LowStockReportWhereUniqueInput | LowStockReportWhereUniqueInput[]
    delete?: LowStockReportWhereUniqueInput | LowStockReportWhereUniqueInput[]
    connect?: LowStockReportWhereUniqueInput | LowStockReportWhereUniqueInput[]
    update?: LowStockReportUpdateWithWhereUniqueWithoutUserInput | LowStockReportUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LowStockReportUpdateManyWithWhereWithoutUserInput | LowStockReportUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LowStockReportScalarWhereInput | LowStockReportScalarWhereInput[]
  }

  export type VendorUpdateOneWithoutOwnerNestedInput = {
    create?: XOR<VendorCreateWithoutOwnerInput, VendorUncheckedCreateWithoutOwnerInput>
    connectOrCreate?: VendorCreateOrConnectWithoutOwnerInput
    upsert?: VendorUpsertWithoutOwnerInput
    disconnect?: VendorWhereInput | boolean
    delete?: VendorWhereInput | boolean
    connect?: VendorWhereUniqueInput
    update?: XOR<XOR<VendorUpdateToOneWithWhereWithoutOwnerInput, VendorUpdateWithoutOwnerInput>, VendorUncheckedUpdateWithoutOwnerInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SubmittedVendorUncheckedUpdateManyWithoutSubmitterNestedInput = {
    create?: XOR<SubmittedVendorCreateWithoutSubmitterInput, SubmittedVendorUncheckedCreateWithoutSubmitterInput> | SubmittedVendorCreateWithoutSubmitterInput[] | SubmittedVendorUncheckedCreateWithoutSubmitterInput[]
    connectOrCreate?: SubmittedVendorCreateOrConnectWithoutSubmitterInput | SubmittedVendorCreateOrConnectWithoutSubmitterInput[]
    upsert?: SubmittedVendorUpsertWithWhereUniqueWithoutSubmitterInput | SubmittedVendorUpsertWithWhereUniqueWithoutSubmitterInput[]
    createMany?: SubmittedVendorCreateManySubmitterInputEnvelope
    set?: SubmittedVendorWhereUniqueInput | SubmittedVendorWhereUniqueInput[]
    disconnect?: SubmittedVendorWhereUniqueInput | SubmittedVendorWhereUniqueInput[]
    delete?: SubmittedVendorWhereUniqueInput | SubmittedVendorWhereUniqueInput[]
    connect?: SubmittedVendorWhereUniqueInput | SubmittedVendorWhereUniqueInput[]
    update?: SubmittedVendorUpdateWithWhereUniqueWithoutSubmitterInput | SubmittedVendorUpdateWithWhereUniqueWithoutSubmitterInput[]
    updateMany?: SubmittedVendorUpdateManyWithWhereWithoutSubmitterInput | SubmittedVendorUpdateManyWithWhereWithoutSubmitterInput[]
    deleteMany?: SubmittedVendorScalarWhereInput | SubmittedVendorScalarWhereInput[]
  }

  export type FavouriteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FavouriteCreateWithoutUserInput, FavouriteUncheckedCreateWithoutUserInput> | FavouriteCreateWithoutUserInput[] | FavouriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavouriteCreateOrConnectWithoutUserInput | FavouriteCreateOrConnectWithoutUserInput[]
    upsert?: FavouriteUpsertWithWhereUniqueWithoutUserInput | FavouriteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FavouriteCreateManyUserInputEnvelope
    set?: FavouriteWhereUniqueInput | FavouriteWhereUniqueInput[]
    disconnect?: FavouriteWhereUniqueInput | FavouriteWhereUniqueInput[]
    delete?: FavouriteWhereUniqueInput | FavouriteWhereUniqueInput[]
    connect?: FavouriteWhereUniqueInput | FavouriteWhereUniqueInput[]
    update?: FavouriteUpdateWithWhereUniqueWithoutUserInput | FavouriteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FavouriteUpdateManyWithWhereWithoutUserInput | FavouriteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FavouriteScalarWhereInput | FavouriteScalarWhereInput[]
  }

  export type LowStockReportUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LowStockReportCreateWithoutUserInput, LowStockReportUncheckedCreateWithoutUserInput> | LowStockReportCreateWithoutUserInput[] | LowStockReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LowStockReportCreateOrConnectWithoutUserInput | LowStockReportCreateOrConnectWithoutUserInput[]
    upsert?: LowStockReportUpsertWithWhereUniqueWithoutUserInput | LowStockReportUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LowStockReportCreateManyUserInputEnvelope
    set?: LowStockReportWhereUniqueInput | LowStockReportWhereUniqueInput[]
    disconnect?: LowStockReportWhereUniqueInput | LowStockReportWhereUniqueInput[]
    delete?: LowStockReportWhereUniqueInput | LowStockReportWhereUniqueInput[]
    connect?: LowStockReportWhereUniqueInput | LowStockReportWhereUniqueInput[]
    update?: LowStockReportUpdateWithWhereUniqueWithoutUserInput | LowStockReportUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LowStockReportUpdateManyWithWhereWithoutUserInput | LowStockReportUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LowStockReportScalarWhereInput | LowStockReportScalarWhereInput[]
  }

  export type VendorUncheckedUpdateOneWithoutOwnerNestedInput = {
    create?: XOR<VendorCreateWithoutOwnerInput, VendorUncheckedCreateWithoutOwnerInput>
    connectOrCreate?: VendorCreateOrConnectWithoutOwnerInput
    upsert?: VendorUpsertWithoutOwnerInput
    disconnect?: VendorWhereInput | boolean
    delete?: VendorWhereInput | boolean
    connect?: VendorWhereUniqueInput
    update?: XOR<XOR<VendorUpdateToOneWithWhereWithoutOwnerInput, VendorUpdateWithoutOwnerInput>, VendorUncheckedUpdateWithoutOwnerInput>
  }

  export type UserCreateNestedOneWithoutOwnedVendorInput = {
    create?: XOR<UserCreateWithoutOwnedVendorInput, UserUncheckedCreateWithoutOwnedVendorInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedVendorInput
    connect?: UserWhereUniqueInput
  }

  export type VendorTypeRelationCreateNestedManyWithoutVendorInput = {
    create?: XOR<VendorTypeRelationCreateWithoutVendorInput, VendorTypeRelationUncheckedCreateWithoutVendorInput> | VendorTypeRelationCreateWithoutVendorInput[] | VendorTypeRelationUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: VendorTypeRelationCreateOrConnectWithoutVendorInput | VendorTypeRelationCreateOrConnectWithoutVendorInput[]
    createMany?: VendorTypeRelationCreateManyVendorInputEnvelope
    connect?: VendorTypeRelationWhereUniqueInput | VendorTypeRelationWhereUniqueInput[]
  }

  export type FavouriteCreateNestedManyWithoutVendorInput = {
    create?: XOR<FavouriteCreateWithoutVendorInput, FavouriteUncheckedCreateWithoutVendorInput> | FavouriteCreateWithoutVendorInput[] | FavouriteUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: FavouriteCreateOrConnectWithoutVendorInput | FavouriteCreateOrConnectWithoutVendorInput[]
    createMany?: FavouriteCreateManyVendorInputEnvelope
    connect?: FavouriteWhereUniqueInput | FavouriteWhereUniqueInput[]
  }

  export type LowStockReportCreateNestedManyWithoutVendorInput = {
    create?: XOR<LowStockReportCreateWithoutVendorInput, LowStockReportUncheckedCreateWithoutVendorInput> | LowStockReportCreateWithoutVendorInput[] | LowStockReportUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: LowStockReportCreateOrConnectWithoutVendorInput | LowStockReportCreateOrConnectWithoutVendorInput[]
    createMany?: LowStockReportCreateManyVendorInputEnvelope
    connect?: LowStockReportWhereUniqueInput | LowStockReportWhereUniqueInput[]
  }

  export type VendorTypeRelationUncheckedCreateNestedManyWithoutVendorInput = {
    create?: XOR<VendorTypeRelationCreateWithoutVendorInput, VendorTypeRelationUncheckedCreateWithoutVendorInput> | VendorTypeRelationCreateWithoutVendorInput[] | VendorTypeRelationUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: VendorTypeRelationCreateOrConnectWithoutVendorInput | VendorTypeRelationCreateOrConnectWithoutVendorInput[]
    createMany?: VendorTypeRelationCreateManyVendorInputEnvelope
    connect?: VendorTypeRelationWhereUniqueInput | VendorTypeRelationWhereUniqueInput[]
  }

  export type FavouriteUncheckedCreateNestedManyWithoutVendorInput = {
    create?: XOR<FavouriteCreateWithoutVendorInput, FavouriteUncheckedCreateWithoutVendorInput> | FavouriteCreateWithoutVendorInput[] | FavouriteUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: FavouriteCreateOrConnectWithoutVendorInput | FavouriteCreateOrConnectWithoutVendorInput[]
    createMany?: FavouriteCreateManyVendorInputEnvelope
    connect?: FavouriteWhereUniqueInput | FavouriteWhereUniqueInput[]
  }

  export type LowStockReportUncheckedCreateNestedManyWithoutVendorInput = {
    create?: XOR<LowStockReportCreateWithoutVendorInput, LowStockReportUncheckedCreateWithoutVendorInput> | LowStockReportCreateWithoutVendorInput[] | LowStockReportUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: LowStockReportCreateOrConnectWithoutVendorInput | LowStockReportCreateOrConnectWithoutVendorInput[]
    createMany?: LowStockReportCreateManyVendorInputEnvelope
    connect?: LowStockReportWhereUniqueInput | LowStockReportWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneWithoutOwnedVendorNestedInput = {
    create?: XOR<UserCreateWithoutOwnedVendorInput, UserUncheckedCreateWithoutOwnedVendorInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedVendorInput
    upsert?: UserUpsertWithoutOwnedVendorInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOwnedVendorInput, UserUpdateWithoutOwnedVendorInput>, UserUncheckedUpdateWithoutOwnedVendorInput>
  }

  export type VendorTypeRelationUpdateManyWithoutVendorNestedInput = {
    create?: XOR<VendorTypeRelationCreateWithoutVendorInput, VendorTypeRelationUncheckedCreateWithoutVendorInput> | VendorTypeRelationCreateWithoutVendorInput[] | VendorTypeRelationUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: VendorTypeRelationCreateOrConnectWithoutVendorInput | VendorTypeRelationCreateOrConnectWithoutVendorInput[]
    upsert?: VendorTypeRelationUpsertWithWhereUniqueWithoutVendorInput | VendorTypeRelationUpsertWithWhereUniqueWithoutVendorInput[]
    createMany?: VendorTypeRelationCreateManyVendorInputEnvelope
    set?: VendorTypeRelationWhereUniqueInput | VendorTypeRelationWhereUniqueInput[]
    disconnect?: VendorTypeRelationWhereUniqueInput | VendorTypeRelationWhereUniqueInput[]
    delete?: VendorTypeRelationWhereUniqueInput | VendorTypeRelationWhereUniqueInput[]
    connect?: VendorTypeRelationWhereUniqueInput | VendorTypeRelationWhereUniqueInput[]
    update?: VendorTypeRelationUpdateWithWhereUniqueWithoutVendorInput | VendorTypeRelationUpdateWithWhereUniqueWithoutVendorInput[]
    updateMany?: VendorTypeRelationUpdateManyWithWhereWithoutVendorInput | VendorTypeRelationUpdateManyWithWhereWithoutVendorInput[]
    deleteMany?: VendorTypeRelationScalarWhereInput | VendorTypeRelationScalarWhereInput[]
  }

  export type FavouriteUpdateManyWithoutVendorNestedInput = {
    create?: XOR<FavouriteCreateWithoutVendorInput, FavouriteUncheckedCreateWithoutVendorInput> | FavouriteCreateWithoutVendorInput[] | FavouriteUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: FavouriteCreateOrConnectWithoutVendorInput | FavouriteCreateOrConnectWithoutVendorInput[]
    upsert?: FavouriteUpsertWithWhereUniqueWithoutVendorInput | FavouriteUpsertWithWhereUniqueWithoutVendorInput[]
    createMany?: FavouriteCreateManyVendorInputEnvelope
    set?: FavouriteWhereUniqueInput | FavouriteWhereUniqueInput[]
    disconnect?: FavouriteWhereUniqueInput | FavouriteWhereUniqueInput[]
    delete?: FavouriteWhereUniqueInput | FavouriteWhereUniqueInput[]
    connect?: FavouriteWhereUniqueInput | FavouriteWhereUniqueInput[]
    update?: FavouriteUpdateWithWhereUniqueWithoutVendorInput | FavouriteUpdateWithWhereUniqueWithoutVendorInput[]
    updateMany?: FavouriteUpdateManyWithWhereWithoutVendorInput | FavouriteUpdateManyWithWhereWithoutVendorInput[]
    deleteMany?: FavouriteScalarWhereInput | FavouriteScalarWhereInput[]
  }

  export type LowStockReportUpdateManyWithoutVendorNestedInput = {
    create?: XOR<LowStockReportCreateWithoutVendorInput, LowStockReportUncheckedCreateWithoutVendorInput> | LowStockReportCreateWithoutVendorInput[] | LowStockReportUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: LowStockReportCreateOrConnectWithoutVendorInput | LowStockReportCreateOrConnectWithoutVendorInput[]
    upsert?: LowStockReportUpsertWithWhereUniqueWithoutVendorInput | LowStockReportUpsertWithWhereUniqueWithoutVendorInput[]
    createMany?: LowStockReportCreateManyVendorInputEnvelope
    set?: LowStockReportWhereUniqueInput | LowStockReportWhereUniqueInput[]
    disconnect?: LowStockReportWhereUniqueInput | LowStockReportWhereUniqueInput[]
    delete?: LowStockReportWhereUniqueInput | LowStockReportWhereUniqueInput[]
    connect?: LowStockReportWhereUniqueInput | LowStockReportWhereUniqueInput[]
    update?: LowStockReportUpdateWithWhereUniqueWithoutVendorInput | LowStockReportUpdateWithWhereUniqueWithoutVendorInput[]
    updateMany?: LowStockReportUpdateManyWithWhereWithoutVendorInput | LowStockReportUpdateManyWithWhereWithoutVendorInput[]
    deleteMany?: LowStockReportScalarWhereInput | LowStockReportScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type VendorTypeRelationUncheckedUpdateManyWithoutVendorNestedInput = {
    create?: XOR<VendorTypeRelationCreateWithoutVendorInput, VendorTypeRelationUncheckedCreateWithoutVendorInput> | VendorTypeRelationCreateWithoutVendorInput[] | VendorTypeRelationUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: VendorTypeRelationCreateOrConnectWithoutVendorInput | VendorTypeRelationCreateOrConnectWithoutVendorInput[]
    upsert?: VendorTypeRelationUpsertWithWhereUniqueWithoutVendorInput | VendorTypeRelationUpsertWithWhereUniqueWithoutVendorInput[]
    createMany?: VendorTypeRelationCreateManyVendorInputEnvelope
    set?: VendorTypeRelationWhereUniqueInput | VendorTypeRelationWhereUniqueInput[]
    disconnect?: VendorTypeRelationWhereUniqueInput | VendorTypeRelationWhereUniqueInput[]
    delete?: VendorTypeRelationWhereUniqueInput | VendorTypeRelationWhereUniqueInput[]
    connect?: VendorTypeRelationWhereUniqueInput | VendorTypeRelationWhereUniqueInput[]
    update?: VendorTypeRelationUpdateWithWhereUniqueWithoutVendorInput | VendorTypeRelationUpdateWithWhereUniqueWithoutVendorInput[]
    updateMany?: VendorTypeRelationUpdateManyWithWhereWithoutVendorInput | VendorTypeRelationUpdateManyWithWhereWithoutVendorInput[]
    deleteMany?: VendorTypeRelationScalarWhereInput | VendorTypeRelationScalarWhereInput[]
  }

  export type FavouriteUncheckedUpdateManyWithoutVendorNestedInput = {
    create?: XOR<FavouriteCreateWithoutVendorInput, FavouriteUncheckedCreateWithoutVendorInput> | FavouriteCreateWithoutVendorInput[] | FavouriteUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: FavouriteCreateOrConnectWithoutVendorInput | FavouriteCreateOrConnectWithoutVendorInput[]
    upsert?: FavouriteUpsertWithWhereUniqueWithoutVendorInput | FavouriteUpsertWithWhereUniqueWithoutVendorInput[]
    createMany?: FavouriteCreateManyVendorInputEnvelope
    set?: FavouriteWhereUniqueInput | FavouriteWhereUniqueInput[]
    disconnect?: FavouriteWhereUniqueInput | FavouriteWhereUniqueInput[]
    delete?: FavouriteWhereUniqueInput | FavouriteWhereUniqueInput[]
    connect?: FavouriteWhereUniqueInput | FavouriteWhereUniqueInput[]
    update?: FavouriteUpdateWithWhereUniqueWithoutVendorInput | FavouriteUpdateWithWhereUniqueWithoutVendorInput[]
    updateMany?: FavouriteUpdateManyWithWhereWithoutVendorInput | FavouriteUpdateManyWithWhereWithoutVendorInput[]
    deleteMany?: FavouriteScalarWhereInput | FavouriteScalarWhereInput[]
  }

  export type LowStockReportUncheckedUpdateManyWithoutVendorNestedInput = {
    create?: XOR<LowStockReportCreateWithoutVendorInput, LowStockReportUncheckedCreateWithoutVendorInput> | LowStockReportCreateWithoutVendorInput[] | LowStockReportUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: LowStockReportCreateOrConnectWithoutVendorInput | LowStockReportCreateOrConnectWithoutVendorInput[]
    upsert?: LowStockReportUpsertWithWhereUniqueWithoutVendorInput | LowStockReportUpsertWithWhereUniqueWithoutVendorInput[]
    createMany?: LowStockReportCreateManyVendorInputEnvelope
    set?: LowStockReportWhereUniqueInput | LowStockReportWhereUniqueInput[]
    disconnect?: LowStockReportWhereUniqueInput | LowStockReportWhereUniqueInput[]
    delete?: LowStockReportWhereUniqueInput | LowStockReportWhereUniqueInput[]
    connect?: LowStockReportWhereUniqueInput | LowStockReportWhereUniqueInput[]
    update?: LowStockReportUpdateWithWhereUniqueWithoutVendorInput | LowStockReportUpdateWithWhereUniqueWithoutVendorInput[]
    updateMany?: LowStockReportUpdateManyWithWhereWithoutVendorInput | LowStockReportUpdateManyWithWhereWithoutVendorInput[]
    deleteMany?: LowStockReportScalarWhereInput | LowStockReportScalarWhereInput[]
  }

  export type VendorTypeRelationCreateNestedManyWithoutTypeInput = {
    create?: XOR<VendorTypeRelationCreateWithoutTypeInput, VendorTypeRelationUncheckedCreateWithoutTypeInput> | VendorTypeRelationCreateWithoutTypeInput[] | VendorTypeRelationUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: VendorTypeRelationCreateOrConnectWithoutTypeInput | VendorTypeRelationCreateOrConnectWithoutTypeInput[]
    createMany?: VendorTypeRelationCreateManyTypeInputEnvelope
    connect?: VendorTypeRelationWhereUniqueInput | VendorTypeRelationWhereUniqueInput[]
  }

  export type VendorTypeRelationUncheckedCreateNestedManyWithoutTypeInput = {
    create?: XOR<VendorTypeRelationCreateWithoutTypeInput, VendorTypeRelationUncheckedCreateWithoutTypeInput> | VendorTypeRelationCreateWithoutTypeInput[] | VendorTypeRelationUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: VendorTypeRelationCreateOrConnectWithoutTypeInput | VendorTypeRelationCreateOrConnectWithoutTypeInput[]
    createMany?: VendorTypeRelationCreateManyTypeInputEnvelope
    connect?: VendorTypeRelationWhereUniqueInput | VendorTypeRelationWhereUniqueInput[]
  }

  export type VendorTypeRelationUpdateManyWithoutTypeNestedInput = {
    create?: XOR<VendorTypeRelationCreateWithoutTypeInput, VendorTypeRelationUncheckedCreateWithoutTypeInput> | VendorTypeRelationCreateWithoutTypeInput[] | VendorTypeRelationUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: VendorTypeRelationCreateOrConnectWithoutTypeInput | VendorTypeRelationCreateOrConnectWithoutTypeInput[]
    upsert?: VendorTypeRelationUpsertWithWhereUniqueWithoutTypeInput | VendorTypeRelationUpsertWithWhereUniqueWithoutTypeInput[]
    createMany?: VendorTypeRelationCreateManyTypeInputEnvelope
    set?: VendorTypeRelationWhereUniqueInput | VendorTypeRelationWhereUniqueInput[]
    disconnect?: VendorTypeRelationWhereUniqueInput | VendorTypeRelationWhereUniqueInput[]
    delete?: VendorTypeRelationWhereUniqueInput | VendorTypeRelationWhereUniqueInput[]
    connect?: VendorTypeRelationWhereUniqueInput | VendorTypeRelationWhereUniqueInput[]
    update?: VendorTypeRelationUpdateWithWhereUniqueWithoutTypeInput | VendorTypeRelationUpdateWithWhereUniqueWithoutTypeInput[]
    updateMany?: VendorTypeRelationUpdateManyWithWhereWithoutTypeInput | VendorTypeRelationUpdateManyWithWhereWithoutTypeInput[]
    deleteMany?: VendorTypeRelationScalarWhereInput | VendorTypeRelationScalarWhereInput[]
  }

  export type VendorTypeRelationUncheckedUpdateManyWithoutTypeNestedInput = {
    create?: XOR<VendorTypeRelationCreateWithoutTypeInput, VendorTypeRelationUncheckedCreateWithoutTypeInput> | VendorTypeRelationCreateWithoutTypeInput[] | VendorTypeRelationUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: VendorTypeRelationCreateOrConnectWithoutTypeInput | VendorTypeRelationCreateOrConnectWithoutTypeInput[]
    upsert?: VendorTypeRelationUpsertWithWhereUniqueWithoutTypeInput | VendorTypeRelationUpsertWithWhereUniqueWithoutTypeInput[]
    createMany?: VendorTypeRelationCreateManyTypeInputEnvelope
    set?: VendorTypeRelationWhereUniqueInput | VendorTypeRelationWhereUniqueInput[]
    disconnect?: VendorTypeRelationWhereUniqueInput | VendorTypeRelationWhereUniqueInput[]
    delete?: VendorTypeRelationWhereUniqueInput | VendorTypeRelationWhereUniqueInput[]
    connect?: VendorTypeRelationWhereUniqueInput | VendorTypeRelationWhereUniqueInput[]
    update?: VendorTypeRelationUpdateWithWhereUniqueWithoutTypeInput | VendorTypeRelationUpdateWithWhereUniqueWithoutTypeInput[]
    updateMany?: VendorTypeRelationUpdateManyWithWhereWithoutTypeInput | VendorTypeRelationUpdateManyWithWhereWithoutTypeInput[]
    deleteMany?: VendorTypeRelationScalarWhereInput | VendorTypeRelationScalarWhereInput[]
  }

  export type VendorCreateNestedOneWithoutVendorTypesInput = {
    create?: XOR<VendorCreateWithoutVendorTypesInput, VendorUncheckedCreateWithoutVendorTypesInput>
    connectOrCreate?: VendorCreateOrConnectWithoutVendorTypesInput
    connect?: VendorWhereUniqueInput
  }

  export type VendorTypeCreateNestedOneWithoutVendorsInput = {
    create?: XOR<VendorTypeCreateWithoutVendorsInput, VendorTypeUncheckedCreateWithoutVendorsInput>
    connectOrCreate?: VendorTypeCreateOrConnectWithoutVendorsInput
    connect?: VendorTypeWhereUniqueInput
  }

  export type VendorUpdateOneRequiredWithoutVendorTypesNestedInput = {
    create?: XOR<VendorCreateWithoutVendorTypesInput, VendorUncheckedCreateWithoutVendorTypesInput>
    connectOrCreate?: VendorCreateOrConnectWithoutVendorTypesInput
    upsert?: VendorUpsertWithoutVendorTypesInput
    connect?: VendorWhereUniqueInput
    update?: XOR<XOR<VendorUpdateToOneWithWhereWithoutVendorTypesInput, VendorUpdateWithoutVendorTypesInput>, VendorUncheckedUpdateWithoutVendorTypesInput>
  }

  export type VendorTypeUpdateOneRequiredWithoutVendorsNestedInput = {
    create?: XOR<VendorTypeCreateWithoutVendorsInput, VendorTypeUncheckedCreateWithoutVendorsInput>
    connectOrCreate?: VendorTypeCreateOrConnectWithoutVendorsInput
    upsert?: VendorTypeUpsertWithoutVendorsInput
    connect?: VendorTypeWhereUniqueInput
    update?: XOR<XOR<VendorTypeUpdateToOneWithWhereWithoutVendorsInput, VendorTypeUpdateWithoutVendorsInput>, VendorTypeUncheckedUpdateWithoutVendorsInput>
  }

  export type UserCreateNestedOneWithoutFavouriteVendorsInput = {
    create?: XOR<UserCreateWithoutFavouriteVendorsInput, UserUncheckedCreateWithoutFavouriteVendorsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavouriteVendorsInput
    connect?: UserWhereUniqueInput
  }

  export type VendorCreateNestedOneWithoutFavouritesInput = {
    create?: XOR<VendorCreateWithoutFavouritesInput, VendorUncheckedCreateWithoutFavouritesInput>
    connectOrCreate?: VendorCreateOrConnectWithoutFavouritesInput
    connect?: VendorWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFavouriteVendorsNestedInput = {
    create?: XOR<UserCreateWithoutFavouriteVendorsInput, UserUncheckedCreateWithoutFavouriteVendorsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavouriteVendorsInput
    upsert?: UserUpsertWithoutFavouriteVendorsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFavouriteVendorsInput, UserUpdateWithoutFavouriteVendorsInput>, UserUncheckedUpdateWithoutFavouriteVendorsInput>
  }

  export type VendorUpdateOneRequiredWithoutFavouritesNestedInput = {
    create?: XOR<VendorCreateWithoutFavouritesInput, VendorUncheckedCreateWithoutFavouritesInput>
    connectOrCreate?: VendorCreateOrConnectWithoutFavouritesInput
    upsert?: VendorUpsertWithoutFavouritesInput
    connect?: VendorWhereUniqueInput
    update?: XOR<XOR<VendorUpdateToOneWithWhereWithoutFavouritesInput, VendorUpdateWithoutFavouritesInput>, VendorUncheckedUpdateWithoutFavouritesInput>
  }

  export type UserCreateNestedOneWithoutLowStockReportsInput = {
    create?: XOR<UserCreateWithoutLowStockReportsInput, UserUncheckedCreateWithoutLowStockReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLowStockReportsInput
    connect?: UserWhereUniqueInput
  }

  export type VendorCreateNestedOneWithoutLowStockReportsInput = {
    create?: XOR<VendorCreateWithoutLowStockReportsInput, VendorUncheckedCreateWithoutLowStockReportsInput>
    connectOrCreate?: VendorCreateOrConnectWithoutLowStockReportsInput
    connect?: VendorWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutLowStockReportsNestedInput = {
    create?: XOR<UserCreateWithoutLowStockReportsInput, UserUncheckedCreateWithoutLowStockReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLowStockReportsInput
    upsert?: UserUpsertWithoutLowStockReportsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLowStockReportsInput, UserUpdateWithoutLowStockReportsInput>, UserUncheckedUpdateWithoutLowStockReportsInput>
  }

  export type VendorUpdateOneRequiredWithoutLowStockReportsNestedInput = {
    create?: XOR<VendorCreateWithoutLowStockReportsInput, VendorUncheckedCreateWithoutLowStockReportsInput>
    connectOrCreate?: VendorCreateOrConnectWithoutLowStockReportsInput
    upsert?: VendorUpsertWithoutLowStockReportsInput
    connect?: VendorWhereUniqueInput
    update?: XOR<XOR<VendorUpdateToOneWithWhereWithoutLowStockReportsInput, VendorUpdateWithoutLowStockReportsInput>, VendorUncheckedUpdateWithoutLowStockReportsInput>
  }

  export type UserCreateNestedOneWithoutSubmittedVendorsInput = {
    create?: XOR<UserCreateWithoutSubmittedVendorsInput, UserUncheckedCreateWithoutSubmittedVendorsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmittedVendorsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSubmittedVendorsNestedInput = {
    create?: XOR<UserCreateWithoutSubmittedVendorsInput, UserUncheckedCreateWithoutSubmittedVendorsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmittedVendorsInput
    upsert?: UserUpsertWithoutSubmittedVendorsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSubmittedVendorsInput, UserUpdateWithoutSubmittedVendorsInput>, UserUncheckedUpdateWithoutSubmittedVendorsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type SubmittedVendorCreateWithoutSubmitterInput = {
    name: string
    type: string
    description?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
  }

  export type SubmittedVendorUncheckedCreateWithoutSubmitterInput = {
    id?: number
    name: string
    type: string
    description?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
  }

  export type SubmittedVendorCreateOrConnectWithoutSubmitterInput = {
    where: SubmittedVendorWhereUniqueInput
    create: XOR<SubmittedVendorCreateWithoutSubmitterInput, SubmittedVendorUncheckedCreateWithoutSubmitterInput>
  }

  export type SubmittedVendorCreateManySubmitterInputEnvelope = {
    data: SubmittedVendorCreateManySubmitterInput | SubmittedVendorCreateManySubmitterInput[]
    skipDuplicates?: boolean
  }

  export type FavouriteCreateWithoutUserInput = {
    vendor: VendorCreateNestedOneWithoutFavouritesInput
  }

  export type FavouriteUncheckedCreateWithoutUserInput = {
    vendorId: number
  }

  export type FavouriteCreateOrConnectWithoutUserInput = {
    where: FavouriteWhereUniqueInput
    create: XOR<FavouriteCreateWithoutUserInput, FavouriteUncheckedCreateWithoutUserInput>
  }

  export type FavouriteCreateManyUserInputEnvelope = {
    data: FavouriteCreateManyUserInput | FavouriteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type LowStockReportCreateWithoutUserInput = {
    comment?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    vendor: VendorCreateNestedOneWithoutLowStockReportsInput
  }

  export type LowStockReportUncheckedCreateWithoutUserInput = {
    id?: number
    vendorId: number
    comment?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
  }

  export type LowStockReportCreateOrConnectWithoutUserInput = {
    where: LowStockReportWhereUniqueInput
    create: XOR<LowStockReportCreateWithoutUserInput, LowStockReportUncheckedCreateWithoutUserInput>
  }

  export type LowStockReportCreateManyUserInputEnvelope = {
    data: LowStockReportCreateManyUserInput | LowStockReportCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type VendorCreateWithoutOwnerInput = {
    name: string
    description?: string | null
    hours?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: boolean
    photos?: NullableJsonNullValueInput | InputJsonValue
    paymentMethods?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    vendorTypes?: VendorTypeRelationCreateNestedManyWithoutVendorInput
    favourites?: FavouriteCreateNestedManyWithoutVendorInput
    lowStockReports?: LowStockReportCreateNestedManyWithoutVendorInput
  }

  export type VendorUncheckedCreateWithoutOwnerInput = {
    id?: number
    name: string
    description?: string | null
    hours?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: boolean
    photos?: NullableJsonNullValueInput | InputJsonValue
    paymentMethods?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    vendorTypes?: VendorTypeRelationUncheckedCreateNestedManyWithoutVendorInput
    favourites?: FavouriteUncheckedCreateNestedManyWithoutVendorInput
    lowStockReports?: LowStockReportUncheckedCreateNestedManyWithoutVendorInput
  }

  export type VendorCreateOrConnectWithoutOwnerInput = {
    where: VendorWhereUniqueInput
    create: XOR<VendorCreateWithoutOwnerInput, VendorUncheckedCreateWithoutOwnerInput>
  }

  export type SubmittedVendorUpsertWithWhereUniqueWithoutSubmitterInput = {
    where: SubmittedVendorWhereUniqueInput
    update: XOR<SubmittedVendorUpdateWithoutSubmitterInput, SubmittedVendorUncheckedUpdateWithoutSubmitterInput>
    create: XOR<SubmittedVendorCreateWithoutSubmitterInput, SubmittedVendorUncheckedCreateWithoutSubmitterInput>
  }

  export type SubmittedVendorUpdateWithWhereUniqueWithoutSubmitterInput = {
    where: SubmittedVendorWhereUniqueInput
    data: XOR<SubmittedVendorUpdateWithoutSubmitterInput, SubmittedVendorUncheckedUpdateWithoutSubmitterInput>
  }

  export type SubmittedVendorUpdateManyWithWhereWithoutSubmitterInput = {
    where: SubmittedVendorScalarWhereInput
    data: XOR<SubmittedVendorUpdateManyMutationInput, SubmittedVendorUncheckedUpdateManyWithoutSubmitterInput>
  }

  export type SubmittedVendorScalarWhereInput = {
    AND?: SubmittedVendorScalarWhereInput | SubmittedVendorScalarWhereInput[]
    OR?: SubmittedVendorScalarWhereInput[]
    NOT?: SubmittedVendorScalarWhereInput | SubmittedVendorScalarWhereInput[]
    id?: IntFilter<"SubmittedVendor"> | number
    submitterId?: IntFilter<"SubmittedVendor"> | number
    name?: StringFilter<"SubmittedVendor"> | string
    type?: StringFilter<"SubmittedVendor"> | string
    description?: StringNullableFilter<"SubmittedVendor"> | string | null
    photoUrl?: StringNullableFilter<"SubmittedVendor"> | string | null
    createdAt?: DateTimeFilter<"SubmittedVendor"> | Date | string
  }

  export type FavouriteUpsertWithWhereUniqueWithoutUserInput = {
    where: FavouriteWhereUniqueInput
    update: XOR<FavouriteUpdateWithoutUserInput, FavouriteUncheckedUpdateWithoutUserInput>
    create: XOR<FavouriteCreateWithoutUserInput, FavouriteUncheckedCreateWithoutUserInput>
  }

  export type FavouriteUpdateWithWhereUniqueWithoutUserInput = {
    where: FavouriteWhereUniqueInput
    data: XOR<FavouriteUpdateWithoutUserInput, FavouriteUncheckedUpdateWithoutUserInput>
  }

  export type FavouriteUpdateManyWithWhereWithoutUserInput = {
    where: FavouriteScalarWhereInput
    data: XOR<FavouriteUpdateManyMutationInput, FavouriteUncheckedUpdateManyWithoutUserInput>
  }

  export type FavouriteScalarWhereInput = {
    AND?: FavouriteScalarWhereInput | FavouriteScalarWhereInput[]
    OR?: FavouriteScalarWhereInput[]
    NOT?: FavouriteScalarWhereInput | FavouriteScalarWhereInput[]
    userId?: IntFilter<"Favourite"> | number
    vendorId?: IntFilter<"Favourite"> | number
  }

  export type LowStockReportUpsertWithWhereUniqueWithoutUserInput = {
    where: LowStockReportWhereUniqueInput
    update: XOR<LowStockReportUpdateWithoutUserInput, LowStockReportUncheckedUpdateWithoutUserInput>
    create: XOR<LowStockReportCreateWithoutUserInput, LowStockReportUncheckedCreateWithoutUserInput>
  }

  export type LowStockReportUpdateWithWhereUniqueWithoutUserInput = {
    where: LowStockReportWhereUniqueInput
    data: XOR<LowStockReportUpdateWithoutUserInput, LowStockReportUncheckedUpdateWithoutUserInput>
  }

  export type LowStockReportUpdateManyWithWhereWithoutUserInput = {
    where: LowStockReportScalarWhereInput
    data: XOR<LowStockReportUpdateManyMutationInput, LowStockReportUncheckedUpdateManyWithoutUserInput>
  }

  export type LowStockReportScalarWhereInput = {
    AND?: LowStockReportScalarWhereInput | LowStockReportScalarWhereInput[]
    OR?: LowStockReportScalarWhereInput[]
    NOT?: LowStockReportScalarWhereInput | LowStockReportScalarWhereInput[]
    id?: IntFilter<"LowStockReport"> | number
    userId?: IntFilter<"LowStockReport"> | number
    vendorId?: IntFilter<"LowStockReport"> | number
    comment?: StringNullableFilter<"LowStockReport"> | string | null
    photoUrl?: StringNullableFilter<"LowStockReport"> | string | null
    createdAt?: DateTimeFilter<"LowStockReport"> | Date | string
  }

  export type VendorUpsertWithoutOwnerInput = {
    update: XOR<VendorUpdateWithoutOwnerInput, VendorUncheckedUpdateWithoutOwnerInput>
    create: XOR<VendorCreateWithoutOwnerInput, VendorUncheckedCreateWithoutOwnerInput>
    where?: VendorWhereInput
  }

  export type VendorUpdateToOneWithWhereWithoutOwnerInput = {
    where?: VendorWhereInput
    data: XOR<VendorUpdateWithoutOwnerInput, VendorUncheckedUpdateWithoutOwnerInput>
  }

  export type VendorUpdateWithoutOwnerInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    photos?: NullableJsonNullValueInput | InputJsonValue
    paymentMethods?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendorTypes?: VendorTypeRelationUpdateManyWithoutVendorNestedInput
    favourites?: FavouriteUpdateManyWithoutVendorNestedInput
    lowStockReports?: LowStockReportUpdateManyWithoutVendorNestedInput
  }

  export type VendorUncheckedUpdateWithoutOwnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    photos?: NullableJsonNullValueInput | InputJsonValue
    paymentMethods?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendorTypes?: VendorTypeRelationUncheckedUpdateManyWithoutVendorNestedInput
    favourites?: FavouriteUncheckedUpdateManyWithoutVendorNestedInput
    lowStockReports?: LowStockReportUncheckedUpdateManyWithoutVendorNestedInput
  }

  export type UserCreateWithoutOwnedVendorInput = {
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedVendors?: SubmittedVendorCreateNestedManyWithoutSubmitterInput
    favouriteVendors?: FavouriteCreateNestedManyWithoutUserInput
    lowStockReports?: LowStockReportCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOwnedVendorInput = {
    id?: number
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedVendors?: SubmittedVendorUncheckedCreateNestedManyWithoutSubmitterInput
    favouriteVendors?: FavouriteUncheckedCreateNestedManyWithoutUserInput
    lowStockReports?: LowStockReportUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOwnedVendorInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOwnedVendorInput, UserUncheckedCreateWithoutOwnedVendorInput>
  }

  export type VendorTypeRelationCreateWithoutVendorInput = {
    type: VendorTypeCreateNestedOneWithoutVendorsInput
  }

  export type VendorTypeRelationUncheckedCreateWithoutVendorInput = {
    typeId: number
  }

  export type VendorTypeRelationCreateOrConnectWithoutVendorInput = {
    where: VendorTypeRelationWhereUniqueInput
    create: XOR<VendorTypeRelationCreateWithoutVendorInput, VendorTypeRelationUncheckedCreateWithoutVendorInput>
  }

  export type VendorTypeRelationCreateManyVendorInputEnvelope = {
    data: VendorTypeRelationCreateManyVendorInput | VendorTypeRelationCreateManyVendorInput[]
    skipDuplicates?: boolean
  }

  export type FavouriteCreateWithoutVendorInput = {
    user: UserCreateNestedOneWithoutFavouriteVendorsInput
  }

  export type FavouriteUncheckedCreateWithoutVendorInput = {
    userId: number
  }

  export type FavouriteCreateOrConnectWithoutVendorInput = {
    where: FavouriteWhereUniqueInput
    create: XOR<FavouriteCreateWithoutVendorInput, FavouriteUncheckedCreateWithoutVendorInput>
  }

  export type FavouriteCreateManyVendorInputEnvelope = {
    data: FavouriteCreateManyVendorInput | FavouriteCreateManyVendorInput[]
    skipDuplicates?: boolean
  }

  export type LowStockReportCreateWithoutVendorInput = {
    comment?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutLowStockReportsInput
  }

  export type LowStockReportUncheckedCreateWithoutVendorInput = {
    id?: number
    userId: number
    comment?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
  }

  export type LowStockReportCreateOrConnectWithoutVendorInput = {
    where: LowStockReportWhereUniqueInput
    create: XOR<LowStockReportCreateWithoutVendorInput, LowStockReportUncheckedCreateWithoutVendorInput>
  }

  export type LowStockReportCreateManyVendorInputEnvelope = {
    data: LowStockReportCreateManyVendorInput | LowStockReportCreateManyVendorInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutOwnedVendorInput = {
    update: XOR<UserUpdateWithoutOwnedVendorInput, UserUncheckedUpdateWithoutOwnedVendorInput>
    create: XOR<UserCreateWithoutOwnedVendorInput, UserUncheckedCreateWithoutOwnedVendorInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOwnedVendorInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOwnedVendorInput, UserUncheckedUpdateWithoutOwnedVendorInput>
  }

  export type UserUpdateWithoutOwnedVendorInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedVendors?: SubmittedVendorUpdateManyWithoutSubmitterNestedInput
    favouriteVendors?: FavouriteUpdateManyWithoutUserNestedInput
    lowStockReports?: LowStockReportUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOwnedVendorInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedVendors?: SubmittedVendorUncheckedUpdateManyWithoutSubmitterNestedInput
    favouriteVendors?: FavouriteUncheckedUpdateManyWithoutUserNestedInput
    lowStockReports?: LowStockReportUncheckedUpdateManyWithoutUserNestedInput
  }

  export type VendorTypeRelationUpsertWithWhereUniqueWithoutVendorInput = {
    where: VendorTypeRelationWhereUniqueInput
    update: XOR<VendorTypeRelationUpdateWithoutVendorInput, VendorTypeRelationUncheckedUpdateWithoutVendorInput>
    create: XOR<VendorTypeRelationCreateWithoutVendorInput, VendorTypeRelationUncheckedCreateWithoutVendorInput>
  }

  export type VendorTypeRelationUpdateWithWhereUniqueWithoutVendorInput = {
    where: VendorTypeRelationWhereUniqueInput
    data: XOR<VendorTypeRelationUpdateWithoutVendorInput, VendorTypeRelationUncheckedUpdateWithoutVendorInput>
  }

  export type VendorTypeRelationUpdateManyWithWhereWithoutVendorInput = {
    where: VendorTypeRelationScalarWhereInput
    data: XOR<VendorTypeRelationUpdateManyMutationInput, VendorTypeRelationUncheckedUpdateManyWithoutVendorInput>
  }

  export type VendorTypeRelationScalarWhereInput = {
    AND?: VendorTypeRelationScalarWhereInput | VendorTypeRelationScalarWhereInput[]
    OR?: VendorTypeRelationScalarWhereInput[]
    NOT?: VendorTypeRelationScalarWhereInput | VendorTypeRelationScalarWhereInput[]
    vendorId?: IntFilter<"VendorTypeRelation"> | number
    typeId?: IntFilter<"VendorTypeRelation"> | number
  }

  export type FavouriteUpsertWithWhereUniqueWithoutVendorInput = {
    where: FavouriteWhereUniqueInput
    update: XOR<FavouriteUpdateWithoutVendorInput, FavouriteUncheckedUpdateWithoutVendorInput>
    create: XOR<FavouriteCreateWithoutVendorInput, FavouriteUncheckedCreateWithoutVendorInput>
  }

  export type FavouriteUpdateWithWhereUniqueWithoutVendorInput = {
    where: FavouriteWhereUniqueInput
    data: XOR<FavouriteUpdateWithoutVendorInput, FavouriteUncheckedUpdateWithoutVendorInput>
  }

  export type FavouriteUpdateManyWithWhereWithoutVendorInput = {
    where: FavouriteScalarWhereInput
    data: XOR<FavouriteUpdateManyMutationInput, FavouriteUncheckedUpdateManyWithoutVendorInput>
  }

  export type LowStockReportUpsertWithWhereUniqueWithoutVendorInput = {
    where: LowStockReportWhereUniqueInput
    update: XOR<LowStockReportUpdateWithoutVendorInput, LowStockReportUncheckedUpdateWithoutVendorInput>
    create: XOR<LowStockReportCreateWithoutVendorInput, LowStockReportUncheckedCreateWithoutVendorInput>
  }

  export type LowStockReportUpdateWithWhereUniqueWithoutVendorInput = {
    where: LowStockReportWhereUniqueInput
    data: XOR<LowStockReportUpdateWithoutVendorInput, LowStockReportUncheckedUpdateWithoutVendorInput>
  }

  export type LowStockReportUpdateManyWithWhereWithoutVendorInput = {
    where: LowStockReportScalarWhereInput
    data: XOR<LowStockReportUpdateManyMutationInput, LowStockReportUncheckedUpdateManyWithoutVendorInput>
  }

  export type VendorTypeRelationCreateWithoutTypeInput = {
    vendor: VendorCreateNestedOneWithoutVendorTypesInput
  }

  export type VendorTypeRelationUncheckedCreateWithoutTypeInput = {
    vendorId: number
  }

  export type VendorTypeRelationCreateOrConnectWithoutTypeInput = {
    where: VendorTypeRelationWhereUniqueInput
    create: XOR<VendorTypeRelationCreateWithoutTypeInput, VendorTypeRelationUncheckedCreateWithoutTypeInput>
  }

  export type VendorTypeRelationCreateManyTypeInputEnvelope = {
    data: VendorTypeRelationCreateManyTypeInput | VendorTypeRelationCreateManyTypeInput[]
    skipDuplicates?: boolean
  }

  export type VendorTypeRelationUpsertWithWhereUniqueWithoutTypeInput = {
    where: VendorTypeRelationWhereUniqueInput
    update: XOR<VendorTypeRelationUpdateWithoutTypeInput, VendorTypeRelationUncheckedUpdateWithoutTypeInput>
    create: XOR<VendorTypeRelationCreateWithoutTypeInput, VendorTypeRelationUncheckedCreateWithoutTypeInput>
  }

  export type VendorTypeRelationUpdateWithWhereUniqueWithoutTypeInput = {
    where: VendorTypeRelationWhereUniqueInput
    data: XOR<VendorTypeRelationUpdateWithoutTypeInput, VendorTypeRelationUncheckedUpdateWithoutTypeInput>
  }

  export type VendorTypeRelationUpdateManyWithWhereWithoutTypeInput = {
    where: VendorTypeRelationScalarWhereInput
    data: XOR<VendorTypeRelationUpdateManyMutationInput, VendorTypeRelationUncheckedUpdateManyWithoutTypeInput>
  }

  export type VendorCreateWithoutVendorTypesInput = {
    name: string
    description?: string | null
    hours?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: boolean
    photos?: NullableJsonNullValueInput | InputJsonValue
    paymentMethods?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: UserCreateNestedOneWithoutOwnedVendorInput
    favourites?: FavouriteCreateNestedManyWithoutVendorInput
    lowStockReports?: LowStockReportCreateNestedManyWithoutVendorInput
  }

  export type VendorUncheckedCreateWithoutVendorTypesInput = {
    id?: number
    name: string
    description?: string | null
    hours?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: boolean
    photos?: NullableJsonNullValueInput | InputJsonValue
    paymentMethods?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: number | null
    favourites?: FavouriteUncheckedCreateNestedManyWithoutVendorInput
    lowStockReports?: LowStockReportUncheckedCreateNestedManyWithoutVendorInput
  }

  export type VendorCreateOrConnectWithoutVendorTypesInput = {
    where: VendorWhereUniqueInput
    create: XOR<VendorCreateWithoutVendorTypesInput, VendorUncheckedCreateWithoutVendorTypesInput>
  }

  export type VendorTypeCreateWithoutVendorsInput = {
    name: string
  }

  export type VendorTypeUncheckedCreateWithoutVendorsInput = {
    id?: number
    name: string
  }

  export type VendorTypeCreateOrConnectWithoutVendorsInput = {
    where: VendorTypeWhereUniqueInput
    create: XOR<VendorTypeCreateWithoutVendorsInput, VendorTypeUncheckedCreateWithoutVendorsInput>
  }

  export type VendorUpsertWithoutVendorTypesInput = {
    update: XOR<VendorUpdateWithoutVendorTypesInput, VendorUncheckedUpdateWithoutVendorTypesInput>
    create: XOR<VendorCreateWithoutVendorTypesInput, VendorUncheckedCreateWithoutVendorTypesInput>
    where?: VendorWhereInput
  }

  export type VendorUpdateToOneWithWhereWithoutVendorTypesInput = {
    where?: VendorWhereInput
    data: XOR<VendorUpdateWithoutVendorTypesInput, VendorUncheckedUpdateWithoutVendorTypesInput>
  }

  export type VendorUpdateWithoutVendorTypesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    photos?: NullableJsonNullValueInput | InputJsonValue
    paymentMethods?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneWithoutOwnedVendorNestedInput
    favourites?: FavouriteUpdateManyWithoutVendorNestedInput
    lowStockReports?: LowStockReportUpdateManyWithoutVendorNestedInput
  }

  export type VendorUncheckedUpdateWithoutVendorTypesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    photos?: NullableJsonNullValueInput | InputJsonValue
    paymentMethods?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
    favourites?: FavouriteUncheckedUpdateManyWithoutVendorNestedInput
    lowStockReports?: LowStockReportUncheckedUpdateManyWithoutVendorNestedInput
  }

  export type VendorTypeUpsertWithoutVendorsInput = {
    update: XOR<VendorTypeUpdateWithoutVendorsInput, VendorTypeUncheckedUpdateWithoutVendorsInput>
    create: XOR<VendorTypeCreateWithoutVendorsInput, VendorTypeUncheckedCreateWithoutVendorsInput>
    where?: VendorTypeWhereInput
  }

  export type VendorTypeUpdateToOneWithWhereWithoutVendorsInput = {
    where?: VendorTypeWhereInput
    data: XOR<VendorTypeUpdateWithoutVendorsInput, VendorTypeUncheckedUpdateWithoutVendorsInput>
  }

  export type VendorTypeUpdateWithoutVendorsInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type VendorTypeUncheckedUpdateWithoutVendorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateWithoutFavouriteVendorsInput = {
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedVendors?: SubmittedVendorCreateNestedManyWithoutSubmitterInput
    lowStockReports?: LowStockReportCreateNestedManyWithoutUserInput
    ownedVendor?: VendorCreateNestedOneWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutFavouriteVendorsInput = {
    id?: number
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedVendors?: SubmittedVendorUncheckedCreateNestedManyWithoutSubmitterInput
    lowStockReports?: LowStockReportUncheckedCreateNestedManyWithoutUserInput
    ownedVendor?: VendorUncheckedCreateNestedOneWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutFavouriteVendorsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFavouriteVendorsInput, UserUncheckedCreateWithoutFavouriteVendorsInput>
  }

  export type VendorCreateWithoutFavouritesInput = {
    name: string
    description?: string | null
    hours?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: boolean
    photos?: NullableJsonNullValueInput | InputJsonValue
    paymentMethods?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: UserCreateNestedOneWithoutOwnedVendorInput
    vendorTypes?: VendorTypeRelationCreateNestedManyWithoutVendorInput
    lowStockReports?: LowStockReportCreateNestedManyWithoutVendorInput
  }

  export type VendorUncheckedCreateWithoutFavouritesInput = {
    id?: number
    name: string
    description?: string | null
    hours?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: boolean
    photos?: NullableJsonNullValueInput | InputJsonValue
    paymentMethods?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: number | null
    vendorTypes?: VendorTypeRelationUncheckedCreateNestedManyWithoutVendorInput
    lowStockReports?: LowStockReportUncheckedCreateNestedManyWithoutVendorInput
  }

  export type VendorCreateOrConnectWithoutFavouritesInput = {
    where: VendorWhereUniqueInput
    create: XOR<VendorCreateWithoutFavouritesInput, VendorUncheckedCreateWithoutFavouritesInput>
  }

  export type UserUpsertWithoutFavouriteVendorsInput = {
    update: XOR<UserUpdateWithoutFavouriteVendorsInput, UserUncheckedUpdateWithoutFavouriteVendorsInput>
    create: XOR<UserCreateWithoutFavouriteVendorsInput, UserUncheckedCreateWithoutFavouriteVendorsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFavouriteVendorsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFavouriteVendorsInput, UserUncheckedUpdateWithoutFavouriteVendorsInput>
  }

  export type UserUpdateWithoutFavouriteVendorsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedVendors?: SubmittedVendorUpdateManyWithoutSubmitterNestedInput
    lowStockReports?: LowStockReportUpdateManyWithoutUserNestedInput
    ownedVendor?: VendorUpdateOneWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutFavouriteVendorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedVendors?: SubmittedVendorUncheckedUpdateManyWithoutSubmitterNestedInput
    lowStockReports?: LowStockReportUncheckedUpdateManyWithoutUserNestedInput
    ownedVendor?: VendorUncheckedUpdateOneWithoutOwnerNestedInput
  }

  export type VendorUpsertWithoutFavouritesInput = {
    update: XOR<VendorUpdateWithoutFavouritesInput, VendorUncheckedUpdateWithoutFavouritesInput>
    create: XOR<VendorCreateWithoutFavouritesInput, VendorUncheckedCreateWithoutFavouritesInput>
    where?: VendorWhereInput
  }

  export type VendorUpdateToOneWithWhereWithoutFavouritesInput = {
    where?: VendorWhereInput
    data: XOR<VendorUpdateWithoutFavouritesInput, VendorUncheckedUpdateWithoutFavouritesInput>
  }

  export type VendorUpdateWithoutFavouritesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    photos?: NullableJsonNullValueInput | InputJsonValue
    paymentMethods?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneWithoutOwnedVendorNestedInput
    vendorTypes?: VendorTypeRelationUpdateManyWithoutVendorNestedInput
    lowStockReports?: LowStockReportUpdateManyWithoutVendorNestedInput
  }

  export type VendorUncheckedUpdateWithoutFavouritesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    photos?: NullableJsonNullValueInput | InputJsonValue
    paymentMethods?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
    vendorTypes?: VendorTypeRelationUncheckedUpdateManyWithoutVendorNestedInput
    lowStockReports?: LowStockReportUncheckedUpdateManyWithoutVendorNestedInput
  }

  export type UserCreateWithoutLowStockReportsInput = {
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedVendors?: SubmittedVendorCreateNestedManyWithoutSubmitterInput
    favouriteVendors?: FavouriteCreateNestedManyWithoutUserInput
    ownedVendor?: VendorCreateNestedOneWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutLowStockReportsInput = {
    id?: number
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedVendors?: SubmittedVendorUncheckedCreateNestedManyWithoutSubmitterInput
    favouriteVendors?: FavouriteUncheckedCreateNestedManyWithoutUserInput
    ownedVendor?: VendorUncheckedCreateNestedOneWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutLowStockReportsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLowStockReportsInput, UserUncheckedCreateWithoutLowStockReportsInput>
  }

  export type VendorCreateWithoutLowStockReportsInput = {
    name: string
    description?: string | null
    hours?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: boolean
    photos?: NullableJsonNullValueInput | InputJsonValue
    paymentMethods?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: UserCreateNestedOneWithoutOwnedVendorInput
    vendorTypes?: VendorTypeRelationCreateNestedManyWithoutVendorInput
    favourites?: FavouriteCreateNestedManyWithoutVendorInput
  }

  export type VendorUncheckedCreateWithoutLowStockReportsInput = {
    id?: number
    name: string
    description?: string | null
    hours?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: boolean
    photos?: NullableJsonNullValueInput | InputJsonValue
    paymentMethods?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: number | null
    vendorTypes?: VendorTypeRelationUncheckedCreateNestedManyWithoutVendorInput
    favourites?: FavouriteUncheckedCreateNestedManyWithoutVendorInput
  }

  export type VendorCreateOrConnectWithoutLowStockReportsInput = {
    where: VendorWhereUniqueInput
    create: XOR<VendorCreateWithoutLowStockReportsInput, VendorUncheckedCreateWithoutLowStockReportsInput>
  }

  export type UserUpsertWithoutLowStockReportsInput = {
    update: XOR<UserUpdateWithoutLowStockReportsInput, UserUncheckedUpdateWithoutLowStockReportsInput>
    create: XOR<UserCreateWithoutLowStockReportsInput, UserUncheckedCreateWithoutLowStockReportsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLowStockReportsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLowStockReportsInput, UserUncheckedUpdateWithoutLowStockReportsInput>
  }

  export type UserUpdateWithoutLowStockReportsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedVendors?: SubmittedVendorUpdateManyWithoutSubmitterNestedInput
    favouriteVendors?: FavouriteUpdateManyWithoutUserNestedInput
    ownedVendor?: VendorUpdateOneWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutLowStockReportsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedVendors?: SubmittedVendorUncheckedUpdateManyWithoutSubmitterNestedInput
    favouriteVendors?: FavouriteUncheckedUpdateManyWithoutUserNestedInput
    ownedVendor?: VendorUncheckedUpdateOneWithoutOwnerNestedInput
  }

  export type VendorUpsertWithoutLowStockReportsInput = {
    update: XOR<VendorUpdateWithoutLowStockReportsInput, VendorUncheckedUpdateWithoutLowStockReportsInput>
    create: XOR<VendorCreateWithoutLowStockReportsInput, VendorUncheckedCreateWithoutLowStockReportsInput>
    where?: VendorWhereInput
  }

  export type VendorUpdateToOneWithWhereWithoutLowStockReportsInput = {
    where?: VendorWhereInput
    data: XOR<VendorUpdateWithoutLowStockReportsInput, VendorUncheckedUpdateWithoutLowStockReportsInput>
  }

  export type VendorUpdateWithoutLowStockReportsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    photos?: NullableJsonNullValueInput | InputJsonValue
    paymentMethods?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneWithoutOwnedVendorNestedInput
    vendorTypes?: VendorTypeRelationUpdateManyWithoutVendorNestedInput
    favourites?: FavouriteUpdateManyWithoutVendorNestedInput
  }

  export type VendorUncheckedUpdateWithoutLowStockReportsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableJsonNullValueInput | InputJsonValue
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    photos?: NullableJsonNullValueInput | InputJsonValue
    paymentMethods?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
    vendorTypes?: VendorTypeRelationUncheckedUpdateManyWithoutVendorNestedInput
    favourites?: FavouriteUncheckedUpdateManyWithoutVendorNestedInput
  }

  export type UserCreateWithoutSubmittedVendorsInput = {
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    favouriteVendors?: FavouriteCreateNestedManyWithoutUserInput
    lowStockReports?: LowStockReportCreateNestedManyWithoutUserInput
    ownedVendor?: VendorCreateNestedOneWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutSubmittedVendorsInput = {
    id?: number
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    favouriteVendors?: FavouriteUncheckedCreateNestedManyWithoutUserInput
    lowStockReports?: LowStockReportUncheckedCreateNestedManyWithoutUserInput
    ownedVendor?: VendorUncheckedCreateNestedOneWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutSubmittedVendorsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSubmittedVendorsInput, UserUncheckedCreateWithoutSubmittedVendorsInput>
  }

  export type UserUpsertWithoutSubmittedVendorsInput = {
    update: XOR<UserUpdateWithoutSubmittedVendorsInput, UserUncheckedUpdateWithoutSubmittedVendorsInput>
    create: XOR<UserCreateWithoutSubmittedVendorsInput, UserUncheckedCreateWithoutSubmittedVendorsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSubmittedVendorsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSubmittedVendorsInput, UserUncheckedUpdateWithoutSubmittedVendorsInput>
  }

  export type UserUpdateWithoutSubmittedVendorsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    favouriteVendors?: FavouriteUpdateManyWithoutUserNestedInput
    lowStockReports?: LowStockReportUpdateManyWithoutUserNestedInput
    ownedVendor?: VendorUpdateOneWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutSubmittedVendorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    favouriteVendors?: FavouriteUncheckedUpdateManyWithoutUserNestedInput
    lowStockReports?: LowStockReportUncheckedUpdateManyWithoutUserNestedInput
    ownedVendor?: VendorUncheckedUpdateOneWithoutOwnerNestedInput
  }

  export type SubmittedVendorCreateManySubmitterInput = {
    id?: number
    name: string
    type: string
    description?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
  }

  export type FavouriteCreateManyUserInput = {
    vendorId: number
  }

  export type LowStockReportCreateManyUserInput = {
    id?: number
    vendorId: number
    comment?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
  }

  export type SubmittedVendorUpdateWithoutSubmitterInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmittedVendorUncheckedUpdateWithoutSubmitterInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmittedVendorUncheckedUpdateManyWithoutSubmitterInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavouriteUpdateWithoutUserInput = {
    vendor?: VendorUpdateOneRequiredWithoutFavouritesNestedInput
  }

  export type FavouriteUncheckedUpdateWithoutUserInput = {
    vendorId?: IntFieldUpdateOperationsInput | number
  }

  export type FavouriteUncheckedUpdateManyWithoutUserInput = {
    vendorId?: IntFieldUpdateOperationsInput | number
  }

  export type LowStockReportUpdateWithoutUserInput = {
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendor?: VendorUpdateOneRequiredWithoutLowStockReportsNestedInput
  }

  export type LowStockReportUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    vendorId?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LowStockReportUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    vendorId?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorTypeRelationCreateManyVendorInput = {
    typeId: number
  }

  export type FavouriteCreateManyVendorInput = {
    userId: number
  }

  export type LowStockReportCreateManyVendorInput = {
    id?: number
    userId: number
    comment?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
  }

  export type VendorTypeRelationUpdateWithoutVendorInput = {
    type?: VendorTypeUpdateOneRequiredWithoutVendorsNestedInput
  }

  export type VendorTypeRelationUncheckedUpdateWithoutVendorInput = {
    typeId?: IntFieldUpdateOperationsInput | number
  }

  export type VendorTypeRelationUncheckedUpdateManyWithoutVendorInput = {
    typeId?: IntFieldUpdateOperationsInput | number
  }

  export type FavouriteUpdateWithoutVendorInput = {
    user?: UserUpdateOneRequiredWithoutFavouriteVendorsNestedInput
  }

  export type FavouriteUncheckedUpdateWithoutVendorInput = {
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type FavouriteUncheckedUpdateManyWithoutVendorInput = {
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type LowStockReportUpdateWithoutVendorInput = {
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLowStockReportsNestedInput
  }

  export type LowStockReportUncheckedUpdateWithoutVendorInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LowStockReportUncheckedUpdateManyWithoutVendorInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorTypeRelationCreateManyTypeInput = {
    vendorId: number
  }

  export type VendorTypeRelationUpdateWithoutTypeInput = {
    vendor?: VendorUpdateOneRequiredWithoutVendorTypesNestedInput
  }

  export type VendorTypeRelationUncheckedUpdateWithoutTypeInput = {
    vendorId?: IntFieldUpdateOperationsInput | number
  }

  export type VendorTypeRelationUncheckedUpdateManyWithoutTypeInput = {
    vendorId?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}