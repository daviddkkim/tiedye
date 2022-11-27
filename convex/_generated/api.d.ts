/* eslint-disable */
/**
 * Generated API.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@0.5.0.
 * To regenerate, run `npx convex codegen`.
 * @module
 */

import type { ApiFromModules } from "convex/api";
import type * as createRoom from "../createRoom";
import type * as getOneRoom from "../getOneRoom";
import type * as getRooms from "../getRooms";
import type * as storeUser from "../storeUser";
import type * as updateRoom from "../updateRoom";

/**
 * A type describing your app's public Convex API.
 *
 * This `API` type includes information about the arguments and return
 * types of your app's query and mutation functions.
 *
 * This type should be used with type-parameterized classes like
 * `ConvexReactClient` to create app-specific types.
 */
export type API = ApiFromModules<{
  createRoom: typeof createRoom;
  getOneRoom: typeof getOneRoom;
  getRooms: typeof getRooms;
  storeUser: typeof storeUser;
  updateRoom: typeof updateRoom;
}>;
