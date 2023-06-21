import React from "react";
import Post from "./pages/Post";
import { FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import StoryStack from "./pages/StoryStack";
import UserStack from "./pages/UserStack";
const Tab = createBottomTabNavigator();
export default function AppStack() {
  const navigate = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName="StoryStack"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;
          if (route.name === "StoryStack") {
            iconName = "search";
            size = 26;
          }
          if (route.name === "UserStack") {
            iconName = "user";
          }
          if (route.name === "Post") {
            iconName = "plus-square";
            size = 34;
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarInactiveBackgroundColor: "#121517",
        tabBarActiveTintColor: "#FFFC5C",
        tabBarActiveBackgroundColor: "#2F373C",
        tabBarStyle: { borderTopWidth: 0, marginTop: 4 },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "gray",
      })}
    >
      {/* <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} /> */}
      <Tab.Screen
        name="StoryStack"
        component={StoryStack}
        // options={{
        //   header: () => (
        //     <TouchableHighlight onPress={() => navigate.goBack()} style={styles.header} underlayColor={"#121517"}>
        //       <Ionicons name="arrow-back-outline" size={40} color="white" />
        //     </TouchableHighlight>
        //   ),
        // }}
      />
      <Tab.Screen
        name="Post"
        component={Post}
        // options={{
        //   header: () => (
        //     <TouchableHighlight onPress={() => navigate.goBack()} style={styles.header} underlayColor={"#121517"}>
        //       <Ionicons name="arrow-back-outline" size={40} color="white" />
        //     </TouchableHighlight>
        //   ),
        // }}
      />
      <Tab.Screen
        name="UserStack"
        component={UserStack}
        // options={{
        //   header: () => (
        //     <TouchableHighlight onPress={() => navigate.goBack()} style={styles.header} underlayColor={"#121517"}>
        //       <Ionicons name="arrow-back-outline" size={40} color="white" />
        //     </TouchableHighlight>
        //   ),
        // }}
      />
    </Tab.Navigator>
  );
}
