import { Alert, StyleSheet, TouchableHighlight } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import Story from "./Story";
import User from "./User";
import ViewStories from "./ViewStories";
import About from "./About";
import { View } from "react-native";
import useAxios from "../misc/useAxios";

const Stack = createStackNavigator();

export default function UserStack({ navigation }) {
  const confirmFlag = (id: string) =>
    Alert.alert("Confirm Flag", "Are you sure you want to flag this story for moderation?", [
      {
        text: "Cancel",
        onPress: () => console.log("cancel pressed"),

        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: async () => {
          console.log("confirm pressed");
          const resp = await useAxios()
            .put("posts/flag/" + id)
            .catch((err) => {
              console.log(err);
            });
        },
      },
    ]);
  return (
    <Stack.Navigator initialRouteName="User">
      <Stack.Screen name="User" component={User} options={{ headerShown: false }} />
      <Stack.Screen
        name="ViewStories"
        component={ViewStories}
        options={{
          header: () => (
            <TouchableHighlight onPress={() => navigation.navigate("UserStack", { screen: "User" })} style={styles.header} underlayColor={"#121517"}>
              <Ionicons name="arrow-back-outline" size={40} color="#F7FFF7" />
            </TouchableHighlight>
          ),
        }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          header: (props) => (
            <View style={{ justifyContent: "space-between", flexDirection: "row", backgroundColor: "#121517", paddingHorizontal: 10 }}>
              <TouchableHighlight onPress={() => navigation.goBack()} style={styles.header} underlayColor={"#121517"}>
                <Ionicons name="arrow-back-outline" size={40} color="#F7FFF7" />
              </TouchableHighlight>
              <TouchableHighlight onPress={() => confirmFlag(props.route.params)} style={styles.header} underlayColor={"#121517"}>
                <Ionicons name="flag" size={30} color={"#F7FFF7"} />
              </TouchableHighlight>
            </View>
          ),
        }}
      />

      {/* <Stack.Screen
        name="Story"
        component={Story}
        options={{
          header: () => (
            <TouchableHighlight onPress={() => navigation.goBack()} style={styles.header} underlayColor={"#121517"}>
              <Ionicons name="arrow-back-outline" size={40} color="#F7FFF7" />
            </TouchableHighlight>
          ),
        }}
      /> */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#121517",
    paddingHorizontal: 10,
  },
});
