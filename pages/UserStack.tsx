import { StyleSheet, TouchableHighlight } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import Story from "./Story";
import User from "./User";
import ViewStories from "./ViewStories";
import About from "./About";

const Stack = createStackNavigator();

export default function UserStack({ navigation }) {
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
            <TouchableHighlight onPress={() => navigation.navigate("UserStack", { screen: "User" })} style={styles.header} underlayColor={"#121517"}>
              <Ionicons name="arrow-back-outline" size={40} color="#F7FFF7" />
            </TouchableHighlight>
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
