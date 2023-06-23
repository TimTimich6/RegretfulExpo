import { View, Text, StyleSheet, ScrollView, RefreshControl, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import useAuth from "../misc/useAuth";
import useAxios from "../misc/useAxios";
import { ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
export default function User({ navigation }) {
  const { user, setUser } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const axios = useAxios();
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    axios
      .get("users/" + user?.id)
      .then((resp) => {
        console.log(resp.data);
        if (resp.data) setUser(resp.data.user);
      })
      .catch((err) => {
        console.log("couldnt fetch posts", err);
      });
    setRefreshing(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, [navigation])
  );
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ backgroundColor: "#121517" }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={"#FFFC5C"} />}
    >
      {!refreshing ? (
        <>
          <View style={styles.logo}>
            <View style={{ width: 70, height: 70, backgroundColor: "#00BFFF", borderTopLeftRadius: 30 }}></View>
            <View style={{ width: 70, height: 70, backgroundColor: "#00FbFF", borderTopRightRadius: 30 }}></View>
            <View style={{ width: 70, height: 70, backgroundColor: "#00EFFF", borderBottomLeftRadius: 30 }}></View>
            <View style={{ width: 70, height: 70, backgroundColor: "#00E0FF", borderBottomRightRadius: 30 }}></View>
          </View>
          <Text style={styles.id}>#{user && user?.id?.substring(0, 6)}</Text>
          <View style={{ gap: 5 }}>
            <Text style={styles.stat}> Stories Posted: {user && user?.Story?.length}</Text>
            <Text style={styles.stat}> Stories Favorited: {user && user?.liked?.length}</Text>
          </View>
          <View style={{ width: "100%", marginTop: 40, borderBottomWidth: 1, borderColor: "#F7FFF7" }}>
            <TouchableOpacity
              style={styles.section}
              onPress={() => {
                navigation.navigate("ViewStories", {
                  filter: "authored",
                  screenname: "Stories I wrote",
                });
              }}
            >
              <Text style={styles.wide}>View my Stories: {user && user?.Story?.length}</Text>
            </TouchableOpacity>
            <TouchableOpacity
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
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <ActivityIndicator size="large" color="#FFFC5C" />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#121517",
    paddingTop: 30,
    gap: 10,
    // paddingHorizontal: 10,
    // justifyContent: "space-between",
    // backgroundColor: "red",
  },
  section: {
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#F7FFF7",
  },
  wide: {
    width: "100%",

    color: "#FFFC5C",
    fontSize: 26,
    fontWeight: "700",
    padding: 10,
    backgroundColor: "#2F373C",
  },
  stat: { color: "#F7FFF7", fontSize: 24, fontWeight: "700", textAlign: "center" },
  top: {
    width: "100%",
    gap: 10,
    paddingHorizontal: 15,
  },
  id: {
    color: "#FFFC5C",
    fontWeight: "800",
    fontSize: 24,
  },
  bottom: {
    width: "100%",
    marginBottom: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFC5C",
    width: "100%",
  },
  logo: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: 140,
    borderRadius: 50,
  },
});
