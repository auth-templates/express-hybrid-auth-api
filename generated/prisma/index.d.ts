
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
 * Model leave_balances
 * 
 */
export type leave_balances = $Result.DefaultSelection<Prisma.$leave_balancesPayload>
/**
 * Model leave_requests
 * 
 */
export type leave_requests = $Result.DefaultSelection<Prisma.$leave_requestsPayload>
/**
 * Model leave_types
 * 
 */
export type leave_types = $Result.DefaultSelection<Prisma.$leave_typesPayload>
/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  employee: 'employee',
  manager: 'manager',
  admin: 'admin'
};

export type Role = (typeof Role)[keyof typeof Role]


export const LeaveStatus: {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected'
};

export type LeaveStatus = (typeof LeaveStatus)[keyof typeof LeaveStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type LeaveStatus = $Enums.LeaveStatus

export const LeaveStatus: typeof $Enums.LeaveStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Leave_balances
 * const leave_balances = await prisma.leave_balances.findMany()
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
   * // Fetch zero or more Leave_balances
   * const leave_balances = await prisma.leave_balances.findMany()
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
   * `prisma.leave_balances`: Exposes CRUD operations for the **leave_balances** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Leave_balances
    * const leave_balances = await prisma.leave_balances.findMany()
    * ```
    */
  get leave_balances(): Prisma.leave_balancesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.leave_requests`: Exposes CRUD operations for the **leave_requests** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Leave_requests
    * const leave_requests = await prisma.leave_requests.findMany()
    * ```
    */
  get leave_requests(): Prisma.leave_requestsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.leave_types`: Exposes CRUD operations for the **leave_types** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Leave_types
    * const leave_types = await prisma.leave_types.findMany()
    * ```
    */
  get leave_types(): Prisma.leave_typesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;
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
    leave_balances: 'leave_balances',
    leave_requests: 'leave_requests',
    leave_types: 'leave_types',
    users: 'users'
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
      modelProps: "leave_balances" | "leave_requests" | "leave_types" | "users"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      leave_balances: {
        payload: Prisma.$leave_balancesPayload<ExtArgs>
        fields: Prisma.leave_balancesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.leave_balancesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_balancesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.leave_balancesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_balancesPayload>
          }
          findFirst: {
            args: Prisma.leave_balancesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_balancesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.leave_balancesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_balancesPayload>
          }
          findMany: {
            args: Prisma.leave_balancesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_balancesPayload>[]
          }
          create: {
            args: Prisma.leave_balancesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_balancesPayload>
          }
          createMany: {
            args: Prisma.leave_balancesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.leave_balancesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_balancesPayload>[]
          }
          delete: {
            args: Prisma.leave_balancesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_balancesPayload>
          }
          update: {
            args: Prisma.leave_balancesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_balancesPayload>
          }
          deleteMany: {
            args: Prisma.leave_balancesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.leave_balancesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.leave_balancesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_balancesPayload>[]
          }
          upsert: {
            args: Prisma.leave_balancesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_balancesPayload>
          }
          aggregate: {
            args: Prisma.Leave_balancesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeave_balances>
          }
          groupBy: {
            args: Prisma.leave_balancesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Leave_balancesGroupByOutputType>[]
          }
          count: {
            args: Prisma.leave_balancesCountArgs<ExtArgs>
            result: $Utils.Optional<Leave_balancesCountAggregateOutputType> | number
          }
        }
      }
      leave_requests: {
        payload: Prisma.$leave_requestsPayload<ExtArgs>
        fields: Prisma.leave_requestsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.leave_requestsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_requestsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.leave_requestsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_requestsPayload>
          }
          findFirst: {
            args: Prisma.leave_requestsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_requestsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.leave_requestsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_requestsPayload>
          }
          findMany: {
            args: Prisma.leave_requestsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_requestsPayload>[]
          }
          create: {
            args: Prisma.leave_requestsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_requestsPayload>
          }
          createMany: {
            args: Prisma.leave_requestsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.leave_requestsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_requestsPayload>[]
          }
          delete: {
            args: Prisma.leave_requestsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_requestsPayload>
          }
          update: {
            args: Prisma.leave_requestsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_requestsPayload>
          }
          deleteMany: {
            args: Prisma.leave_requestsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.leave_requestsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.leave_requestsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_requestsPayload>[]
          }
          upsert: {
            args: Prisma.leave_requestsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_requestsPayload>
          }
          aggregate: {
            args: Prisma.Leave_requestsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeave_requests>
          }
          groupBy: {
            args: Prisma.leave_requestsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Leave_requestsGroupByOutputType>[]
          }
          count: {
            args: Prisma.leave_requestsCountArgs<ExtArgs>
            result: $Utils.Optional<Leave_requestsCountAggregateOutputType> | number
          }
        }
      }
      leave_types: {
        payload: Prisma.$leave_typesPayload<ExtArgs>
        fields: Prisma.leave_typesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.leave_typesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_typesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.leave_typesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_typesPayload>
          }
          findFirst: {
            args: Prisma.leave_typesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_typesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.leave_typesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_typesPayload>
          }
          findMany: {
            args: Prisma.leave_typesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_typesPayload>[]
          }
          create: {
            args: Prisma.leave_typesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_typesPayload>
          }
          createMany: {
            args: Prisma.leave_typesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.leave_typesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_typesPayload>[]
          }
          delete: {
            args: Prisma.leave_typesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_typesPayload>
          }
          update: {
            args: Prisma.leave_typesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_typesPayload>
          }
          deleteMany: {
            args: Prisma.leave_typesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.leave_typesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.leave_typesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_typesPayload>[]
          }
          upsert: {
            args: Prisma.leave_typesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_typesPayload>
          }
          aggregate: {
            args: Prisma.Leave_typesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeave_types>
          }
          groupBy: {
            args: Prisma.leave_typesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Leave_typesGroupByOutputType>[]
          }
          count: {
            args: Prisma.leave_typesCountArgs<ExtArgs>
            result: $Utils.Optional<Leave_typesCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
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
    leave_balances?: leave_balancesOmit
    leave_requests?: leave_requestsOmit
    leave_types?: leave_typesOmit
    users?: usersOmit
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
   * Count Type Leave_typesCountOutputType
   */

  export type Leave_typesCountOutputType = {
    leave_balances: number
    leave_requests: number
  }

  export type Leave_typesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leave_balances?: boolean | Leave_typesCountOutputTypeCountLeave_balancesArgs
    leave_requests?: boolean | Leave_typesCountOutputTypeCountLeave_requestsArgs
  }

  // Custom InputTypes
  /**
   * Leave_typesCountOutputType without action
   */
  export type Leave_typesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Leave_typesCountOutputType
     */
    select?: Leave_typesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Leave_typesCountOutputType without action
   */
  export type Leave_typesCountOutputTypeCountLeave_balancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: leave_balancesWhereInput
  }

  /**
   * Leave_typesCountOutputType without action
   */
  export type Leave_typesCountOutputTypeCountLeave_requestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: leave_requestsWhereInput
  }


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    leave_balances: number
    leave_requests: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leave_balances?: boolean | UsersCountOutputTypeCountLeave_balancesArgs
    leave_requests?: boolean | UsersCountOutputTypeCountLeave_requestsArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountLeave_balancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: leave_balancesWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountLeave_requestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: leave_requestsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model leave_balances
   */

  export type AggregateLeave_balances = {
    _count: Leave_balancesCountAggregateOutputType | null
    _avg: Leave_balancesAvgAggregateOutputType | null
    _sum: Leave_balancesSumAggregateOutputType | null
    _min: Leave_balancesMinAggregateOutputType | null
    _max: Leave_balancesMaxAggregateOutputType | null
  }

  export type Leave_balancesAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    leave_type_id: number | null
    balance: number | null
  }

  export type Leave_balancesSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    leave_type_id: number | null
    balance: number | null
  }

  export type Leave_balancesMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    leave_type_id: number | null
    balance: number | null
    updated_at: Date | null
  }

  export type Leave_balancesMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    leave_type_id: number | null
    balance: number | null
    updated_at: Date | null
  }

  export type Leave_balancesCountAggregateOutputType = {
    id: number
    user_id: number
    leave_type_id: number
    balance: number
    updated_at: number
    _all: number
  }


  export type Leave_balancesAvgAggregateInputType = {
    id?: true
    user_id?: true
    leave_type_id?: true
    balance?: true
  }

  export type Leave_balancesSumAggregateInputType = {
    id?: true
    user_id?: true
    leave_type_id?: true
    balance?: true
  }

  export type Leave_balancesMinAggregateInputType = {
    id?: true
    user_id?: true
    leave_type_id?: true
    balance?: true
    updated_at?: true
  }

  export type Leave_balancesMaxAggregateInputType = {
    id?: true
    user_id?: true
    leave_type_id?: true
    balance?: true
    updated_at?: true
  }

  export type Leave_balancesCountAggregateInputType = {
    id?: true
    user_id?: true
    leave_type_id?: true
    balance?: true
    updated_at?: true
    _all?: true
  }

  export type Leave_balancesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which leave_balances to aggregate.
     */
    where?: leave_balancesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of leave_balances to fetch.
     */
    orderBy?: leave_balancesOrderByWithRelationInput | leave_balancesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: leave_balancesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` leave_balances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` leave_balances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned leave_balances
    **/
    _count?: true | Leave_balancesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Leave_balancesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Leave_balancesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Leave_balancesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Leave_balancesMaxAggregateInputType
  }

  export type GetLeave_balancesAggregateType<T extends Leave_balancesAggregateArgs> = {
        [P in keyof T & keyof AggregateLeave_balances]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeave_balances[P]>
      : GetScalarType<T[P], AggregateLeave_balances[P]>
  }




  export type leave_balancesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: leave_balancesWhereInput
    orderBy?: leave_balancesOrderByWithAggregationInput | leave_balancesOrderByWithAggregationInput[]
    by: Leave_balancesScalarFieldEnum[] | Leave_balancesScalarFieldEnum
    having?: leave_balancesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Leave_balancesCountAggregateInputType | true
    _avg?: Leave_balancesAvgAggregateInputType
    _sum?: Leave_balancesSumAggregateInputType
    _min?: Leave_balancesMinAggregateInputType
    _max?: Leave_balancesMaxAggregateInputType
  }

  export type Leave_balancesGroupByOutputType = {
    id: number
    user_id: number
    leave_type_id: number
    balance: number | null
    updated_at: Date | null
    _count: Leave_balancesCountAggregateOutputType | null
    _avg: Leave_balancesAvgAggregateOutputType | null
    _sum: Leave_balancesSumAggregateOutputType | null
    _min: Leave_balancesMinAggregateOutputType | null
    _max: Leave_balancesMaxAggregateOutputType | null
  }

  type GetLeave_balancesGroupByPayload<T extends leave_balancesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Leave_balancesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Leave_balancesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Leave_balancesGroupByOutputType[P]>
            : GetScalarType<T[P], Leave_balancesGroupByOutputType[P]>
        }
      >
    >


  export type leave_balancesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    leave_type_id?: boolean
    balance?: boolean
    updated_at?: boolean
    leave_types?: boolean | leave_typesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leave_balances"]>

  export type leave_balancesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    leave_type_id?: boolean
    balance?: boolean
    updated_at?: boolean
    leave_types?: boolean | leave_typesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leave_balances"]>

  export type leave_balancesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    leave_type_id?: boolean
    balance?: boolean
    updated_at?: boolean
    leave_types?: boolean | leave_typesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leave_balances"]>

  export type leave_balancesSelectScalar = {
    id?: boolean
    user_id?: boolean
    leave_type_id?: boolean
    balance?: boolean
    updated_at?: boolean
  }

  export type leave_balancesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "leave_type_id" | "balance" | "updated_at", ExtArgs["result"]["leave_balances"]>
  export type leave_balancesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leave_types?: boolean | leave_typesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type leave_balancesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leave_types?: boolean | leave_typesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type leave_balancesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leave_types?: boolean | leave_typesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $leave_balancesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "leave_balances"
    objects: {
      leave_types: Prisma.$leave_typesPayload<ExtArgs>
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      leave_type_id: number
      balance: number | null
      updated_at: Date | null
    }, ExtArgs["result"]["leave_balances"]>
    composites: {}
  }

  type leave_balancesGetPayload<S extends boolean | null | undefined | leave_balancesDefaultArgs> = $Result.GetResult<Prisma.$leave_balancesPayload, S>

  type leave_balancesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<leave_balancesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Leave_balancesCountAggregateInputType | true
    }

  export interface leave_balancesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['leave_balances'], meta: { name: 'leave_balances' } }
    /**
     * Find zero or one Leave_balances that matches the filter.
     * @param {leave_balancesFindUniqueArgs} args - Arguments to find a Leave_balances
     * @example
     * // Get one Leave_balances
     * const leave_balances = await prisma.leave_balances.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends leave_balancesFindUniqueArgs>(args: SelectSubset<T, leave_balancesFindUniqueArgs<ExtArgs>>): Prisma__leave_balancesClient<$Result.GetResult<Prisma.$leave_balancesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Leave_balances that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {leave_balancesFindUniqueOrThrowArgs} args - Arguments to find a Leave_balances
     * @example
     * // Get one Leave_balances
     * const leave_balances = await prisma.leave_balances.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends leave_balancesFindUniqueOrThrowArgs>(args: SelectSubset<T, leave_balancesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__leave_balancesClient<$Result.GetResult<Prisma.$leave_balancesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Leave_balances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_balancesFindFirstArgs} args - Arguments to find a Leave_balances
     * @example
     * // Get one Leave_balances
     * const leave_balances = await prisma.leave_balances.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends leave_balancesFindFirstArgs>(args?: SelectSubset<T, leave_balancesFindFirstArgs<ExtArgs>>): Prisma__leave_balancesClient<$Result.GetResult<Prisma.$leave_balancesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Leave_balances that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_balancesFindFirstOrThrowArgs} args - Arguments to find a Leave_balances
     * @example
     * // Get one Leave_balances
     * const leave_balances = await prisma.leave_balances.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends leave_balancesFindFirstOrThrowArgs>(args?: SelectSubset<T, leave_balancesFindFirstOrThrowArgs<ExtArgs>>): Prisma__leave_balancesClient<$Result.GetResult<Prisma.$leave_balancesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Leave_balances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_balancesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Leave_balances
     * const leave_balances = await prisma.leave_balances.findMany()
     * 
     * // Get first 10 Leave_balances
     * const leave_balances = await prisma.leave_balances.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leave_balancesWithIdOnly = await prisma.leave_balances.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends leave_balancesFindManyArgs>(args?: SelectSubset<T, leave_balancesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_balancesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Leave_balances.
     * @param {leave_balancesCreateArgs} args - Arguments to create a Leave_balances.
     * @example
     * // Create one Leave_balances
     * const Leave_balances = await prisma.leave_balances.create({
     *   data: {
     *     // ... data to create a Leave_balances
     *   }
     * })
     * 
     */
    create<T extends leave_balancesCreateArgs>(args: SelectSubset<T, leave_balancesCreateArgs<ExtArgs>>): Prisma__leave_balancesClient<$Result.GetResult<Prisma.$leave_balancesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Leave_balances.
     * @param {leave_balancesCreateManyArgs} args - Arguments to create many Leave_balances.
     * @example
     * // Create many Leave_balances
     * const leave_balances = await prisma.leave_balances.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends leave_balancesCreateManyArgs>(args?: SelectSubset<T, leave_balancesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Leave_balances and returns the data saved in the database.
     * @param {leave_balancesCreateManyAndReturnArgs} args - Arguments to create many Leave_balances.
     * @example
     * // Create many Leave_balances
     * const leave_balances = await prisma.leave_balances.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Leave_balances and only return the `id`
     * const leave_balancesWithIdOnly = await prisma.leave_balances.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends leave_balancesCreateManyAndReturnArgs>(args?: SelectSubset<T, leave_balancesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_balancesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Leave_balances.
     * @param {leave_balancesDeleteArgs} args - Arguments to delete one Leave_balances.
     * @example
     * // Delete one Leave_balances
     * const Leave_balances = await prisma.leave_balances.delete({
     *   where: {
     *     // ... filter to delete one Leave_balances
     *   }
     * })
     * 
     */
    delete<T extends leave_balancesDeleteArgs>(args: SelectSubset<T, leave_balancesDeleteArgs<ExtArgs>>): Prisma__leave_balancesClient<$Result.GetResult<Prisma.$leave_balancesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Leave_balances.
     * @param {leave_balancesUpdateArgs} args - Arguments to update one Leave_balances.
     * @example
     * // Update one Leave_balances
     * const leave_balances = await prisma.leave_balances.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends leave_balancesUpdateArgs>(args: SelectSubset<T, leave_balancesUpdateArgs<ExtArgs>>): Prisma__leave_balancesClient<$Result.GetResult<Prisma.$leave_balancesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Leave_balances.
     * @param {leave_balancesDeleteManyArgs} args - Arguments to filter Leave_balances to delete.
     * @example
     * // Delete a few Leave_balances
     * const { count } = await prisma.leave_balances.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends leave_balancesDeleteManyArgs>(args?: SelectSubset<T, leave_balancesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leave_balances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_balancesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Leave_balances
     * const leave_balances = await prisma.leave_balances.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends leave_balancesUpdateManyArgs>(args: SelectSubset<T, leave_balancesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leave_balances and returns the data updated in the database.
     * @param {leave_balancesUpdateManyAndReturnArgs} args - Arguments to update many Leave_balances.
     * @example
     * // Update many Leave_balances
     * const leave_balances = await prisma.leave_balances.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Leave_balances and only return the `id`
     * const leave_balancesWithIdOnly = await prisma.leave_balances.updateManyAndReturn({
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
    updateManyAndReturn<T extends leave_balancesUpdateManyAndReturnArgs>(args: SelectSubset<T, leave_balancesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_balancesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Leave_balances.
     * @param {leave_balancesUpsertArgs} args - Arguments to update or create a Leave_balances.
     * @example
     * // Update or create a Leave_balances
     * const leave_balances = await prisma.leave_balances.upsert({
     *   create: {
     *     // ... data to create a Leave_balances
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Leave_balances we want to update
     *   }
     * })
     */
    upsert<T extends leave_balancesUpsertArgs>(args: SelectSubset<T, leave_balancesUpsertArgs<ExtArgs>>): Prisma__leave_balancesClient<$Result.GetResult<Prisma.$leave_balancesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Leave_balances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_balancesCountArgs} args - Arguments to filter Leave_balances to count.
     * @example
     * // Count the number of Leave_balances
     * const count = await prisma.leave_balances.count({
     *   where: {
     *     // ... the filter for the Leave_balances we want to count
     *   }
     * })
    **/
    count<T extends leave_balancesCountArgs>(
      args?: Subset<T, leave_balancesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Leave_balancesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Leave_balances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Leave_balancesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Leave_balancesAggregateArgs>(args: Subset<T, Leave_balancesAggregateArgs>): Prisma.PrismaPromise<GetLeave_balancesAggregateType<T>>

    /**
     * Group by Leave_balances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_balancesGroupByArgs} args - Group by arguments.
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
      T extends leave_balancesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: leave_balancesGroupByArgs['orderBy'] }
        : { orderBy?: leave_balancesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, leave_balancesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeave_balancesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the leave_balances model
   */
  readonly fields: leave_balancesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for leave_balances.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__leave_balancesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    leave_types<T extends leave_typesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, leave_typesDefaultArgs<ExtArgs>>): Prisma__leave_typesClient<$Result.GetResult<Prisma.$leave_typesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the leave_balances model
   */
  interface leave_balancesFieldRefs {
    readonly id: FieldRef<"leave_balances", 'Int'>
    readonly user_id: FieldRef<"leave_balances", 'Int'>
    readonly leave_type_id: FieldRef<"leave_balances", 'Int'>
    readonly balance: FieldRef<"leave_balances", 'Int'>
    readonly updated_at: FieldRef<"leave_balances", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * leave_balances findUnique
   */
  export type leave_balancesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesInclude<ExtArgs> | null
    /**
     * Filter, which leave_balances to fetch.
     */
    where: leave_balancesWhereUniqueInput
  }

  /**
   * leave_balances findUniqueOrThrow
   */
  export type leave_balancesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesInclude<ExtArgs> | null
    /**
     * Filter, which leave_balances to fetch.
     */
    where: leave_balancesWhereUniqueInput
  }

  /**
   * leave_balances findFirst
   */
  export type leave_balancesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesInclude<ExtArgs> | null
    /**
     * Filter, which leave_balances to fetch.
     */
    where?: leave_balancesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of leave_balances to fetch.
     */
    orderBy?: leave_balancesOrderByWithRelationInput | leave_balancesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for leave_balances.
     */
    cursor?: leave_balancesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` leave_balances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` leave_balances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of leave_balances.
     */
    distinct?: Leave_balancesScalarFieldEnum | Leave_balancesScalarFieldEnum[]
  }

  /**
   * leave_balances findFirstOrThrow
   */
  export type leave_balancesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesInclude<ExtArgs> | null
    /**
     * Filter, which leave_balances to fetch.
     */
    where?: leave_balancesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of leave_balances to fetch.
     */
    orderBy?: leave_balancesOrderByWithRelationInput | leave_balancesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for leave_balances.
     */
    cursor?: leave_balancesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` leave_balances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` leave_balances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of leave_balances.
     */
    distinct?: Leave_balancesScalarFieldEnum | Leave_balancesScalarFieldEnum[]
  }

  /**
   * leave_balances findMany
   */
  export type leave_balancesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesInclude<ExtArgs> | null
    /**
     * Filter, which leave_balances to fetch.
     */
    where?: leave_balancesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of leave_balances to fetch.
     */
    orderBy?: leave_balancesOrderByWithRelationInput | leave_balancesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing leave_balances.
     */
    cursor?: leave_balancesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` leave_balances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` leave_balances.
     */
    skip?: number
    distinct?: Leave_balancesScalarFieldEnum | Leave_balancesScalarFieldEnum[]
  }

  /**
   * leave_balances create
   */
  export type leave_balancesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesInclude<ExtArgs> | null
    /**
     * The data needed to create a leave_balances.
     */
    data: XOR<leave_balancesCreateInput, leave_balancesUncheckedCreateInput>
  }

  /**
   * leave_balances createMany
   */
  export type leave_balancesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many leave_balances.
     */
    data: leave_balancesCreateManyInput | leave_balancesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * leave_balances createManyAndReturn
   */
  export type leave_balancesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * The data used to create many leave_balances.
     */
    data: leave_balancesCreateManyInput | leave_balancesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * leave_balances update
   */
  export type leave_balancesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesInclude<ExtArgs> | null
    /**
     * The data needed to update a leave_balances.
     */
    data: XOR<leave_balancesUpdateInput, leave_balancesUncheckedUpdateInput>
    /**
     * Choose, which leave_balances to update.
     */
    where: leave_balancesWhereUniqueInput
  }

  /**
   * leave_balances updateMany
   */
  export type leave_balancesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update leave_balances.
     */
    data: XOR<leave_balancesUpdateManyMutationInput, leave_balancesUncheckedUpdateManyInput>
    /**
     * Filter which leave_balances to update
     */
    where?: leave_balancesWhereInput
    /**
     * Limit how many leave_balances to update.
     */
    limit?: number
  }

  /**
   * leave_balances updateManyAndReturn
   */
  export type leave_balancesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * The data used to update leave_balances.
     */
    data: XOR<leave_balancesUpdateManyMutationInput, leave_balancesUncheckedUpdateManyInput>
    /**
     * Filter which leave_balances to update
     */
    where?: leave_balancesWhereInput
    /**
     * Limit how many leave_balances to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * leave_balances upsert
   */
  export type leave_balancesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesInclude<ExtArgs> | null
    /**
     * The filter to search for the leave_balances to update in case it exists.
     */
    where: leave_balancesWhereUniqueInput
    /**
     * In case the leave_balances found by the `where` argument doesn't exist, create a new leave_balances with this data.
     */
    create: XOR<leave_balancesCreateInput, leave_balancesUncheckedCreateInput>
    /**
     * In case the leave_balances was found with the provided `where` argument, update it with this data.
     */
    update: XOR<leave_balancesUpdateInput, leave_balancesUncheckedUpdateInput>
  }

  /**
   * leave_balances delete
   */
  export type leave_balancesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesInclude<ExtArgs> | null
    /**
     * Filter which leave_balances to delete.
     */
    where: leave_balancesWhereUniqueInput
  }

  /**
   * leave_balances deleteMany
   */
  export type leave_balancesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which leave_balances to delete
     */
    where?: leave_balancesWhereInput
    /**
     * Limit how many leave_balances to delete.
     */
    limit?: number
  }

  /**
   * leave_balances without action
   */
  export type leave_balancesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesInclude<ExtArgs> | null
  }


  /**
   * Model leave_requests
   */

  export type AggregateLeave_requests = {
    _count: Leave_requestsCountAggregateOutputType | null
    _avg: Leave_requestsAvgAggregateOutputType | null
    _sum: Leave_requestsSumAggregateOutputType | null
    _min: Leave_requestsMinAggregateOutputType | null
    _max: Leave_requestsMaxAggregateOutputType | null
  }

  export type Leave_requestsAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    leave_type_id: number | null
  }

  export type Leave_requestsSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    leave_type_id: number | null
  }

  export type Leave_requestsMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    leave_type_id: number | null
    start_date: Date | null
    end_date: Date | null
    status: $Enums.LeaveStatus | null
    reason: string | null
    created_at: Date | null
  }

  export type Leave_requestsMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    leave_type_id: number | null
    start_date: Date | null
    end_date: Date | null
    status: $Enums.LeaveStatus | null
    reason: string | null
    created_at: Date | null
  }

  export type Leave_requestsCountAggregateOutputType = {
    id: number
    user_id: number
    leave_type_id: number
    start_date: number
    end_date: number
    status: number
    reason: number
    created_at: number
    _all: number
  }


  export type Leave_requestsAvgAggregateInputType = {
    id?: true
    user_id?: true
    leave_type_id?: true
  }

  export type Leave_requestsSumAggregateInputType = {
    id?: true
    user_id?: true
    leave_type_id?: true
  }

  export type Leave_requestsMinAggregateInputType = {
    id?: true
    user_id?: true
    leave_type_id?: true
    start_date?: true
    end_date?: true
    status?: true
    reason?: true
    created_at?: true
  }

  export type Leave_requestsMaxAggregateInputType = {
    id?: true
    user_id?: true
    leave_type_id?: true
    start_date?: true
    end_date?: true
    status?: true
    reason?: true
    created_at?: true
  }

  export type Leave_requestsCountAggregateInputType = {
    id?: true
    user_id?: true
    leave_type_id?: true
    start_date?: true
    end_date?: true
    status?: true
    reason?: true
    created_at?: true
    _all?: true
  }

  export type Leave_requestsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which leave_requests to aggregate.
     */
    where?: leave_requestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of leave_requests to fetch.
     */
    orderBy?: leave_requestsOrderByWithRelationInput | leave_requestsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: leave_requestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` leave_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` leave_requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned leave_requests
    **/
    _count?: true | Leave_requestsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Leave_requestsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Leave_requestsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Leave_requestsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Leave_requestsMaxAggregateInputType
  }

  export type GetLeave_requestsAggregateType<T extends Leave_requestsAggregateArgs> = {
        [P in keyof T & keyof AggregateLeave_requests]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeave_requests[P]>
      : GetScalarType<T[P], AggregateLeave_requests[P]>
  }




  export type leave_requestsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: leave_requestsWhereInput
    orderBy?: leave_requestsOrderByWithAggregationInput | leave_requestsOrderByWithAggregationInput[]
    by: Leave_requestsScalarFieldEnum[] | Leave_requestsScalarFieldEnum
    having?: leave_requestsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Leave_requestsCountAggregateInputType | true
    _avg?: Leave_requestsAvgAggregateInputType
    _sum?: Leave_requestsSumAggregateInputType
    _min?: Leave_requestsMinAggregateInputType
    _max?: Leave_requestsMaxAggregateInputType
  }

  export type Leave_requestsGroupByOutputType = {
    id: number
    user_id: number
    leave_type_id: number
    start_date: Date
    end_date: Date
    status: $Enums.LeaveStatus
    reason: string | null
    created_at: Date | null
    _count: Leave_requestsCountAggregateOutputType | null
    _avg: Leave_requestsAvgAggregateOutputType | null
    _sum: Leave_requestsSumAggregateOutputType | null
    _min: Leave_requestsMinAggregateOutputType | null
    _max: Leave_requestsMaxAggregateOutputType | null
  }

  type GetLeave_requestsGroupByPayload<T extends leave_requestsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Leave_requestsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Leave_requestsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Leave_requestsGroupByOutputType[P]>
            : GetScalarType<T[P], Leave_requestsGroupByOutputType[P]>
        }
      >
    >


  export type leave_requestsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    leave_type_id?: boolean
    start_date?: boolean
    end_date?: boolean
    status?: boolean
    reason?: boolean
    created_at?: boolean
    leave_types?: boolean | leave_typesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leave_requests"]>

  export type leave_requestsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    leave_type_id?: boolean
    start_date?: boolean
    end_date?: boolean
    status?: boolean
    reason?: boolean
    created_at?: boolean
    leave_types?: boolean | leave_typesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leave_requests"]>

  export type leave_requestsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    leave_type_id?: boolean
    start_date?: boolean
    end_date?: boolean
    status?: boolean
    reason?: boolean
    created_at?: boolean
    leave_types?: boolean | leave_typesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leave_requests"]>

  export type leave_requestsSelectScalar = {
    id?: boolean
    user_id?: boolean
    leave_type_id?: boolean
    start_date?: boolean
    end_date?: boolean
    status?: boolean
    reason?: boolean
    created_at?: boolean
  }

  export type leave_requestsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "leave_type_id" | "start_date" | "end_date" | "status" | "reason" | "created_at", ExtArgs["result"]["leave_requests"]>
  export type leave_requestsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leave_types?: boolean | leave_typesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type leave_requestsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leave_types?: boolean | leave_typesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type leave_requestsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leave_types?: boolean | leave_typesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $leave_requestsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "leave_requests"
    objects: {
      leave_types: Prisma.$leave_typesPayload<ExtArgs>
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      leave_type_id: number
      start_date: Date
      end_date: Date
      status: $Enums.LeaveStatus
      reason: string | null
      created_at: Date | null
    }, ExtArgs["result"]["leave_requests"]>
    composites: {}
  }

  type leave_requestsGetPayload<S extends boolean | null | undefined | leave_requestsDefaultArgs> = $Result.GetResult<Prisma.$leave_requestsPayload, S>

  type leave_requestsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<leave_requestsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Leave_requestsCountAggregateInputType | true
    }

  export interface leave_requestsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['leave_requests'], meta: { name: 'leave_requests' } }
    /**
     * Find zero or one Leave_requests that matches the filter.
     * @param {leave_requestsFindUniqueArgs} args - Arguments to find a Leave_requests
     * @example
     * // Get one Leave_requests
     * const leave_requests = await prisma.leave_requests.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends leave_requestsFindUniqueArgs>(args: SelectSubset<T, leave_requestsFindUniqueArgs<ExtArgs>>): Prisma__leave_requestsClient<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Leave_requests that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {leave_requestsFindUniqueOrThrowArgs} args - Arguments to find a Leave_requests
     * @example
     * // Get one Leave_requests
     * const leave_requests = await prisma.leave_requests.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends leave_requestsFindUniqueOrThrowArgs>(args: SelectSubset<T, leave_requestsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__leave_requestsClient<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Leave_requests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_requestsFindFirstArgs} args - Arguments to find a Leave_requests
     * @example
     * // Get one Leave_requests
     * const leave_requests = await prisma.leave_requests.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends leave_requestsFindFirstArgs>(args?: SelectSubset<T, leave_requestsFindFirstArgs<ExtArgs>>): Prisma__leave_requestsClient<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Leave_requests that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_requestsFindFirstOrThrowArgs} args - Arguments to find a Leave_requests
     * @example
     * // Get one Leave_requests
     * const leave_requests = await prisma.leave_requests.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends leave_requestsFindFirstOrThrowArgs>(args?: SelectSubset<T, leave_requestsFindFirstOrThrowArgs<ExtArgs>>): Prisma__leave_requestsClient<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Leave_requests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_requestsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Leave_requests
     * const leave_requests = await prisma.leave_requests.findMany()
     * 
     * // Get first 10 Leave_requests
     * const leave_requests = await prisma.leave_requests.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leave_requestsWithIdOnly = await prisma.leave_requests.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends leave_requestsFindManyArgs>(args?: SelectSubset<T, leave_requestsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Leave_requests.
     * @param {leave_requestsCreateArgs} args - Arguments to create a Leave_requests.
     * @example
     * // Create one Leave_requests
     * const Leave_requests = await prisma.leave_requests.create({
     *   data: {
     *     // ... data to create a Leave_requests
     *   }
     * })
     * 
     */
    create<T extends leave_requestsCreateArgs>(args: SelectSubset<T, leave_requestsCreateArgs<ExtArgs>>): Prisma__leave_requestsClient<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Leave_requests.
     * @param {leave_requestsCreateManyArgs} args - Arguments to create many Leave_requests.
     * @example
     * // Create many Leave_requests
     * const leave_requests = await prisma.leave_requests.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends leave_requestsCreateManyArgs>(args?: SelectSubset<T, leave_requestsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Leave_requests and returns the data saved in the database.
     * @param {leave_requestsCreateManyAndReturnArgs} args - Arguments to create many Leave_requests.
     * @example
     * // Create many Leave_requests
     * const leave_requests = await prisma.leave_requests.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Leave_requests and only return the `id`
     * const leave_requestsWithIdOnly = await prisma.leave_requests.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends leave_requestsCreateManyAndReturnArgs>(args?: SelectSubset<T, leave_requestsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Leave_requests.
     * @param {leave_requestsDeleteArgs} args - Arguments to delete one Leave_requests.
     * @example
     * // Delete one Leave_requests
     * const Leave_requests = await prisma.leave_requests.delete({
     *   where: {
     *     // ... filter to delete one Leave_requests
     *   }
     * })
     * 
     */
    delete<T extends leave_requestsDeleteArgs>(args: SelectSubset<T, leave_requestsDeleteArgs<ExtArgs>>): Prisma__leave_requestsClient<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Leave_requests.
     * @param {leave_requestsUpdateArgs} args - Arguments to update one Leave_requests.
     * @example
     * // Update one Leave_requests
     * const leave_requests = await prisma.leave_requests.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends leave_requestsUpdateArgs>(args: SelectSubset<T, leave_requestsUpdateArgs<ExtArgs>>): Prisma__leave_requestsClient<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Leave_requests.
     * @param {leave_requestsDeleteManyArgs} args - Arguments to filter Leave_requests to delete.
     * @example
     * // Delete a few Leave_requests
     * const { count } = await prisma.leave_requests.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends leave_requestsDeleteManyArgs>(args?: SelectSubset<T, leave_requestsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leave_requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_requestsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Leave_requests
     * const leave_requests = await prisma.leave_requests.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends leave_requestsUpdateManyArgs>(args: SelectSubset<T, leave_requestsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leave_requests and returns the data updated in the database.
     * @param {leave_requestsUpdateManyAndReturnArgs} args - Arguments to update many Leave_requests.
     * @example
     * // Update many Leave_requests
     * const leave_requests = await prisma.leave_requests.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Leave_requests and only return the `id`
     * const leave_requestsWithIdOnly = await prisma.leave_requests.updateManyAndReturn({
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
    updateManyAndReturn<T extends leave_requestsUpdateManyAndReturnArgs>(args: SelectSubset<T, leave_requestsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Leave_requests.
     * @param {leave_requestsUpsertArgs} args - Arguments to update or create a Leave_requests.
     * @example
     * // Update or create a Leave_requests
     * const leave_requests = await prisma.leave_requests.upsert({
     *   create: {
     *     // ... data to create a Leave_requests
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Leave_requests we want to update
     *   }
     * })
     */
    upsert<T extends leave_requestsUpsertArgs>(args: SelectSubset<T, leave_requestsUpsertArgs<ExtArgs>>): Prisma__leave_requestsClient<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Leave_requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_requestsCountArgs} args - Arguments to filter Leave_requests to count.
     * @example
     * // Count the number of Leave_requests
     * const count = await prisma.leave_requests.count({
     *   where: {
     *     // ... the filter for the Leave_requests we want to count
     *   }
     * })
    **/
    count<T extends leave_requestsCountArgs>(
      args?: Subset<T, leave_requestsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Leave_requestsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Leave_requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Leave_requestsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Leave_requestsAggregateArgs>(args: Subset<T, Leave_requestsAggregateArgs>): Prisma.PrismaPromise<GetLeave_requestsAggregateType<T>>

    /**
     * Group by Leave_requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_requestsGroupByArgs} args - Group by arguments.
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
      T extends leave_requestsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: leave_requestsGroupByArgs['orderBy'] }
        : { orderBy?: leave_requestsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, leave_requestsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeave_requestsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the leave_requests model
   */
  readonly fields: leave_requestsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for leave_requests.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__leave_requestsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    leave_types<T extends leave_typesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, leave_typesDefaultArgs<ExtArgs>>): Prisma__leave_typesClient<$Result.GetResult<Prisma.$leave_typesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the leave_requests model
   */
  interface leave_requestsFieldRefs {
    readonly id: FieldRef<"leave_requests", 'Int'>
    readonly user_id: FieldRef<"leave_requests", 'Int'>
    readonly leave_type_id: FieldRef<"leave_requests", 'Int'>
    readonly start_date: FieldRef<"leave_requests", 'DateTime'>
    readonly end_date: FieldRef<"leave_requests", 'DateTime'>
    readonly status: FieldRef<"leave_requests", 'LeaveStatus'>
    readonly reason: FieldRef<"leave_requests", 'String'>
    readonly created_at: FieldRef<"leave_requests", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * leave_requests findUnique
   */
  export type leave_requestsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsInclude<ExtArgs> | null
    /**
     * Filter, which leave_requests to fetch.
     */
    where: leave_requestsWhereUniqueInput
  }

  /**
   * leave_requests findUniqueOrThrow
   */
  export type leave_requestsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsInclude<ExtArgs> | null
    /**
     * Filter, which leave_requests to fetch.
     */
    where: leave_requestsWhereUniqueInput
  }

  /**
   * leave_requests findFirst
   */
  export type leave_requestsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsInclude<ExtArgs> | null
    /**
     * Filter, which leave_requests to fetch.
     */
    where?: leave_requestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of leave_requests to fetch.
     */
    orderBy?: leave_requestsOrderByWithRelationInput | leave_requestsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for leave_requests.
     */
    cursor?: leave_requestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` leave_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` leave_requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of leave_requests.
     */
    distinct?: Leave_requestsScalarFieldEnum | Leave_requestsScalarFieldEnum[]
  }

  /**
   * leave_requests findFirstOrThrow
   */
  export type leave_requestsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsInclude<ExtArgs> | null
    /**
     * Filter, which leave_requests to fetch.
     */
    where?: leave_requestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of leave_requests to fetch.
     */
    orderBy?: leave_requestsOrderByWithRelationInput | leave_requestsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for leave_requests.
     */
    cursor?: leave_requestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` leave_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` leave_requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of leave_requests.
     */
    distinct?: Leave_requestsScalarFieldEnum | Leave_requestsScalarFieldEnum[]
  }

  /**
   * leave_requests findMany
   */
  export type leave_requestsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsInclude<ExtArgs> | null
    /**
     * Filter, which leave_requests to fetch.
     */
    where?: leave_requestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of leave_requests to fetch.
     */
    orderBy?: leave_requestsOrderByWithRelationInput | leave_requestsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing leave_requests.
     */
    cursor?: leave_requestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` leave_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` leave_requests.
     */
    skip?: number
    distinct?: Leave_requestsScalarFieldEnum | Leave_requestsScalarFieldEnum[]
  }

  /**
   * leave_requests create
   */
  export type leave_requestsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsInclude<ExtArgs> | null
    /**
     * The data needed to create a leave_requests.
     */
    data: XOR<leave_requestsCreateInput, leave_requestsUncheckedCreateInput>
  }

  /**
   * leave_requests createMany
   */
  export type leave_requestsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many leave_requests.
     */
    data: leave_requestsCreateManyInput | leave_requestsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * leave_requests createManyAndReturn
   */
  export type leave_requestsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * The data used to create many leave_requests.
     */
    data: leave_requestsCreateManyInput | leave_requestsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * leave_requests update
   */
  export type leave_requestsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsInclude<ExtArgs> | null
    /**
     * The data needed to update a leave_requests.
     */
    data: XOR<leave_requestsUpdateInput, leave_requestsUncheckedUpdateInput>
    /**
     * Choose, which leave_requests to update.
     */
    where: leave_requestsWhereUniqueInput
  }

  /**
   * leave_requests updateMany
   */
  export type leave_requestsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update leave_requests.
     */
    data: XOR<leave_requestsUpdateManyMutationInput, leave_requestsUncheckedUpdateManyInput>
    /**
     * Filter which leave_requests to update
     */
    where?: leave_requestsWhereInput
    /**
     * Limit how many leave_requests to update.
     */
    limit?: number
  }

  /**
   * leave_requests updateManyAndReturn
   */
  export type leave_requestsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * The data used to update leave_requests.
     */
    data: XOR<leave_requestsUpdateManyMutationInput, leave_requestsUncheckedUpdateManyInput>
    /**
     * Filter which leave_requests to update
     */
    where?: leave_requestsWhereInput
    /**
     * Limit how many leave_requests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * leave_requests upsert
   */
  export type leave_requestsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsInclude<ExtArgs> | null
    /**
     * The filter to search for the leave_requests to update in case it exists.
     */
    where: leave_requestsWhereUniqueInput
    /**
     * In case the leave_requests found by the `where` argument doesn't exist, create a new leave_requests with this data.
     */
    create: XOR<leave_requestsCreateInput, leave_requestsUncheckedCreateInput>
    /**
     * In case the leave_requests was found with the provided `where` argument, update it with this data.
     */
    update: XOR<leave_requestsUpdateInput, leave_requestsUncheckedUpdateInput>
  }

  /**
   * leave_requests delete
   */
  export type leave_requestsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsInclude<ExtArgs> | null
    /**
     * Filter which leave_requests to delete.
     */
    where: leave_requestsWhereUniqueInput
  }

  /**
   * leave_requests deleteMany
   */
  export type leave_requestsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which leave_requests to delete
     */
    where?: leave_requestsWhereInput
    /**
     * Limit how many leave_requests to delete.
     */
    limit?: number
  }

  /**
   * leave_requests without action
   */
  export type leave_requestsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsInclude<ExtArgs> | null
  }


  /**
   * Model leave_types
   */

  export type AggregateLeave_types = {
    _count: Leave_typesCountAggregateOutputType | null
    _avg: Leave_typesAvgAggregateOutputType | null
    _sum: Leave_typesSumAggregateOutputType | null
    _min: Leave_typesMinAggregateOutputType | null
    _max: Leave_typesMaxAggregateOutputType | null
  }

  export type Leave_typesAvgAggregateOutputType = {
    id: number | null
  }

  export type Leave_typesSumAggregateOutputType = {
    id: number | null
  }

  export type Leave_typesMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    created_at: Date | null
  }

  export type Leave_typesMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    created_at: Date | null
  }

  export type Leave_typesCountAggregateOutputType = {
    id: number
    name: number
    description: number
    created_at: number
    _all: number
  }


  export type Leave_typesAvgAggregateInputType = {
    id?: true
  }

  export type Leave_typesSumAggregateInputType = {
    id?: true
  }

  export type Leave_typesMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    created_at?: true
  }

  export type Leave_typesMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    created_at?: true
  }

  export type Leave_typesCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    created_at?: true
    _all?: true
  }

  export type Leave_typesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which leave_types to aggregate.
     */
    where?: leave_typesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of leave_types to fetch.
     */
    orderBy?: leave_typesOrderByWithRelationInput | leave_typesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: leave_typesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` leave_types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` leave_types.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned leave_types
    **/
    _count?: true | Leave_typesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Leave_typesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Leave_typesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Leave_typesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Leave_typesMaxAggregateInputType
  }

  export type GetLeave_typesAggregateType<T extends Leave_typesAggregateArgs> = {
        [P in keyof T & keyof AggregateLeave_types]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeave_types[P]>
      : GetScalarType<T[P], AggregateLeave_types[P]>
  }




  export type leave_typesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: leave_typesWhereInput
    orderBy?: leave_typesOrderByWithAggregationInput | leave_typesOrderByWithAggregationInput[]
    by: Leave_typesScalarFieldEnum[] | Leave_typesScalarFieldEnum
    having?: leave_typesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Leave_typesCountAggregateInputType | true
    _avg?: Leave_typesAvgAggregateInputType
    _sum?: Leave_typesSumAggregateInputType
    _min?: Leave_typesMinAggregateInputType
    _max?: Leave_typesMaxAggregateInputType
  }

  export type Leave_typesGroupByOutputType = {
    id: number
    name: string
    description: string | null
    created_at: Date | null
    _count: Leave_typesCountAggregateOutputType | null
    _avg: Leave_typesAvgAggregateOutputType | null
    _sum: Leave_typesSumAggregateOutputType | null
    _min: Leave_typesMinAggregateOutputType | null
    _max: Leave_typesMaxAggregateOutputType | null
  }

  type GetLeave_typesGroupByPayload<T extends leave_typesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Leave_typesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Leave_typesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Leave_typesGroupByOutputType[P]>
            : GetScalarType<T[P], Leave_typesGroupByOutputType[P]>
        }
      >
    >


  export type leave_typesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    leave_balances?: boolean | leave_types$leave_balancesArgs<ExtArgs>
    leave_requests?: boolean | leave_types$leave_requestsArgs<ExtArgs>
    _count?: boolean | Leave_typesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leave_types"]>

  export type leave_typesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["leave_types"]>

  export type leave_typesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["leave_types"]>

  export type leave_typesSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
  }

  export type leave_typesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "created_at", ExtArgs["result"]["leave_types"]>
  export type leave_typesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leave_balances?: boolean | leave_types$leave_balancesArgs<ExtArgs>
    leave_requests?: boolean | leave_types$leave_requestsArgs<ExtArgs>
    _count?: boolean | Leave_typesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type leave_typesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type leave_typesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $leave_typesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "leave_types"
    objects: {
      leave_balances: Prisma.$leave_balancesPayload<ExtArgs>[]
      leave_requests: Prisma.$leave_requestsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      created_at: Date | null
    }, ExtArgs["result"]["leave_types"]>
    composites: {}
  }

  type leave_typesGetPayload<S extends boolean | null | undefined | leave_typesDefaultArgs> = $Result.GetResult<Prisma.$leave_typesPayload, S>

  type leave_typesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<leave_typesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Leave_typesCountAggregateInputType | true
    }

  export interface leave_typesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['leave_types'], meta: { name: 'leave_types' } }
    /**
     * Find zero or one Leave_types that matches the filter.
     * @param {leave_typesFindUniqueArgs} args - Arguments to find a Leave_types
     * @example
     * // Get one Leave_types
     * const leave_types = await prisma.leave_types.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends leave_typesFindUniqueArgs>(args: SelectSubset<T, leave_typesFindUniqueArgs<ExtArgs>>): Prisma__leave_typesClient<$Result.GetResult<Prisma.$leave_typesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Leave_types that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {leave_typesFindUniqueOrThrowArgs} args - Arguments to find a Leave_types
     * @example
     * // Get one Leave_types
     * const leave_types = await prisma.leave_types.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends leave_typesFindUniqueOrThrowArgs>(args: SelectSubset<T, leave_typesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__leave_typesClient<$Result.GetResult<Prisma.$leave_typesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Leave_types that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_typesFindFirstArgs} args - Arguments to find a Leave_types
     * @example
     * // Get one Leave_types
     * const leave_types = await prisma.leave_types.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends leave_typesFindFirstArgs>(args?: SelectSubset<T, leave_typesFindFirstArgs<ExtArgs>>): Prisma__leave_typesClient<$Result.GetResult<Prisma.$leave_typesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Leave_types that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_typesFindFirstOrThrowArgs} args - Arguments to find a Leave_types
     * @example
     * // Get one Leave_types
     * const leave_types = await prisma.leave_types.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends leave_typesFindFirstOrThrowArgs>(args?: SelectSubset<T, leave_typesFindFirstOrThrowArgs<ExtArgs>>): Prisma__leave_typesClient<$Result.GetResult<Prisma.$leave_typesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Leave_types that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_typesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Leave_types
     * const leave_types = await prisma.leave_types.findMany()
     * 
     * // Get first 10 Leave_types
     * const leave_types = await prisma.leave_types.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leave_typesWithIdOnly = await prisma.leave_types.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends leave_typesFindManyArgs>(args?: SelectSubset<T, leave_typesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_typesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Leave_types.
     * @param {leave_typesCreateArgs} args - Arguments to create a Leave_types.
     * @example
     * // Create one Leave_types
     * const Leave_types = await prisma.leave_types.create({
     *   data: {
     *     // ... data to create a Leave_types
     *   }
     * })
     * 
     */
    create<T extends leave_typesCreateArgs>(args: SelectSubset<T, leave_typesCreateArgs<ExtArgs>>): Prisma__leave_typesClient<$Result.GetResult<Prisma.$leave_typesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Leave_types.
     * @param {leave_typesCreateManyArgs} args - Arguments to create many Leave_types.
     * @example
     * // Create many Leave_types
     * const leave_types = await prisma.leave_types.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends leave_typesCreateManyArgs>(args?: SelectSubset<T, leave_typesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Leave_types and returns the data saved in the database.
     * @param {leave_typesCreateManyAndReturnArgs} args - Arguments to create many Leave_types.
     * @example
     * // Create many Leave_types
     * const leave_types = await prisma.leave_types.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Leave_types and only return the `id`
     * const leave_typesWithIdOnly = await prisma.leave_types.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends leave_typesCreateManyAndReturnArgs>(args?: SelectSubset<T, leave_typesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_typesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Leave_types.
     * @param {leave_typesDeleteArgs} args - Arguments to delete one Leave_types.
     * @example
     * // Delete one Leave_types
     * const Leave_types = await prisma.leave_types.delete({
     *   where: {
     *     // ... filter to delete one Leave_types
     *   }
     * })
     * 
     */
    delete<T extends leave_typesDeleteArgs>(args: SelectSubset<T, leave_typesDeleteArgs<ExtArgs>>): Prisma__leave_typesClient<$Result.GetResult<Prisma.$leave_typesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Leave_types.
     * @param {leave_typesUpdateArgs} args - Arguments to update one Leave_types.
     * @example
     * // Update one Leave_types
     * const leave_types = await prisma.leave_types.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends leave_typesUpdateArgs>(args: SelectSubset<T, leave_typesUpdateArgs<ExtArgs>>): Prisma__leave_typesClient<$Result.GetResult<Prisma.$leave_typesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Leave_types.
     * @param {leave_typesDeleteManyArgs} args - Arguments to filter Leave_types to delete.
     * @example
     * // Delete a few Leave_types
     * const { count } = await prisma.leave_types.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends leave_typesDeleteManyArgs>(args?: SelectSubset<T, leave_typesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leave_types.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_typesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Leave_types
     * const leave_types = await prisma.leave_types.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends leave_typesUpdateManyArgs>(args: SelectSubset<T, leave_typesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leave_types and returns the data updated in the database.
     * @param {leave_typesUpdateManyAndReturnArgs} args - Arguments to update many Leave_types.
     * @example
     * // Update many Leave_types
     * const leave_types = await prisma.leave_types.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Leave_types and only return the `id`
     * const leave_typesWithIdOnly = await prisma.leave_types.updateManyAndReturn({
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
    updateManyAndReturn<T extends leave_typesUpdateManyAndReturnArgs>(args: SelectSubset<T, leave_typesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_typesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Leave_types.
     * @param {leave_typesUpsertArgs} args - Arguments to update or create a Leave_types.
     * @example
     * // Update or create a Leave_types
     * const leave_types = await prisma.leave_types.upsert({
     *   create: {
     *     // ... data to create a Leave_types
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Leave_types we want to update
     *   }
     * })
     */
    upsert<T extends leave_typesUpsertArgs>(args: SelectSubset<T, leave_typesUpsertArgs<ExtArgs>>): Prisma__leave_typesClient<$Result.GetResult<Prisma.$leave_typesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Leave_types.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_typesCountArgs} args - Arguments to filter Leave_types to count.
     * @example
     * // Count the number of Leave_types
     * const count = await prisma.leave_types.count({
     *   where: {
     *     // ... the filter for the Leave_types we want to count
     *   }
     * })
    **/
    count<T extends leave_typesCountArgs>(
      args?: Subset<T, leave_typesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Leave_typesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Leave_types.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Leave_typesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Leave_typesAggregateArgs>(args: Subset<T, Leave_typesAggregateArgs>): Prisma.PrismaPromise<GetLeave_typesAggregateType<T>>

    /**
     * Group by Leave_types.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_typesGroupByArgs} args - Group by arguments.
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
      T extends leave_typesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: leave_typesGroupByArgs['orderBy'] }
        : { orderBy?: leave_typesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, leave_typesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeave_typesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the leave_types model
   */
  readonly fields: leave_typesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for leave_types.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__leave_typesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    leave_balances<T extends leave_types$leave_balancesArgs<ExtArgs> = {}>(args?: Subset<T, leave_types$leave_balancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_balancesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    leave_requests<T extends leave_types$leave_requestsArgs<ExtArgs> = {}>(args?: Subset<T, leave_types$leave_requestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the leave_types model
   */
  interface leave_typesFieldRefs {
    readonly id: FieldRef<"leave_types", 'Int'>
    readonly name: FieldRef<"leave_types", 'String'>
    readonly description: FieldRef<"leave_types", 'String'>
    readonly created_at: FieldRef<"leave_types", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * leave_types findUnique
   */
  export type leave_typesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_types
     */
    select?: leave_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_types
     */
    omit?: leave_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_typesInclude<ExtArgs> | null
    /**
     * Filter, which leave_types to fetch.
     */
    where: leave_typesWhereUniqueInput
  }

  /**
   * leave_types findUniqueOrThrow
   */
  export type leave_typesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_types
     */
    select?: leave_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_types
     */
    omit?: leave_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_typesInclude<ExtArgs> | null
    /**
     * Filter, which leave_types to fetch.
     */
    where: leave_typesWhereUniqueInput
  }

  /**
   * leave_types findFirst
   */
  export type leave_typesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_types
     */
    select?: leave_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_types
     */
    omit?: leave_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_typesInclude<ExtArgs> | null
    /**
     * Filter, which leave_types to fetch.
     */
    where?: leave_typesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of leave_types to fetch.
     */
    orderBy?: leave_typesOrderByWithRelationInput | leave_typesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for leave_types.
     */
    cursor?: leave_typesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` leave_types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` leave_types.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of leave_types.
     */
    distinct?: Leave_typesScalarFieldEnum | Leave_typesScalarFieldEnum[]
  }

  /**
   * leave_types findFirstOrThrow
   */
  export type leave_typesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_types
     */
    select?: leave_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_types
     */
    omit?: leave_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_typesInclude<ExtArgs> | null
    /**
     * Filter, which leave_types to fetch.
     */
    where?: leave_typesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of leave_types to fetch.
     */
    orderBy?: leave_typesOrderByWithRelationInput | leave_typesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for leave_types.
     */
    cursor?: leave_typesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` leave_types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` leave_types.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of leave_types.
     */
    distinct?: Leave_typesScalarFieldEnum | Leave_typesScalarFieldEnum[]
  }

  /**
   * leave_types findMany
   */
  export type leave_typesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_types
     */
    select?: leave_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_types
     */
    omit?: leave_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_typesInclude<ExtArgs> | null
    /**
     * Filter, which leave_types to fetch.
     */
    where?: leave_typesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of leave_types to fetch.
     */
    orderBy?: leave_typesOrderByWithRelationInput | leave_typesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing leave_types.
     */
    cursor?: leave_typesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` leave_types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` leave_types.
     */
    skip?: number
    distinct?: Leave_typesScalarFieldEnum | Leave_typesScalarFieldEnum[]
  }

  /**
   * leave_types create
   */
  export type leave_typesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_types
     */
    select?: leave_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_types
     */
    omit?: leave_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_typesInclude<ExtArgs> | null
    /**
     * The data needed to create a leave_types.
     */
    data: XOR<leave_typesCreateInput, leave_typesUncheckedCreateInput>
  }

  /**
   * leave_types createMany
   */
  export type leave_typesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many leave_types.
     */
    data: leave_typesCreateManyInput | leave_typesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * leave_types createManyAndReturn
   */
  export type leave_typesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_types
     */
    select?: leave_typesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the leave_types
     */
    omit?: leave_typesOmit<ExtArgs> | null
    /**
     * The data used to create many leave_types.
     */
    data: leave_typesCreateManyInput | leave_typesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * leave_types update
   */
  export type leave_typesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_types
     */
    select?: leave_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_types
     */
    omit?: leave_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_typesInclude<ExtArgs> | null
    /**
     * The data needed to update a leave_types.
     */
    data: XOR<leave_typesUpdateInput, leave_typesUncheckedUpdateInput>
    /**
     * Choose, which leave_types to update.
     */
    where: leave_typesWhereUniqueInput
  }

  /**
   * leave_types updateMany
   */
  export type leave_typesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update leave_types.
     */
    data: XOR<leave_typesUpdateManyMutationInput, leave_typesUncheckedUpdateManyInput>
    /**
     * Filter which leave_types to update
     */
    where?: leave_typesWhereInput
    /**
     * Limit how many leave_types to update.
     */
    limit?: number
  }

  /**
   * leave_types updateManyAndReturn
   */
  export type leave_typesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_types
     */
    select?: leave_typesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the leave_types
     */
    omit?: leave_typesOmit<ExtArgs> | null
    /**
     * The data used to update leave_types.
     */
    data: XOR<leave_typesUpdateManyMutationInput, leave_typesUncheckedUpdateManyInput>
    /**
     * Filter which leave_types to update
     */
    where?: leave_typesWhereInput
    /**
     * Limit how many leave_types to update.
     */
    limit?: number
  }

  /**
   * leave_types upsert
   */
  export type leave_typesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_types
     */
    select?: leave_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_types
     */
    omit?: leave_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_typesInclude<ExtArgs> | null
    /**
     * The filter to search for the leave_types to update in case it exists.
     */
    where: leave_typesWhereUniqueInput
    /**
     * In case the leave_types found by the `where` argument doesn't exist, create a new leave_types with this data.
     */
    create: XOR<leave_typesCreateInput, leave_typesUncheckedCreateInput>
    /**
     * In case the leave_types was found with the provided `where` argument, update it with this data.
     */
    update: XOR<leave_typesUpdateInput, leave_typesUncheckedUpdateInput>
  }

  /**
   * leave_types delete
   */
  export type leave_typesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_types
     */
    select?: leave_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_types
     */
    omit?: leave_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_typesInclude<ExtArgs> | null
    /**
     * Filter which leave_types to delete.
     */
    where: leave_typesWhereUniqueInput
  }

  /**
   * leave_types deleteMany
   */
  export type leave_typesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which leave_types to delete
     */
    where?: leave_typesWhereInput
    /**
     * Limit how many leave_types to delete.
     */
    limit?: number
  }

  /**
   * leave_types.leave_balances
   */
  export type leave_types$leave_balancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesInclude<ExtArgs> | null
    where?: leave_balancesWhereInput
    orderBy?: leave_balancesOrderByWithRelationInput | leave_balancesOrderByWithRelationInput[]
    cursor?: leave_balancesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Leave_balancesScalarFieldEnum | Leave_balancesScalarFieldEnum[]
  }

  /**
   * leave_types.leave_requests
   */
  export type leave_types$leave_requestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsInclude<ExtArgs> | null
    where?: leave_requestsWhereInput
    orderBy?: leave_requestsOrderByWithRelationInput | leave_requestsOrderByWithRelationInput[]
    cursor?: leave_requestsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Leave_requestsScalarFieldEnum | Leave_requestsScalarFieldEnum[]
  }

  /**
   * leave_types without action
   */
  export type leave_typesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_types
     */
    select?: leave_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_types
     */
    omit?: leave_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_typesInclude<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    id: number | null
  }

  export type UsersSumAggregateOutputType = {
    id: number | null
  }

  export type UsersMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password_hash: string | null
    role: $Enums.Role | null
    created_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password_hash: string | null
    role: $Enums.Role | null
    created_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password_hash: number
    role: number
    created_at: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    id?: true
  }

  export type UsersSumAggregateInputType = {
    id?: true
  }

  export type UsersMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password_hash?: true
    role?: true
    created_at?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password_hash?: true
    role?: true
    created_at?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password_hash?: true
    role?: true
    created_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: number
    name: string
    email: string
    password_hash: string
    role: $Enums.Role | null
    created_at: Date | null
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password_hash?: boolean
    role?: boolean
    created_at?: boolean
    leave_balances?: boolean | users$leave_balancesArgs<ExtArgs>
    leave_requests?: boolean | users$leave_requestsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password_hash?: boolean
    role?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password_hash?: boolean
    role?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password_hash?: boolean
    role?: boolean
    created_at?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password_hash" | "role" | "created_at", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leave_balances?: boolean | users$leave_balancesArgs<ExtArgs>
    leave_requests?: boolean | users$leave_requestsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      leave_balances: Prisma.$leave_balancesPayload<ExtArgs>[]
      leave_requests: Prisma.$leave_requestsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      password_hash: string
      role: $Enums.Role | null
      created_at: Date | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
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
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
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
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    leave_balances<T extends users$leave_balancesArgs<ExtArgs> = {}>(args?: Subset<T, users$leave_balancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_balancesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    leave_requests<T extends users$leave_requestsArgs<ExtArgs> = {}>(args?: Subset<T, users$leave_requestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'Int'>
    readonly name: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly password_hash: FieldRef<"users", 'String'>
    readonly role: FieldRef<"users", 'Role'>
    readonly created_at: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.leave_balances
   */
  export type users$leave_balancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesInclude<ExtArgs> | null
    where?: leave_balancesWhereInput
    orderBy?: leave_balancesOrderByWithRelationInput | leave_balancesOrderByWithRelationInput[]
    cursor?: leave_balancesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Leave_balancesScalarFieldEnum | Leave_balancesScalarFieldEnum[]
  }

  /**
   * users.leave_requests
   */
  export type users$leave_requestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsInclude<ExtArgs> | null
    where?: leave_requestsWhereInput
    orderBy?: leave_requestsOrderByWithRelationInput | leave_requestsOrderByWithRelationInput[]
    cursor?: leave_requestsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Leave_requestsScalarFieldEnum | Leave_requestsScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
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


  export const Leave_balancesScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    leave_type_id: 'leave_type_id',
    balance: 'balance',
    updated_at: 'updated_at'
  };

  export type Leave_balancesScalarFieldEnum = (typeof Leave_balancesScalarFieldEnum)[keyof typeof Leave_balancesScalarFieldEnum]


  export const Leave_requestsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    leave_type_id: 'leave_type_id',
    start_date: 'start_date',
    end_date: 'end_date',
    status: 'status',
    reason: 'reason',
    created_at: 'created_at'
  };

  export type Leave_requestsScalarFieldEnum = (typeof Leave_requestsScalarFieldEnum)[keyof typeof Leave_requestsScalarFieldEnum]


  export const Leave_typesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    created_at: 'created_at'
  };

  export type Leave_typesScalarFieldEnum = (typeof Leave_typesScalarFieldEnum)[keyof typeof Leave_typesScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password_hash: 'password_hash',
    role: 'role',
    created_at: 'created_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'LeaveStatus'
   */
  export type EnumLeaveStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeaveStatus'>
    


  /**
   * Reference to a field of type 'LeaveStatus[]'
   */
  export type ListEnumLeaveStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeaveStatus[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


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


  export type leave_balancesWhereInput = {
    AND?: leave_balancesWhereInput | leave_balancesWhereInput[]
    OR?: leave_balancesWhereInput[]
    NOT?: leave_balancesWhereInput | leave_balancesWhereInput[]
    id?: IntFilter<"leave_balances"> | number
    user_id?: IntFilter<"leave_balances"> | number
    leave_type_id?: IntFilter<"leave_balances"> | number
    balance?: IntNullableFilter<"leave_balances"> | number | null
    updated_at?: DateTimeNullableFilter<"leave_balances"> | Date | string | null
    leave_types?: XOR<Leave_typesScalarRelationFilter, leave_typesWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type leave_balancesOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    leave_type_id?: SortOrder
    balance?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    leave_types?: leave_typesOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
  }

  export type leave_balancesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: leave_balancesWhereInput | leave_balancesWhereInput[]
    OR?: leave_balancesWhereInput[]
    NOT?: leave_balancesWhereInput | leave_balancesWhereInput[]
    user_id?: IntFilter<"leave_balances"> | number
    leave_type_id?: IntFilter<"leave_balances"> | number
    balance?: IntNullableFilter<"leave_balances"> | number | null
    updated_at?: DateTimeNullableFilter<"leave_balances"> | Date | string | null
    leave_types?: XOR<Leave_typesScalarRelationFilter, leave_typesWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type leave_balancesOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    leave_type_id?: SortOrder
    balance?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: leave_balancesCountOrderByAggregateInput
    _avg?: leave_balancesAvgOrderByAggregateInput
    _max?: leave_balancesMaxOrderByAggregateInput
    _min?: leave_balancesMinOrderByAggregateInput
    _sum?: leave_balancesSumOrderByAggregateInput
  }

  export type leave_balancesScalarWhereWithAggregatesInput = {
    AND?: leave_balancesScalarWhereWithAggregatesInput | leave_balancesScalarWhereWithAggregatesInput[]
    OR?: leave_balancesScalarWhereWithAggregatesInput[]
    NOT?: leave_balancesScalarWhereWithAggregatesInput | leave_balancesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"leave_balances"> | number
    user_id?: IntWithAggregatesFilter<"leave_balances"> | number
    leave_type_id?: IntWithAggregatesFilter<"leave_balances"> | number
    balance?: IntNullableWithAggregatesFilter<"leave_balances"> | number | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"leave_balances"> | Date | string | null
  }

  export type leave_requestsWhereInput = {
    AND?: leave_requestsWhereInput | leave_requestsWhereInput[]
    OR?: leave_requestsWhereInput[]
    NOT?: leave_requestsWhereInput | leave_requestsWhereInput[]
    id?: IntFilter<"leave_requests"> | number
    user_id?: IntFilter<"leave_requests"> | number
    leave_type_id?: IntFilter<"leave_requests"> | number
    start_date?: DateTimeFilter<"leave_requests"> | Date | string
    end_date?: DateTimeFilter<"leave_requests"> | Date | string
    status?: EnumLeaveStatusFilter<"leave_requests"> | $Enums.LeaveStatus
    reason?: StringNullableFilter<"leave_requests"> | string | null
    created_at?: DateTimeNullableFilter<"leave_requests"> | Date | string | null
    leave_types?: XOR<Leave_typesScalarRelationFilter, leave_typesWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type leave_requestsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    leave_type_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    status?: SortOrder
    reason?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    leave_types?: leave_typesOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
  }

  export type leave_requestsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: leave_requestsWhereInput | leave_requestsWhereInput[]
    OR?: leave_requestsWhereInput[]
    NOT?: leave_requestsWhereInput | leave_requestsWhereInput[]
    user_id?: IntFilter<"leave_requests"> | number
    leave_type_id?: IntFilter<"leave_requests"> | number
    start_date?: DateTimeFilter<"leave_requests"> | Date | string
    end_date?: DateTimeFilter<"leave_requests"> | Date | string
    status?: EnumLeaveStatusFilter<"leave_requests"> | $Enums.LeaveStatus
    reason?: StringNullableFilter<"leave_requests"> | string | null
    created_at?: DateTimeNullableFilter<"leave_requests"> | Date | string | null
    leave_types?: XOR<Leave_typesScalarRelationFilter, leave_typesWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type leave_requestsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    leave_type_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    status?: SortOrder
    reason?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: leave_requestsCountOrderByAggregateInput
    _avg?: leave_requestsAvgOrderByAggregateInput
    _max?: leave_requestsMaxOrderByAggregateInput
    _min?: leave_requestsMinOrderByAggregateInput
    _sum?: leave_requestsSumOrderByAggregateInput
  }

  export type leave_requestsScalarWhereWithAggregatesInput = {
    AND?: leave_requestsScalarWhereWithAggregatesInput | leave_requestsScalarWhereWithAggregatesInput[]
    OR?: leave_requestsScalarWhereWithAggregatesInput[]
    NOT?: leave_requestsScalarWhereWithAggregatesInput | leave_requestsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"leave_requests"> | number
    user_id?: IntWithAggregatesFilter<"leave_requests"> | number
    leave_type_id?: IntWithAggregatesFilter<"leave_requests"> | number
    start_date?: DateTimeWithAggregatesFilter<"leave_requests"> | Date | string
    end_date?: DateTimeWithAggregatesFilter<"leave_requests"> | Date | string
    status?: EnumLeaveStatusWithAggregatesFilter<"leave_requests"> | $Enums.LeaveStatus
    reason?: StringNullableWithAggregatesFilter<"leave_requests"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"leave_requests"> | Date | string | null
  }

  export type leave_typesWhereInput = {
    AND?: leave_typesWhereInput | leave_typesWhereInput[]
    OR?: leave_typesWhereInput[]
    NOT?: leave_typesWhereInput | leave_typesWhereInput[]
    id?: IntFilter<"leave_types"> | number
    name?: StringFilter<"leave_types"> | string
    description?: StringNullableFilter<"leave_types"> | string | null
    created_at?: DateTimeNullableFilter<"leave_types"> | Date | string | null
    leave_balances?: Leave_balancesListRelationFilter
    leave_requests?: Leave_requestsListRelationFilter
  }

  export type leave_typesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    leave_balances?: leave_balancesOrderByRelationAggregateInput
    leave_requests?: leave_requestsOrderByRelationAggregateInput
  }

  export type leave_typesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: leave_typesWhereInput | leave_typesWhereInput[]
    OR?: leave_typesWhereInput[]
    NOT?: leave_typesWhereInput | leave_typesWhereInput[]
    name?: StringFilter<"leave_types"> | string
    description?: StringNullableFilter<"leave_types"> | string | null
    created_at?: DateTimeNullableFilter<"leave_types"> | Date | string | null
    leave_balances?: Leave_balancesListRelationFilter
    leave_requests?: Leave_requestsListRelationFilter
  }, "id">

  export type leave_typesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: leave_typesCountOrderByAggregateInput
    _avg?: leave_typesAvgOrderByAggregateInput
    _max?: leave_typesMaxOrderByAggregateInput
    _min?: leave_typesMinOrderByAggregateInput
    _sum?: leave_typesSumOrderByAggregateInput
  }

  export type leave_typesScalarWhereWithAggregatesInput = {
    AND?: leave_typesScalarWhereWithAggregatesInput | leave_typesScalarWhereWithAggregatesInput[]
    OR?: leave_typesScalarWhereWithAggregatesInput[]
    NOT?: leave_typesScalarWhereWithAggregatesInput | leave_typesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"leave_types"> | number
    name?: StringWithAggregatesFilter<"leave_types"> | string
    description?: StringNullableWithAggregatesFilter<"leave_types"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"leave_types"> | Date | string | null
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: IntFilter<"users"> | number
    name?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password_hash?: StringFilter<"users"> | string
    role?: EnumRoleNullableFilter<"users"> | $Enums.Role | null
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    leave_balances?: Leave_balancesListRelationFilter
    leave_requests?: Leave_requestsListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    leave_balances?: leave_balancesOrderByRelationAggregateInput
    leave_requests?: leave_requestsOrderByRelationAggregateInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    name?: StringFilter<"users"> | string
    password_hash?: StringFilter<"users"> | string
    role?: EnumRoleNullableFilter<"users"> | $Enums.Role | null
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    leave_balances?: Leave_balancesListRelationFilter
    leave_requests?: Leave_requestsListRelationFilter
  }, "id" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"users"> | number
    name?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    password_hash?: StringWithAggregatesFilter<"users"> | string
    role?: EnumRoleNullableWithAggregatesFilter<"users"> | $Enums.Role | null
    created_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
  }

  export type leave_balancesCreateInput = {
    balance?: number | null
    updated_at?: Date | string | null
    leave_types: leave_typesCreateNestedOneWithoutLeave_balancesInput
    users: usersCreateNestedOneWithoutLeave_balancesInput
  }

  export type leave_balancesUncheckedCreateInput = {
    id?: number
    user_id: number
    leave_type_id: number
    balance?: number | null
    updated_at?: Date | string | null
  }

  export type leave_balancesUpdateInput = {
    balance?: NullableIntFieldUpdateOperationsInput | number | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leave_types?: leave_typesUpdateOneRequiredWithoutLeave_balancesNestedInput
    users?: usersUpdateOneRequiredWithoutLeave_balancesNestedInput
  }

  export type leave_balancesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    leave_type_id?: IntFieldUpdateOperationsInput | number
    balance?: NullableIntFieldUpdateOperationsInput | number | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type leave_balancesCreateManyInput = {
    id?: number
    user_id: number
    leave_type_id: number
    balance?: number | null
    updated_at?: Date | string | null
  }

  export type leave_balancesUpdateManyMutationInput = {
    balance?: NullableIntFieldUpdateOperationsInput | number | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type leave_balancesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    leave_type_id?: IntFieldUpdateOperationsInput | number
    balance?: NullableIntFieldUpdateOperationsInput | number | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type leave_requestsCreateInput = {
    start_date: Date | string
    end_date: Date | string
    status?: $Enums.LeaveStatus
    reason?: string | null
    created_at?: Date | string | null
    leave_types: leave_typesCreateNestedOneWithoutLeave_requestsInput
    users: usersCreateNestedOneWithoutLeave_requestsInput
  }

  export type leave_requestsUncheckedCreateInput = {
    id?: number
    user_id: number
    leave_type_id: number
    start_date: Date | string
    end_date: Date | string
    status?: $Enums.LeaveStatus
    reason?: string | null
    created_at?: Date | string | null
  }

  export type leave_requestsUpdateInput = {
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leave_types?: leave_typesUpdateOneRequiredWithoutLeave_requestsNestedInput
    users?: usersUpdateOneRequiredWithoutLeave_requestsNestedInput
  }

  export type leave_requestsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    leave_type_id?: IntFieldUpdateOperationsInput | number
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type leave_requestsCreateManyInput = {
    id?: number
    user_id: number
    leave_type_id: number
    start_date: Date | string
    end_date: Date | string
    status?: $Enums.LeaveStatus
    reason?: string | null
    created_at?: Date | string | null
  }

  export type leave_requestsUpdateManyMutationInput = {
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type leave_requestsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    leave_type_id?: IntFieldUpdateOperationsInput | number
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type leave_typesCreateInput = {
    name: string
    description?: string | null
    created_at?: Date | string | null
    leave_balances?: leave_balancesCreateNestedManyWithoutLeave_typesInput
    leave_requests?: leave_requestsCreateNestedManyWithoutLeave_typesInput
  }

  export type leave_typesUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    created_at?: Date | string | null
    leave_balances?: leave_balancesUncheckedCreateNestedManyWithoutLeave_typesInput
    leave_requests?: leave_requestsUncheckedCreateNestedManyWithoutLeave_typesInput
  }

  export type leave_typesUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leave_balances?: leave_balancesUpdateManyWithoutLeave_typesNestedInput
    leave_requests?: leave_requestsUpdateManyWithoutLeave_typesNestedInput
  }

  export type leave_typesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leave_balances?: leave_balancesUncheckedUpdateManyWithoutLeave_typesNestedInput
    leave_requests?: leave_requestsUncheckedUpdateManyWithoutLeave_typesNestedInput
  }

  export type leave_typesCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    created_at?: Date | string | null
  }

  export type leave_typesUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type leave_typesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersCreateInput = {
    name: string
    email: string
    password_hash: string
    role?: $Enums.Role | null
    created_at?: Date | string | null
    leave_balances?: leave_balancesCreateNestedManyWithoutUsersInput
    leave_requests?: leave_requestsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    password_hash: string
    role?: $Enums.Role | null
    created_at?: Date | string | null
    leave_balances?: leave_balancesUncheckedCreateNestedManyWithoutUsersInput
    leave_requests?: leave_requestsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leave_balances?: leave_balancesUpdateManyWithoutUsersNestedInput
    leave_requests?: leave_requestsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leave_balances?: leave_balancesUncheckedUpdateManyWithoutUsersNestedInput
    leave_requests?: leave_requestsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    id?: number
    name: string
    email: string
    password_hash: string
    role?: $Enums.Role | null
    created_at?: Date | string | null
  }

  export type usersUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type Leave_typesScalarRelationFilter = {
    is?: leave_typesWhereInput
    isNot?: leave_typesWhereInput
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type leave_balancesCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    leave_type_id?: SortOrder
    balance?: SortOrder
    updated_at?: SortOrder
  }

  export type leave_balancesAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    leave_type_id?: SortOrder
    balance?: SortOrder
  }

  export type leave_balancesMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    leave_type_id?: SortOrder
    balance?: SortOrder
    updated_at?: SortOrder
  }

  export type leave_balancesMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    leave_type_id?: SortOrder
    balance?: SortOrder
    updated_at?: SortOrder
  }

  export type leave_balancesSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    leave_type_id?: SortOrder
    balance?: SortOrder
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

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
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

  export type EnumLeaveStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaveStatus | EnumLeaveStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LeaveStatus[] | ListEnumLeaveStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaveStatus[] | ListEnumLeaveStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaveStatusFilter<$PrismaModel> | $Enums.LeaveStatus
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

  export type leave_requestsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    leave_type_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    status?: SortOrder
    reason?: SortOrder
    created_at?: SortOrder
  }

  export type leave_requestsAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    leave_type_id?: SortOrder
  }

  export type leave_requestsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    leave_type_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    status?: SortOrder
    reason?: SortOrder
    created_at?: SortOrder
  }

  export type leave_requestsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    leave_type_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    status?: SortOrder
    reason?: SortOrder
    created_at?: SortOrder
  }

  export type leave_requestsSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    leave_type_id?: SortOrder
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

  export type EnumLeaveStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaveStatus | EnumLeaveStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LeaveStatus[] | ListEnumLeaveStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaveStatus[] | ListEnumLeaveStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaveStatusWithAggregatesFilter<$PrismaModel> | $Enums.LeaveStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLeaveStatusFilter<$PrismaModel>
    _max?: NestedEnumLeaveStatusFilter<$PrismaModel>
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

  export type Leave_balancesListRelationFilter = {
    every?: leave_balancesWhereInput
    some?: leave_balancesWhereInput
    none?: leave_balancesWhereInput
  }

  export type Leave_requestsListRelationFilter = {
    every?: leave_requestsWhereInput
    some?: leave_requestsWhereInput
    none?: leave_requestsWhereInput
  }

  export type leave_balancesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type leave_requestsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type leave_typesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
  }

  export type leave_typesAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type leave_typesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
  }

  export type leave_typesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
  }

  export type leave_typesSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type EnumRoleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRoleNullableFilter<$PrismaModel> | $Enums.Role | null
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumRoleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRoleNullableWithAggregatesFilter<$PrismaModel> | $Enums.Role | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRoleNullableFilter<$PrismaModel>
    _max?: NestedEnumRoleNullableFilter<$PrismaModel>
  }

  export type leave_typesCreateNestedOneWithoutLeave_balancesInput = {
    create?: XOR<leave_typesCreateWithoutLeave_balancesInput, leave_typesUncheckedCreateWithoutLeave_balancesInput>
    connectOrCreate?: leave_typesCreateOrConnectWithoutLeave_balancesInput
    connect?: leave_typesWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutLeave_balancesInput = {
    create?: XOR<usersCreateWithoutLeave_balancesInput, usersUncheckedCreateWithoutLeave_balancesInput>
    connectOrCreate?: usersCreateOrConnectWithoutLeave_balancesInput
    connect?: usersWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type leave_typesUpdateOneRequiredWithoutLeave_balancesNestedInput = {
    create?: XOR<leave_typesCreateWithoutLeave_balancesInput, leave_typesUncheckedCreateWithoutLeave_balancesInput>
    connectOrCreate?: leave_typesCreateOrConnectWithoutLeave_balancesInput
    upsert?: leave_typesUpsertWithoutLeave_balancesInput
    connect?: leave_typesWhereUniqueInput
    update?: XOR<XOR<leave_typesUpdateToOneWithWhereWithoutLeave_balancesInput, leave_typesUpdateWithoutLeave_balancesInput>, leave_typesUncheckedUpdateWithoutLeave_balancesInput>
  }

  export type usersUpdateOneRequiredWithoutLeave_balancesNestedInput = {
    create?: XOR<usersCreateWithoutLeave_balancesInput, usersUncheckedCreateWithoutLeave_balancesInput>
    connectOrCreate?: usersCreateOrConnectWithoutLeave_balancesInput
    upsert?: usersUpsertWithoutLeave_balancesInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutLeave_balancesInput, usersUpdateWithoutLeave_balancesInput>, usersUncheckedUpdateWithoutLeave_balancesInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type leave_typesCreateNestedOneWithoutLeave_requestsInput = {
    create?: XOR<leave_typesCreateWithoutLeave_requestsInput, leave_typesUncheckedCreateWithoutLeave_requestsInput>
    connectOrCreate?: leave_typesCreateOrConnectWithoutLeave_requestsInput
    connect?: leave_typesWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutLeave_requestsInput = {
    create?: XOR<usersCreateWithoutLeave_requestsInput, usersUncheckedCreateWithoutLeave_requestsInput>
    connectOrCreate?: usersCreateOrConnectWithoutLeave_requestsInput
    connect?: usersWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumLeaveStatusFieldUpdateOperationsInput = {
    set?: $Enums.LeaveStatus
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type leave_typesUpdateOneRequiredWithoutLeave_requestsNestedInput = {
    create?: XOR<leave_typesCreateWithoutLeave_requestsInput, leave_typesUncheckedCreateWithoutLeave_requestsInput>
    connectOrCreate?: leave_typesCreateOrConnectWithoutLeave_requestsInput
    upsert?: leave_typesUpsertWithoutLeave_requestsInput
    connect?: leave_typesWhereUniqueInput
    update?: XOR<XOR<leave_typesUpdateToOneWithWhereWithoutLeave_requestsInput, leave_typesUpdateWithoutLeave_requestsInput>, leave_typesUncheckedUpdateWithoutLeave_requestsInput>
  }

  export type usersUpdateOneRequiredWithoutLeave_requestsNestedInput = {
    create?: XOR<usersCreateWithoutLeave_requestsInput, usersUncheckedCreateWithoutLeave_requestsInput>
    connectOrCreate?: usersCreateOrConnectWithoutLeave_requestsInput
    upsert?: usersUpsertWithoutLeave_requestsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutLeave_requestsInput, usersUpdateWithoutLeave_requestsInput>, usersUncheckedUpdateWithoutLeave_requestsInput>
  }

  export type leave_balancesCreateNestedManyWithoutLeave_typesInput = {
    create?: XOR<leave_balancesCreateWithoutLeave_typesInput, leave_balancesUncheckedCreateWithoutLeave_typesInput> | leave_balancesCreateWithoutLeave_typesInput[] | leave_balancesUncheckedCreateWithoutLeave_typesInput[]
    connectOrCreate?: leave_balancesCreateOrConnectWithoutLeave_typesInput | leave_balancesCreateOrConnectWithoutLeave_typesInput[]
    createMany?: leave_balancesCreateManyLeave_typesInputEnvelope
    connect?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
  }

  export type leave_requestsCreateNestedManyWithoutLeave_typesInput = {
    create?: XOR<leave_requestsCreateWithoutLeave_typesInput, leave_requestsUncheckedCreateWithoutLeave_typesInput> | leave_requestsCreateWithoutLeave_typesInput[] | leave_requestsUncheckedCreateWithoutLeave_typesInput[]
    connectOrCreate?: leave_requestsCreateOrConnectWithoutLeave_typesInput | leave_requestsCreateOrConnectWithoutLeave_typesInput[]
    createMany?: leave_requestsCreateManyLeave_typesInputEnvelope
    connect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
  }

  export type leave_balancesUncheckedCreateNestedManyWithoutLeave_typesInput = {
    create?: XOR<leave_balancesCreateWithoutLeave_typesInput, leave_balancesUncheckedCreateWithoutLeave_typesInput> | leave_balancesCreateWithoutLeave_typesInput[] | leave_balancesUncheckedCreateWithoutLeave_typesInput[]
    connectOrCreate?: leave_balancesCreateOrConnectWithoutLeave_typesInput | leave_balancesCreateOrConnectWithoutLeave_typesInput[]
    createMany?: leave_balancesCreateManyLeave_typesInputEnvelope
    connect?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
  }

  export type leave_requestsUncheckedCreateNestedManyWithoutLeave_typesInput = {
    create?: XOR<leave_requestsCreateWithoutLeave_typesInput, leave_requestsUncheckedCreateWithoutLeave_typesInput> | leave_requestsCreateWithoutLeave_typesInput[] | leave_requestsUncheckedCreateWithoutLeave_typesInput[]
    connectOrCreate?: leave_requestsCreateOrConnectWithoutLeave_typesInput | leave_requestsCreateOrConnectWithoutLeave_typesInput[]
    createMany?: leave_requestsCreateManyLeave_typesInputEnvelope
    connect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type leave_balancesUpdateManyWithoutLeave_typesNestedInput = {
    create?: XOR<leave_balancesCreateWithoutLeave_typesInput, leave_balancesUncheckedCreateWithoutLeave_typesInput> | leave_balancesCreateWithoutLeave_typesInput[] | leave_balancesUncheckedCreateWithoutLeave_typesInput[]
    connectOrCreate?: leave_balancesCreateOrConnectWithoutLeave_typesInput | leave_balancesCreateOrConnectWithoutLeave_typesInput[]
    upsert?: leave_balancesUpsertWithWhereUniqueWithoutLeave_typesInput | leave_balancesUpsertWithWhereUniqueWithoutLeave_typesInput[]
    createMany?: leave_balancesCreateManyLeave_typesInputEnvelope
    set?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    disconnect?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    delete?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    connect?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    update?: leave_balancesUpdateWithWhereUniqueWithoutLeave_typesInput | leave_balancesUpdateWithWhereUniqueWithoutLeave_typesInput[]
    updateMany?: leave_balancesUpdateManyWithWhereWithoutLeave_typesInput | leave_balancesUpdateManyWithWhereWithoutLeave_typesInput[]
    deleteMany?: leave_balancesScalarWhereInput | leave_balancesScalarWhereInput[]
  }

  export type leave_requestsUpdateManyWithoutLeave_typesNestedInput = {
    create?: XOR<leave_requestsCreateWithoutLeave_typesInput, leave_requestsUncheckedCreateWithoutLeave_typesInput> | leave_requestsCreateWithoutLeave_typesInput[] | leave_requestsUncheckedCreateWithoutLeave_typesInput[]
    connectOrCreate?: leave_requestsCreateOrConnectWithoutLeave_typesInput | leave_requestsCreateOrConnectWithoutLeave_typesInput[]
    upsert?: leave_requestsUpsertWithWhereUniqueWithoutLeave_typesInput | leave_requestsUpsertWithWhereUniqueWithoutLeave_typesInput[]
    createMany?: leave_requestsCreateManyLeave_typesInputEnvelope
    set?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    disconnect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    delete?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    connect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    update?: leave_requestsUpdateWithWhereUniqueWithoutLeave_typesInput | leave_requestsUpdateWithWhereUniqueWithoutLeave_typesInput[]
    updateMany?: leave_requestsUpdateManyWithWhereWithoutLeave_typesInput | leave_requestsUpdateManyWithWhereWithoutLeave_typesInput[]
    deleteMany?: leave_requestsScalarWhereInput | leave_requestsScalarWhereInput[]
  }

  export type leave_balancesUncheckedUpdateManyWithoutLeave_typesNestedInput = {
    create?: XOR<leave_balancesCreateWithoutLeave_typesInput, leave_balancesUncheckedCreateWithoutLeave_typesInput> | leave_balancesCreateWithoutLeave_typesInput[] | leave_balancesUncheckedCreateWithoutLeave_typesInput[]
    connectOrCreate?: leave_balancesCreateOrConnectWithoutLeave_typesInput | leave_balancesCreateOrConnectWithoutLeave_typesInput[]
    upsert?: leave_balancesUpsertWithWhereUniqueWithoutLeave_typesInput | leave_balancesUpsertWithWhereUniqueWithoutLeave_typesInput[]
    createMany?: leave_balancesCreateManyLeave_typesInputEnvelope
    set?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    disconnect?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    delete?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    connect?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    update?: leave_balancesUpdateWithWhereUniqueWithoutLeave_typesInput | leave_balancesUpdateWithWhereUniqueWithoutLeave_typesInput[]
    updateMany?: leave_balancesUpdateManyWithWhereWithoutLeave_typesInput | leave_balancesUpdateManyWithWhereWithoutLeave_typesInput[]
    deleteMany?: leave_balancesScalarWhereInput | leave_balancesScalarWhereInput[]
  }

  export type leave_requestsUncheckedUpdateManyWithoutLeave_typesNestedInput = {
    create?: XOR<leave_requestsCreateWithoutLeave_typesInput, leave_requestsUncheckedCreateWithoutLeave_typesInput> | leave_requestsCreateWithoutLeave_typesInput[] | leave_requestsUncheckedCreateWithoutLeave_typesInput[]
    connectOrCreate?: leave_requestsCreateOrConnectWithoutLeave_typesInput | leave_requestsCreateOrConnectWithoutLeave_typesInput[]
    upsert?: leave_requestsUpsertWithWhereUniqueWithoutLeave_typesInput | leave_requestsUpsertWithWhereUniqueWithoutLeave_typesInput[]
    createMany?: leave_requestsCreateManyLeave_typesInputEnvelope
    set?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    disconnect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    delete?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    connect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    update?: leave_requestsUpdateWithWhereUniqueWithoutLeave_typesInput | leave_requestsUpdateWithWhereUniqueWithoutLeave_typesInput[]
    updateMany?: leave_requestsUpdateManyWithWhereWithoutLeave_typesInput | leave_requestsUpdateManyWithWhereWithoutLeave_typesInput[]
    deleteMany?: leave_requestsScalarWhereInput | leave_requestsScalarWhereInput[]
  }

  export type leave_balancesCreateNestedManyWithoutUsersInput = {
    create?: XOR<leave_balancesCreateWithoutUsersInput, leave_balancesUncheckedCreateWithoutUsersInput> | leave_balancesCreateWithoutUsersInput[] | leave_balancesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: leave_balancesCreateOrConnectWithoutUsersInput | leave_balancesCreateOrConnectWithoutUsersInput[]
    createMany?: leave_balancesCreateManyUsersInputEnvelope
    connect?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
  }

  export type leave_requestsCreateNestedManyWithoutUsersInput = {
    create?: XOR<leave_requestsCreateWithoutUsersInput, leave_requestsUncheckedCreateWithoutUsersInput> | leave_requestsCreateWithoutUsersInput[] | leave_requestsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: leave_requestsCreateOrConnectWithoutUsersInput | leave_requestsCreateOrConnectWithoutUsersInput[]
    createMany?: leave_requestsCreateManyUsersInputEnvelope
    connect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
  }

  export type leave_balancesUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<leave_balancesCreateWithoutUsersInput, leave_balancesUncheckedCreateWithoutUsersInput> | leave_balancesCreateWithoutUsersInput[] | leave_balancesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: leave_balancesCreateOrConnectWithoutUsersInput | leave_balancesCreateOrConnectWithoutUsersInput[]
    createMany?: leave_balancesCreateManyUsersInputEnvelope
    connect?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
  }

  export type leave_requestsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<leave_requestsCreateWithoutUsersInput, leave_requestsUncheckedCreateWithoutUsersInput> | leave_requestsCreateWithoutUsersInput[] | leave_requestsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: leave_requestsCreateOrConnectWithoutUsersInput | leave_requestsCreateOrConnectWithoutUsersInput[]
    createMany?: leave_requestsCreateManyUsersInputEnvelope
    connect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
  }

  export type NullableEnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role | null
  }

  export type leave_balancesUpdateManyWithoutUsersNestedInput = {
    create?: XOR<leave_balancesCreateWithoutUsersInput, leave_balancesUncheckedCreateWithoutUsersInput> | leave_balancesCreateWithoutUsersInput[] | leave_balancesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: leave_balancesCreateOrConnectWithoutUsersInput | leave_balancesCreateOrConnectWithoutUsersInput[]
    upsert?: leave_balancesUpsertWithWhereUniqueWithoutUsersInput | leave_balancesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: leave_balancesCreateManyUsersInputEnvelope
    set?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    disconnect?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    delete?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    connect?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    update?: leave_balancesUpdateWithWhereUniqueWithoutUsersInput | leave_balancesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: leave_balancesUpdateManyWithWhereWithoutUsersInput | leave_balancesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: leave_balancesScalarWhereInput | leave_balancesScalarWhereInput[]
  }

  export type leave_requestsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<leave_requestsCreateWithoutUsersInput, leave_requestsUncheckedCreateWithoutUsersInput> | leave_requestsCreateWithoutUsersInput[] | leave_requestsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: leave_requestsCreateOrConnectWithoutUsersInput | leave_requestsCreateOrConnectWithoutUsersInput[]
    upsert?: leave_requestsUpsertWithWhereUniqueWithoutUsersInput | leave_requestsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: leave_requestsCreateManyUsersInputEnvelope
    set?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    disconnect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    delete?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    connect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    update?: leave_requestsUpdateWithWhereUniqueWithoutUsersInput | leave_requestsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: leave_requestsUpdateManyWithWhereWithoutUsersInput | leave_requestsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: leave_requestsScalarWhereInput | leave_requestsScalarWhereInput[]
  }

  export type leave_balancesUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<leave_balancesCreateWithoutUsersInput, leave_balancesUncheckedCreateWithoutUsersInput> | leave_balancesCreateWithoutUsersInput[] | leave_balancesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: leave_balancesCreateOrConnectWithoutUsersInput | leave_balancesCreateOrConnectWithoutUsersInput[]
    upsert?: leave_balancesUpsertWithWhereUniqueWithoutUsersInput | leave_balancesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: leave_balancesCreateManyUsersInputEnvelope
    set?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    disconnect?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    delete?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    connect?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    update?: leave_balancesUpdateWithWhereUniqueWithoutUsersInput | leave_balancesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: leave_balancesUpdateManyWithWhereWithoutUsersInput | leave_balancesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: leave_balancesScalarWhereInput | leave_balancesScalarWhereInput[]
  }

  export type leave_requestsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<leave_requestsCreateWithoutUsersInput, leave_requestsUncheckedCreateWithoutUsersInput> | leave_requestsCreateWithoutUsersInput[] | leave_requestsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: leave_requestsCreateOrConnectWithoutUsersInput | leave_requestsCreateOrConnectWithoutUsersInput[]
    upsert?: leave_requestsUpsertWithWhereUniqueWithoutUsersInput | leave_requestsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: leave_requestsCreateManyUsersInputEnvelope
    set?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    disconnect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    delete?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    connect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    update?: leave_requestsUpdateWithWhereUniqueWithoutUsersInput | leave_requestsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: leave_requestsUpdateManyWithWhereWithoutUsersInput | leave_requestsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: leave_requestsScalarWhereInput | leave_requestsScalarWhereInput[]
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

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
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

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
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

  export type NestedEnumLeaveStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaveStatus | EnumLeaveStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LeaveStatus[] | ListEnumLeaveStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaveStatus[] | ListEnumLeaveStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaveStatusFilter<$PrismaModel> | $Enums.LeaveStatus
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

  export type NestedEnumLeaveStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaveStatus | EnumLeaveStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LeaveStatus[] | ListEnumLeaveStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaveStatus[] | ListEnumLeaveStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaveStatusWithAggregatesFilter<$PrismaModel> | $Enums.LeaveStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLeaveStatusFilter<$PrismaModel>
    _max?: NestedEnumLeaveStatusFilter<$PrismaModel>
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

  export type NestedEnumRoleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRoleNullableFilter<$PrismaModel> | $Enums.Role | null
  }

  export type NestedEnumRoleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRoleNullableWithAggregatesFilter<$PrismaModel> | $Enums.Role | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRoleNullableFilter<$PrismaModel>
    _max?: NestedEnumRoleNullableFilter<$PrismaModel>
  }

  export type leave_typesCreateWithoutLeave_balancesInput = {
    name: string
    description?: string | null
    created_at?: Date | string | null
    leave_requests?: leave_requestsCreateNestedManyWithoutLeave_typesInput
  }

  export type leave_typesUncheckedCreateWithoutLeave_balancesInput = {
    id?: number
    name: string
    description?: string | null
    created_at?: Date | string | null
    leave_requests?: leave_requestsUncheckedCreateNestedManyWithoutLeave_typesInput
  }

  export type leave_typesCreateOrConnectWithoutLeave_balancesInput = {
    where: leave_typesWhereUniqueInput
    create: XOR<leave_typesCreateWithoutLeave_balancesInput, leave_typesUncheckedCreateWithoutLeave_balancesInput>
  }

  export type usersCreateWithoutLeave_balancesInput = {
    name: string
    email: string
    password_hash: string
    role?: $Enums.Role | null
    created_at?: Date | string | null
    leave_requests?: leave_requestsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutLeave_balancesInput = {
    id?: number
    name: string
    email: string
    password_hash: string
    role?: $Enums.Role | null
    created_at?: Date | string | null
    leave_requests?: leave_requestsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutLeave_balancesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutLeave_balancesInput, usersUncheckedCreateWithoutLeave_balancesInput>
  }

  export type leave_typesUpsertWithoutLeave_balancesInput = {
    update: XOR<leave_typesUpdateWithoutLeave_balancesInput, leave_typesUncheckedUpdateWithoutLeave_balancesInput>
    create: XOR<leave_typesCreateWithoutLeave_balancesInput, leave_typesUncheckedCreateWithoutLeave_balancesInput>
    where?: leave_typesWhereInput
  }

  export type leave_typesUpdateToOneWithWhereWithoutLeave_balancesInput = {
    where?: leave_typesWhereInput
    data: XOR<leave_typesUpdateWithoutLeave_balancesInput, leave_typesUncheckedUpdateWithoutLeave_balancesInput>
  }

  export type leave_typesUpdateWithoutLeave_balancesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leave_requests?: leave_requestsUpdateManyWithoutLeave_typesNestedInput
  }

  export type leave_typesUncheckedUpdateWithoutLeave_balancesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leave_requests?: leave_requestsUncheckedUpdateManyWithoutLeave_typesNestedInput
  }

  export type usersUpsertWithoutLeave_balancesInput = {
    update: XOR<usersUpdateWithoutLeave_balancesInput, usersUncheckedUpdateWithoutLeave_balancesInput>
    create: XOR<usersCreateWithoutLeave_balancesInput, usersUncheckedCreateWithoutLeave_balancesInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutLeave_balancesInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutLeave_balancesInput, usersUncheckedUpdateWithoutLeave_balancesInput>
  }

  export type usersUpdateWithoutLeave_balancesInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leave_requests?: leave_requestsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutLeave_balancesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leave_requests?: leave_requestsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type leave_typesCreateWithoutLeave_requestsInput = {
    name: string
    description?: string | null
    created_at?: Date | string | null
    leave_balances?: leave_balancesCreateNestedManyWithoutLeave_typesInput
  }

  export type leave_typesUncheckedCreateWithoutLeave_requestsInput = {
    id?: number
    name: string
    description?: string | null
    created_at?: Date | string | null
    leave_balances?: leave_balancesUncheckedCreateNestedManyWithoutLeave_typesInput
  }

  export type leave_typesCreateOrConnectWithoutLeave_requestsInput = {
    where: leave_typesWhereUniqueInput
    create: XOR<leave_typesCreateWithoutLeave_requestsInput, leave_typesUncheckedCreateWithoutLeave_requestsInput>
  }

  export type usersCreateWithoutLeave_requestsInput = {
    name: string
    email: string
    password_hash: string
    role?: $Enums.Role | null
    created_at?: Date | string | null
    leave_balances?: leave_balancesCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutLeave_requestsInput = {
    id?: number
    name: string
    email: string
    password_hash: string
    role?: $Enums.Role | null
    created_at?: Date | string | null
    leave_balances?: leave_balancesUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutLeave_requestsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutLeave_requestsInput, usersUncheckedCreateWithoutLeave_requestsInput>
  }

  export type leave_typesUpsertWithoutLeave_requestsInput = {
    update: XOR<leave_typesUpdateWithoutLeave_requestsInput, leave_typesUncheckedUpdateWithoutLeave_requestsInput>
    create: XOR<leave_typesCreateWithoutLeave_requestsInput, leave_typesUncheckedCreateWithoutLeave_requestsInput>
    where?: leave_typesWhereInput
  }

  export type leave_typesUpdateToOneWithWhereWithoutLeave_requestsInput = {
    where?: leave_typesWhereInput
    data: XOR<leave_typesUpdateWithoutLeave_requestsInput, leave_typesUncheckedUpdateWithoutLeave_requestsInput>
  }

  export type leave_typesUpdateWithoutLeave_requestsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leave_balances?: leave_balancesUpdateManyWithoutLeave_typesNestedInput
  }

  export type leave_typesUncheckedUpdateWithoutLeave_requestsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leave_balances?: leave_balancesUncheckedUpdateManyWithoutLeave_typesNestedInput
  }

  export type usersUpsertWithoutLeave_requestsInput = {
    update: XOR<usersUpdateWithoutLeave_requestsInput, usersUncheckedUpdateWithoutLeave_requestsInput>
    create: XOR<usersCreateWithoutLeave_requestsInput, usersUncheckedCreateWithoutLeave_requestsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutLeave_requestsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutLeave_requestsInput, usersUncheckedUpdateWithoutLeave_requestsInput>
  }

  export type usersUpdateWithoutLeave_requestsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leave_balances?: leave_balancesUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutLeave_requestsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leave_balances?: leave_balancesUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type leave_balancesCreateWithoutLeave_typesInput = {
    balance?: number | null
    updated_at?: Date | string | null
    users: usersCreateNestedOneWithoutLeave_balancesInput
  }

  export type leave_balancesUncheckedCreateWithoutLeave_typesInput = {
    id?: number
    user_id: number
    balance?: number | null
    updated_at?: Date | string | null
  }

  export type leave_balancesCreateOrConnectWithoutLeave_typesInput = {
    where: leave_balancesWhereUniqueInput
    create: XOR<leave_balancesCreateWithoutLeave_typesInput, leave_balancesUncheckedCreateWithoutLeave_typesInput>
  }

  export type leave_balancesCreateManyLeave_typesInputEnvelope = {
    data: leave_balancesCreateManyLeave_typesInput | leave_balancesCreateManyLeave_typesInput[]
    skipDuplicates?: boolean
  }

  export type leave_requestsCreateWithoutLeave_typesInput = {
    start_date: Date | string
    end_date: Date | string
    status?: $Enums.LeaveStatus
    reason?: string | null
    created_at?: Date | string | null
    users: usersCreateNestedOneWithoutLeave_requestsInput
  }

  export type leave_requestsUncheckedCreateWithoutLeave_typesInput = {
    id?: number
    user_id: number
    start_date: Date | string
    end_date: Date | string
    status?: $Enums.LeaveStatus
    reason?: string | null
    created_at?: Date | string | null
  }

  export type leave_requestsCreateOrConnectWithoutLeave_typesInput = {
    where: leave_requestsWhereUniqueInput
    create: XOR<leave_requestsCreateWithoutLeave_typesInput, leave_requestsUncheckedCreateWithoutLeave_typesInput>
  }

  export type leave_requestsCreateManyLeave_typesInputEnvelope = {
    data: leave_requestsCreateManyLeave_typesInput | leave_requestsCreateManyLeave_typesInput[]
    skipDuplicates?: boolean
  }

  export type leave_balancesUpsertWithWhereUniqueWithoutLeave_typesInput = {
    where: leave_balancesWhereUniqueInput
    update: XOR<leave_balancesUpdateWithoutLeave_typesInput, leave_balancesUncheckedUpdateWithoutLeave_typesInput>
    create: XOR<leave_balancesCreateWithoutLeave_typesInput, leave_balancesUncheckedCreateWithoutLeave_typesInput>
  }

  export type leave_balancesUpdateWithWhereUniqueWithoutLeave_typesInput = {
    where: leave_balancesWhereUniqueInput
    data: XOR<leave_balancesUpdateWithoutLeave_typesInput, leave_balancesUncheckedUpdateWithoutLeave_typesInput>
  }

  export type leave_balancesUpdateManyWithWhereWithoutLeave_typesInput = {
    where: leave_balancesScalarWhereInput
    data: XOR<leave_balancesUpdateManyMutationInput, leave_balancesUncheckedUpdateManyWithoutLeave_typesInput>
  }

  export type leave_balancesScalarWhereInput = {
    AND?: leave_balancesScalarWhereInput | leave_balancesScalarWhereInput[]
    OR?: leave_balancesScalarWhereInput[]
    NOT?: leave_balancesScalarWhereInput | leave_balancesScalarWhereInput[]
    id?: IntFilter<"leave_balances"> | number
    user_id?: IntFilter<"leave_balances"> | number
    leave_type_id?: IntFilter<"leave_balances"> | number
    balance?: IntNullableFilter<"leave_balances"> | number | null
    updated_at?: DateTimeNullableFilter<"leave_balances"> | Date | string | null
  }

  export type leave_requestsUpsertWithWhereUniqueWithoutLeave_typesInput = {
    where: leave_requestsWhereUniqueInput
    update: XOR<leave_requestsUpdateWithoutLeave_typesInput, leave_requestsUncheckedUpdateWithoutLeave_typesInput>
    create: XOR<leave_requestsCreateWithoutLeave_typesInput, leave_requestsUncheckedCreateWithoutLeave_typesInput>
  }

  export type leave_requestsUpdateWithWhereUniqueWithoutLeave_typesInput = {
    where: leave_requestsWhereUniqueInput
    data: XOR<leave_requestsUpdateWithoutLeave_typesInput, leave_requestsUncheckedUpdateWithoutLeave_typesInput>
  }

  export type leave_requestsUpdateManyWithWhereWithoutLeave_typesInput = {
    where: leave_requestsScalarWhereInput
    data: XOR<leave_requestsUpdateManyMutationInput, leave_requestsUncheckedUpdateManyWithoutLeave_typesInput>
  }

  export type leave_requestsScalarWhereInput = {
    AND?: leave_requestsScalarWhereInput | leave_requestsScalarWhereInput[]
    OR?: leave_requestsScalarWhereInput[]
    NOT?: leave_requestsScalarWhereInput | leave_requestsScalarWhereInput[]
    id?: IntFilter<"leave_requests"> | number
    user_id?: IntFilter<"leave_requests"> | number
    leave_type_id?: IntFilter<"leave_requests"> | number
    start_date?: DateTimeFilter<"leave_requests"> | Date | string
    end_date?: DateTimeFilter<"leave_requests"> | Date | string
    status?: EnumLeaveStatusFilter<"leave_requests"> | $Enums.LeaveStatus
    reason?: StringNullableFilter<"leave_requests"> | string | null
    created_at?: DateTimeNullableFilter<"leave_requests"> | Date | string | null
  }

  export type leave_balancesCreateWithoutUsersInput = {
    balance?: number | null
    updated_at?: Date | string | null
    leave_types: leave_typesCreateNestedOneWithoutLeave_balancesInput
  }

  export type leave_balancesUncheckedCreateWithoutUsersInput = {
    id?: number
    leave_type_id: number
    balance?: number | null
    updated_at?: Date | string | null
  }

  export type leave_balancesCreateOrConnectWithoutUsersInput = {
    where: leave_balancesWhereUniqueInput
    create: XOR<leave_balancesCreateWithoutUsersInput, leave_balancesUncheckedCreateWithoutUsersInput>
  }

  export type leave_balancesCreateManyUsersInputEnvelope = {
    data: leave_balancesCreateManyUsersInput | leave_balancesCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type leave_requestsCreateWithoutUsersInput = {
    start_date: Date | string
    end_date: Date | string
    status?: $Enums.LeaveStatus
    reason?: string | null
    created_at?: Date | string | null
    leave_types: leave_typesCreateNestedOneWithoutLeave_requestsInput
  }

  export type leave_requestsUncheckedCreateWithoutUsersInput = {
    id?: number
    leave_type_id: number
    start_date: Date | string
    end_date: Date | string
    status?: $Enums.LeaveStatus
    reason?: string | null
    created_at?: Date | string | null
  }

  export type leave_requestsCreateOrConnectWithoutUsersInput = {
    where: leave_requestsWhereUniqueInput
    create: XOR<leave_requestsCreateWithoutUsersInput, leave_requestsUncheckedCreateWithoutUsersInput>
  }

  export type leave_requestsCreateManyUsersInputEnvelope = {
    data: leave_requestsCreateManyUsersInput | leave_requestsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type leave_balancesUpsertWithWhereUniqueWithoutUsersInput = {
    where: leave_balancesWhereUniqueInput
    update: XOR<leave_balancesUpdateWithoutUsersInput, leave_balancesUncheckedUpdateWithoutUsersInput>
    create: XOR<leave_balancesCreateWithoutUsersInput, leave_balancesUncheckedCreateWithoutUsersInput>
  }

  export type leave_balancesUpdateWithWhereUniqueWithoutUsersInput = {
    where: leave_balancesWhereUniqueInput
    data: XOR<leave_balancesUpdateWithoutUsersInput, leave_balancesUncheckedUpdateWithoutUsersInput>
  }

  export type leave_balancesUpdateManyWithWhereWithoutUsersInput = {
    where: leave_balancesScalarWhereInput
    data: XOR<leave_balancesUpdateManyMutationInput, leave_balancesUncheckedUpdateManyWithoutUsersInput>
  }

  export type leave_requestsUpsertWithWhereUniqueWithoutUsersInput = {
    where: leave_requestsWhereUniqueInput
    update: XOR<leave_requestsUpdateWithoutUsersInput, leave_requestsUncheckedUpdateWithoutUsersInput>
    create: XOR<leave_requestsCreateWithoutUsersInput, leave_requestsUncheckedCreateWithoutUsersInput>
  }

  export type leave_requestsUpdateWithWhereUniqueWithoutUsersInput = {
    where: leave_requestsWhereUniqueInput
    data: XOR<leave_requestsUpdateWithoutUsersInput, leave_requestsUncheckedUpdateWithoutUsersInput>
  }

  export type leave_requestsUpdateManyWithWhereWithoutUsersInput = {
    where: leave_requestsScalarWhereInput
    data: XOR<leave_requestsUpdateManyMutationInput, leave_requestsUncheckedUpdateManyWithoutUsersInput>
  }

  export type leave_balancesCreateManyLeave_typesInput = {
    id?: number
    user_id: number
    balance?: number | null
    updated_at?: Date | string | null
  }

  export type leave_requestsCreateManyLeave_typesInput = {
    id?: number
    user_id: number
    start_date: Date | string
    end_date: Date | string
    status?: $Enums.LeaveStatus
    reason?: string | null
    created_at?: Date | string | null
  }

  export type leave_balancesUpdateWithoutLeave_typesInput = {
    balance?: NullableIntFieldUpdateOperationsInput | number | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneRequiredWithoutLeave_balancesNestedInput
  }

  export type leave_balancesUncheckedUpdateWithoutLeave_typesInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    balance?: NullableIntFieldUpdateOperationsInput | number | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type leave_balancesUncheckedUpdateManyWithoutLeave_typesInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    balance?: NullableIntFieldUpdateOperationsInput | number | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type leave_requestsUpdateWithoutLeave_typesInput = {
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneRequiredWithoutLeave_requestsNestedInput
  }

  export type leave_requestsUncheckedUpdateWithoutLeave_typesInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type leave_requestsUncheckedUpdateManyWithoutLeave_typesInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type leave_balancesCreateManyUsersInput = {
    id?: number
    leave_type_id: number
    balance?: number | null
    updated_at?: Date | string | null
  }

  export type leave_requestsCreateManyUsersInput = {
    id?: number
    leave_type_id: number
    start_date: Date | string
    end_date: Date | string
    status?: $Enums.LeaveStatus
    reason?: string | null
    created_at?: Date | string | null
  }

  export type leave_balancesUpdateWithoutUsersInput = {
    balance?: NullableIntFieldUpdateOperationsInput | number | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leave_types?: leave_typesUpdateOneRequiredWithoutLeave_balancesNestedInput
  }

  export type leave_balancesUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    leave_type_id?: IntFieldUpdateOperationsInput | number
    balance?: NullableIntFieldUpdateOperationsInput | number | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type leave_balancesUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    leave_type_id?: IntFieldUpdateOperationsInput | number
    balance?: NullableIntFieldUpdateOperationsInput | number | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type leave_requestsUpdateWithoutUsersInput = {
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leave_types?: leave_typesUpdateOneRequiredWithoutLeave_requestsNestedInput
  }

  export type leave_requestsUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    leave_type_id?: IntFieldUpdateOperationsInput | number
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type leave_requestsUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    leave_type_id?: IntFieldUpdateOperationsInput | number
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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