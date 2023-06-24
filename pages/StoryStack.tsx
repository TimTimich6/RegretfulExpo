import { View, Text, StyleSheet, TouchableHighlight, Alert } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Explore from "./Explore";
import { Ionicons } from "@expo/vector-icons";
import Story from "./Story";
import useAxios from "../misc/useAxios";

const Stack = createStackNavigator();

export default function ExploreStack({ navigation }) {
  const axios = useAxios();
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
          const resp = await axios.put("posts/flag/" + id).catch((err) => {
            console.log(err);
          });
        },
      },
    ]);
  return (
    <Stack.Navigator initialRouteName="Explore">
      <Stack.Screen name="Explore" component={Explore} options={{ headerShown: false }} />
      <Stack.Screen
        name="Story"
        component={Story}
        options={{
          header: (props) => (
            <View style={{ justifyContent: "space-between", flexDirection: "row", backgroundColor: "#121517", paddingHorizontal: 10 }}>
              <TouchableHighlight onPress={() => navigation.goBack()} style={styles.header} underlayColor={"#121517"}>
                <Ionicons name="arrow-back-outline" size={40} color="#F7FFF7" />
              </TouchableHighlight>

              <TouchableHighlight onPress={() => confirmFlag(props.route.params.id)} style={styles.header} underlayColor={"#121517"}>
                <Ionicons name="flag" size={30} color={"#F7FFF7"} />
              </TouchableHighlight>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#121517",
    paddingHorizontal: 10,
  },
});
