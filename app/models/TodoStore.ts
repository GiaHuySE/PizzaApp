import { types, clone } from "mobx-state-tree"
import { Todo } from "./Todo"

export const TodoStoreModel = types
  .model("RootStore", { todos: types.array(Todo) })
  .props({})
  .views((self) => {
    return {
      get todo1() {
        return clone(self.todos)
      },
    }
  })
  .actions((self) => ({
    addTodo(text) {
      self.todos.push({ id: Date.now().toString(), text })
    },
    removeTodo(todoId) {
      const indexToRemove = self.todos.findIndex((todo) => todo.id === todoId)
      if (indexToRemove !== -1) {
        self.todos.replace(self.todo1.filter((todo) => todo.id !== todoId))
      }
    },
  }))
