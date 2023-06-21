import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import RoundButton from "../components/RoundButton";
import useAuth from "../misc/useAuth";
import useAxios from "../misc/useAxios";
export default function Post({ navigation, route }) {
  const [text, setText] = useState("");
  const { user, setUser, showNotif } = useAuth();
  const axios = useAxios();
  async function handleUpload() {
    if (text.length < 5) {
      return showNotif("Text too short!");
    }
    const resp = await axios
      .post("posts", {
        content: text,
      })
      .catch((err) => console.log(err));
    if (resp) {
      console.log(resp.data);
      setUser({ ...user, Story: [...user.Story, resp.data.story] });
      showNotif("Story Posted");
      setText("");
      navigation.navigate("StoryStack", { screen: "Explore", refresh: true });
    }
  }
  useEffect(() => {
    return () => {
      setText("");
    };
  }, [navigation, route]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title} selectable={false}>
          Create a story
        </Text>
        <TextInput
          placeholder="Write your story here"
          style={styles.inp}
          autoCorrect={false}
          multiline={true}
          autoFocus={true}
          maxLength={1000}
          placeholderTextColor={"lightgray"}
          value={text}
          onChangeText={(t) => setText(t)}
        ></TextInput>
        <Text style={{ color: "gray", fontSize: 17, fontWeight: "600", textAlign: "right", marginTop: 5 }}>Characters used: {text.length}/1000</Text>
      </View>
      <View style={styles.bottom}>
        <RoundButton text="Share" bg="#24292D" color="#FFFC5C" fz={32} onPress={handleUpload}></RoundButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#121517",
    paddingTop: 15,
    // paddingHorizontal: 10,
    justifyContent: "space-between",
    // backgroundColor: "red",
  },
  top: {
    width: "100%",
    gap: 10,
    paddingHorizontal: 15,
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
  inp: {
    color: "#F7FFF7",
    fontSize: 20,
    backgroundColor: "#2F373C",
    width: "100%",
    minHeight: 250,
    borderRadius: 10,
    // borderWidth: 2.5,
    borderColor: "#F7FFF7",
    padding: 15,
    maxHeight: "80%",
    fontWeight: "700",
  },
});
