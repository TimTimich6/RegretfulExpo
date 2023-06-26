import { View, Text, StyleSheet, TouchableHighlight, Alert } from "react-native";
import React, { useCallback, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Explore from "./Explore";
import { Entypo, Ionicons } from "@expo/vector-icons";
import Story from "./Story";
import useAxios from "../misc/useAxios";
import { HoldItem } from "react-native-hold-menu";
import useAuth from "../misc/useAuth";
import { NavigationProp, RouteProp } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function StoryStack({ navigation, route }) {
  const { showNotif, user } = useAuth();
  const axios = useAxios();

  async function reportPost(id: string) {
    console.log("report pressed");
    const resp = await axios.put("posts/flag/" + id).catch((err) => {
      console.log(err);
    });
    showNotif("Flagged story successfully");
  }

  async function blockUser(authorId: string) {
    console.log("auth", user?.id);
    // console.log("block pressed", authorId);

    const resp = await axios.put("users/block/" + authorId, {}, { headers: { Authorization: user?.id } }).catch((err) => {
      console.log(err);
    });
    if (resp) {
      showNotif("Blocked User successfully");

      navigation.navigate("Explore");
    }
  }

  return (
    <Stack.Navigator initialRouteName="Explore">
      <Stack.Screen name="Explore" component={Explore} options={{ headerShown: false }} />
      <Stack.Screen
        name="Story"
        component={Story}
        options={() => ({
          header: ({ route, options }) => (
            <View style={{ justifyContent: "space-between", flexDirection: "row", backgroundColor: "#121517", paddingHorizontal: 10 }}>
              <TouchableHighlight onPress={() => navigation.goBack()} style={styles.header} underlayColor={"#121517"}>
                <Ionicons name="arrow-back-outline" size={40} color="#F7FFF7" />
              </TouchableHighlight>
              {route.params.authorId !== user?.id && (
                <HoldItem
                  activateOn="tap"
                  closeOnTap
                  actionParams={{
                    "Report Story": [route.params.id],
                    "Block User": [route.params.authorId],
                  }}
                  disableMove
                  items={[
                    { text: "Moderate Actions", isTitle: true },
                    {
                      text: "Report Story",
                      icon: () => <Ionicons name="flag" size={18} color="white" />,
                      onPress: (idrep) => {
                        reportPost(idrep);
                      },
                    },
                    {
                      text: "Block User",
                      icon: () => <Entypo name="block" size={18} color="white" />,
                      // withSeparator: true,
                      isDestructive: true,
                      onPress: (authId) => {
                        blockUser(authId);
                      },
                    },
                  ]}
                >
                  <TouchableHighlight onPress={() => {}} style={styles.header} underlayColor={"#121517"}>
                    <Ionicons name="flag" size={30} color={"#F7FFF7"} />
                  </TouchableHighlight>
                </HoldItem>
              )}
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

// const Popup = ({ authorId, id }: { authorId: string; id: string }) => {

//   return (

//   );
// };
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#121517",
    paddingHorizontal: 10,
  },
});
