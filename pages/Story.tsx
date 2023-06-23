import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import RoundButton from "../components/RoundButton";
import useAxios from "../misc/useAxios";
import { PostI } from "./Explore";
import { ActivityIndicator } from "react-native";
import useAuth from "../misc/useAuth";
import useStorage from "../misc/useStorage";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";

export default function Story({ navigation, route }) {
  const axios = useAxios();
  const [post, setPost] = useState<PostI | null>(null);
  const [likeC, setLikeC] = useState<number>(route.params.likes);
  const [likeId, setLikeId] = useState<any | boolean>(route.params.likeId);
  const { user } = useAuth();
  console.log("params", route.params);
  const confirmFlag = () =>
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
          setPost((prev) => {
            return { ...prev, flagged: true };
          });
          const resp = await axios.put("posts/flag/" + post?.id).catch((err) => {
            console.log(err);
          });
        },
      },
    ]);
  navigation.setOptions({
    header: () => (
      <View style={{ justifyContent: "space-between", flexDirection: "row", backgroundColor: "#121517", paddingHorizontal: 10 }}>
        <TouchableHighlight onPress={() => navigation.goBack()} style={styles.header} underlayColor={"#121517"}>
          <Ionicons name="arrow-back-outline" size={40} color="#F7FFF7" />
        </TouchableHighlight>

        <TouchableHighlight onPress={confirmFlag} style={styles.header} underlayColor={"#121517"}>
          <Ionicons name="flag" size={30} color={!route.params.flagged ? "#F7FFF7" : "crimson"} />
        </TouchableHighlight>
      </View>
    ),
  });

  const toggleLike = async () => {
    if (likeId) {
      let oldLikeid = likeId;
      console.log("unliking");
      setLikeId(undefined);
      setLikeC((prev) => prev - 1);
      const resp = await axios.delete("posts/like/" + likeId).catch((err) => {
        console.log(err);
        setLikeId(oldLikeid);
        setLikeC((prev) => prev + 1);
      });
    } else if (!likeId) {
      setLikeId(true);
      console.log("liking");

      setLikeC((prev) => prev + 1);
      const resp = await axios.put("posts/like/" + route.params.id).catch((err) => {
        setLikeId(false);
        setLikeC((prev: number) => prev - 1);
      });

      if (resp && resp.data) {
        console.log(resp.data);
        setLikeId(resp.data.like.id);
      }
    }
  };
  useEffect(() => {
    async function getPost() {
      try {
        const resp = await axios.get("posts/" + route.params.id);
        if (resp.data) {
          setPost(resp.data.story);
        }
      } catch (error) {
        console.log("couldn't get post");
      }
    }
    getPost();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {post ? (
        <>
          <View style={{ width: "100%", paddingHorizontal: 15, paddingTop: 15 }}>
            <Text style={styles.title} selectable={false}>
              View Story
            </Text>
            <View style={styles.section}>
              <Text style={styles.small}>By #{post.authorId}</Text>
              <Text style={styles.small}>{new Date(Date.now() - Date.parse(post.createdAt) + 43200000).toLocaleTimeString()}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5, justifyContent: "flex-end", marginTop: 10 }}>
              {likeId ? <AntDesign name="star" size={30} color="#fffc5c" /> : <AntDesign name="staro" size={30} color="#fffc5c" />}
              <Text style={{ fontSize: 22, color: "#FFFC5C", fontWeight: "700", textAlign: "right" }}>{likeC}</Text>
            </View>
            <Text style={styles.content} selectable={true}>
              {post.content}
            </Text>
          </View>
          <View style={styles.bottom}>
            <RoundButton
              text={!likeId ? "Add To Favorites" : "Remove from favorites"}
              bg="#24292D"
              color="#FFFC5C"
              fz={25}
              onPress={toggleLike}
            ></RoundButton>
            {/* <RoundButton text="Go Back" onPress={() => navigation.goBack()}></RoundButton> */}
          </View>
        </>
      ) : (
        <ActivityIndicator size="large" color="#FFFC5C" />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#121517",

    justifyContent: "space-between",
  },

  inside: {
    gap: 7,
  },
  bottom: { marginBottom: 5, width: "100%", gap: 5 },
  section: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  small: { color: "#FFFC5C" },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFC5C",
    width: "100%",
  },
  scroll: {
    flex: 1,
    width: "100%",
    gap: 10,
  },
  content: {
    fontSize: 20,
    color: "#F7FFF7",
    marginVertical: 10,
  },
  header: {
    backgroundColor: "#121517",
    // paddingHorizontal: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
