import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import React, { useCallback, useState } from "react";
import { openURL } from "expo-linking";
import useAuth from "../misc/useAuth";
import useAxios from "../misc/useAxios";
export default function Filters() {
  const { user, showNotif } = useAuth();
  const axios = useAxios();
  const [filterPhrase, setFilterPhrase] = useState(user ? user.filters.join(";") : "");
  const saveFilters = useCallback(async () => {
    const resp = await axios.put("users/filter", { filter: filterPhrase }).catch((err) => {});
    showNotif("Failed to set filters");
    if (resp && resp.data) {
      showNotif("Filters saved");
    }
  }, [filterPhrase]);
  return (
    <View style={styles.container}>
      <Text style={styles.title} selectable={false}>
        Configure Filters
      </Text>
      <Text style={styles.description}>
        Content filters are powerful tools in apps, enabling users to selectively block or hide sensitive content, ensuring a safer and tailored
        experience.
      </Text>
      <Text style={{ ...styles.description, marginTop: 10, fontWeight: "800" }}>Separate filters with a semicolon (;)</Text>
      <Text style={{ ...styles.title, marginTop: 10, fontSize: 24 }}>Current Filters:</Text>
      <TextInput
        style={{ ...styles.filter, marginTop: 5 }}
        value={filterPhrase}
        autoCapitalize={"none"}
        autoCorrect={false}
        autoFocus
        onChangeText={setFilterPhrase}
      ></TextInput>

      <View style={{ width: "100%", marginTop: 40, borderBottomWidth: 1, borderColor: "#F7FFF7" }}>
        <TouchableOpacity
          style={styles.section}
          onPress={() => {
            setFilterPhrase("");
          }}
        >
          <Text style={styles.wide}>Clear Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.section} onPress={saveFilters}>
          <Text style={styles.wide}>Save Filters</Text>
        </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: "600",
    paddingHorizontal: 15,
    textAlign: "left",
  },
  title: {
    fontSize: 28,
    paddingHorizontal: 15,

    fontWeight: "700",
    color: "#FFFC5C",
    width: "100%",
  },
  filter: { color: "pink", fontWeight: "800", fontSize: 23, padding: 10, backgroundColor: "#2F373C", width: "100%" },
  section: {
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#F7FFF7",
  },
});
