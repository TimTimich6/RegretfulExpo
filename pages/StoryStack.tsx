import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TouchableHighlight } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Explore from "./Explore";
import { AntDesign, Feather, Octicons, Ionicons } from "@expo/vector-icons";
import Story from "./Story";

const Stack = createStackNavigator();

export default function ExploreStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Explore">
      <Stack.Screen name="Explore" component={Explore} options={{ headerShown: false }} />
      <Stack.Screen
        name="Story"
        component={Story}
        options={{
          header: () => (
            <TouchableHighlight onPress={() => navigation.goBack()} style={styles.header} underlayColor={"#121517"}>
              <Ionicons name="arrow-back-outline" size={40} color="#F7FFF7" />
            </TouchableHighlight>
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
