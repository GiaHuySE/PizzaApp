import { types } from "mobx-state-tree"

export const Todo = types
  .model({
    id: types.identifier,
    text: types.string,
    completed: false,
  })
  .actions((self) => ({
    Toggle() {
      self.completed = !self.completed
    },
  }))
