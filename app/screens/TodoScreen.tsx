import { View, Text, ViewStyle, FlatList, TouchableOpacity } from "react-native"
import React, { FC, useEffect, useRef, useState } from "react"
import { NavigationScreenProps } from "react-navigation"
import {
  AutoImage,
  Button,
  Card,
  EmptyState,
  Header,
  Icon,
  ListItem,
  Screen,
  TextField,
  Toggle,
  useAutoImage,
} from "app/components"
import { observer } from "mobx-react-lite"
import { useStores } from "../models"
import { onSnapshot, getSnapshot, applySnapshot } from "mobx-state-tree"
import { translate } from "app/i18n"
import { useHeader } from "app/utils/useHeader"
import { navigate } from "app/navigators"
import { api } from "app/services/api"
import { GeneralApiProblem, getGeneralApiProblem } from "app/services/api/apiProblem"

export interface AppMainScreenProps extends NavigationScreenProps<{}> {}

export const TodoScreen: React.FunctionComponent<AppMainScreenProps> = observer(() => {
  const [newTodo, setNewTodo] = useState("")
  const rootStore = useStores()
  const [items, setItems] = useState([])
  const handleAddTodo = () => {
    if (newTodo) {
      rootStore.todoStore.addTodo(newTodo)
      setNewTodo("")
    }
  }
  const handleRemoveTodo = (todoId) => {
    rootStore.todoStore.removeTodo(todoId)
  }
  const headerProps = {
    title: "My Screen Title",
    // Other header customization props
  }

  const goToDetailsScreen = () => {
    navigate({ name: "Details", params: undefined })
  }

  useEffect(() => {
    // Fetch items when the component mounts
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const respond = await api.apisauce.get("https://jsonplaceholder.typicode.com/todos")
      const apiProblem: GeneralApiProblem | null = getGeneralApiProblem(respond)
      if (apiProblem) {
        // Handle the identified API problem
        switch (apiProblem.kind) {
          case "cannot-connect":
            console.error("Cannot connect to the server.")
            break
          case "timeout":
            console.error("Request timed out.")
            break
          case "server":
            console.error("Server error.")
            break
          case "unauthorized":
            console.error("Unauthorized access.")
            break
          // Handle other API problems as needed
          default:
            console.error("Unknown API problem.")
            break
        }
      } else if (respond.ok) {
        setItems(respond.data as typeof items)
      } else {
        console.error("Error fetching items:", respond.problem)
      }
    } catch (error) {}
  }

  // Call useHeader to set the header
  useHeader(headerProps)
  return (
    <Screen style={$container}>
      <TextField
        label="New todo"
        placeholder="Add a new todo"
        value={newTodo}
        onChangeText={(text) => setNewTodo(text)}
      />
      <Button text="Add" onPress={handleAddTodo} />
      {/* <FlatList
        style={{ height: 5 }}
        data={rootStore.todoStore.todo1}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text
              onPress={() => item.Toggle()}
              style={{ textDecorationLine: item.completed ? "line-through" : "none" }}
            >
              {item.text}
            </Text>
            <TouchableOpacity onPress={() => handleRemoveTodo(item.id)}>
              <Text style={{ color: "red" }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        
      /> */}
      <View></View>
      <Button
        text="fetch data"
        onPress={() => {
          console.log(items)
        }}
      />

      {items.map((item, index) => (
        <ListItem text={item.title} key={index} height={0} />
      ))}
    </Screen>
  )
})

const $container: ViewStyle = {
  flex: 1,
}
