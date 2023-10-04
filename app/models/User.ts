import { types } from "mobx-state-tree"

export const User = types
  .model({
    userID: types.optional(types.identifier, ""),
    userName: types.optional(types.string, ""),
  })
  .actions((self) => ({}))
