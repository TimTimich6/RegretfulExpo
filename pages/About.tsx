import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { openURL } from "expo-linking";
export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.title} selectable={false}>
        About
      </Text>
      <Text style={styles.description}>
        Regretful is a fun app where you can anonymously share your stories or notes with others and favorite other posts. No data is stored regarding
        the device or the actual user.
      </Text>
      <View style={{ width: "100%", marginTop: 40, borderBottomWidth: 1, borderColor: "#F7FFF7" }}>
        <TouchableOpacity
          style={styles.section}
          onPress={() => {
            openURL("https://regretfulapp.xyz/eula");
          }}
        >
          <Text style={styles.wide}>Read Eula</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.section}
          onPress={() => {
            openURL("https://regretfulapp.xyz/privacy");
          }}
        >
          <Text style={styles.wide}>Read Privacy Policy</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.section}
          onPress={() => {
            navigation.navigate("ViewStories", {
              filter: "liked",
              screenname: "My liked strories",
            });
          }}
        >
          <Text style={styles.wide}>View my Favorited: {user && user?.liked?.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.section} onPress={() => navigation.navigate("About")}>
          <Text style={styles.wide}>About the app</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "#121517",
    paddingTop: 15,
    // paddingHorizontal: 15,
    // justifyContent: "spa",
    // backgroundColor: "red",

    gap: 10,
  },
  wide: {
    width: "100%",

    color: "#FFFC5C",
    fontSize: 26,
    fontWeight: "700",
    padding: 10,
    backgroundColor: "#2F373C",
  },
  description: {
    color: "#F7FFF7",
    fontSize: 20,
    fontWeight: "600",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 28,
    paddingHorizontal: 15,

    fontWeight: "700",
    color: "#FFFC5C",
    width: "100%",
  },
  scroll: {
    flex: 1,
    width: "100%",
    gap: 10,
    paddingHorizontal: 5,
  },
  section: {
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#F7FFF7",
  },
});
