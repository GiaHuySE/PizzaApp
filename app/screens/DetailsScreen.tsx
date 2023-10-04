import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps, goBack } from "app/navigators"
import { Button, Header, Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface DetailsScreenProps extends AppStackScreenProps<"Details"> {}

export const DetailsScreen: FC<DetailsScreenProps> = observer(function DetailsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Header title="Details" />
      <Button onPress={goBack} text="Go back" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
