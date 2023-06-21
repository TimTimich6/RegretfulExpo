import { View, Text, StyleSheet } from "react-native";
import React from "react";
import RoundButton from "../components/RoundButton";

export default function Home({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Regretful</Text>
      <Text style={styles.desc}>Share your funny and regretful stories anonymously </Text>
      <View style={styles.buttons}>
        <RoundButton text="Post Story" bg="#70A288" onPress={(e) => navigation.navigate("Post")}></RoundButton>
        <RoundButton text="Explore" bg="#FFFC5C" color="#121517" onPress={(e) => navigation.navigate("Explore")}></RoundButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#121517",
    gap: 5,
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  title: {
    fontSize: 60,
    fontWeight: "800",
    color: "#FFFC5C",
  },
  desc: {
    color: "#F7FFF7",
    fontSize: 20,
    textAlign: "center",
  },
  buttons: {
    // position: "relative",
    // top: 200,
    marginTop: 20,
    flexDirection: "column",
    gap: 10,
  },
});
