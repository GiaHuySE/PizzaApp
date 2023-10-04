import { Instance, SnapshotOut, types, destroy } from "mobx-state-tree"
import { action } from "mobx"

import { Todo } from "./Todo"
import { User } from "./User"
import { TodoStoreModel } from "./TodoStore"

/**
 * A RootStore model.
 */

export const RootStoreModel = types.model("RootStore", {
  todoStore: types.optional(TodoStoreModel, { todos: [] }),
})

// export const rootStore = RootStoreModel.create({ todos: [] })
export const rootStore = RootStoreModel.create({ todoStore: { todos: [] } })

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
