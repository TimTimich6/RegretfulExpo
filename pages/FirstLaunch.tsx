import { View, Text, StyleSheet } from "react-native";
import React from "react";
import RoundButton from "../components/RoundButton";
import useAuth from "../misc/useAuth";

export default function FirstLaunch() {
  const { firstLaunch, setFirstLaunch } = useAuth();
  if (firstLaunch)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Regretful</Text>
        <Text style={styles.desc}>Share your funny and regretful stories anonymously</Text>
        <View style={styles.buttons}>
          <RoundButton text="Proceed" bg="#FFFC5C" color="#121517" onPress={(e) => setFirstLaunch(false)}></RoundButton>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "110%",
    alignItems: "center",
    backgroundColor: "#121517",
    gap: 5,
    paddingHorizontal: 30,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 101,
  },
  title: {
    fontSize: 50,
    fontWeight: "800",
    color: "#FFFC5C",
    textAlign: "center",
  },
  desc: {
    color: "#F7FFF7",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "600",
  },
  buttons: {
    // position: "relative",
    // top: 200,
    marginTop: 20,
    flexDirection: "column",
    gap: 10,
  },
});
