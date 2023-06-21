import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { PostI } from "../pages/Explore";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import useAxios from "../misc/useAxios";
import useAuth from "../misc/useAuth";

export default function StoryPreview({ content, authorId, id, likes, setPosts }: any) {
  const { user } = useAuth();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [likeC, setLikeC] = useState(likes.length);
  const [likeId, setLikeId] = useState(undefined);
  console.log("likeID", likeId);
  console.log("count", likeC);
  console.log("all", likes);

  const axios = useAxios();
  useEffect(() => {
    setLikeId(likes.find((like) => like.userId === user?.id) || undefined);
  }, [user]);

  const toggleLike = async () => {
    if (likeId) {
      let oldLikeid = likeId;
      console.log("unliking");
      setLikeId(undefined);
      setLikeC((prev) => prev - 1);
      const resp = await axios.delete("posts/like/" + likeId?.id).catch((err) => {
        console.log(err);
        setLikeId(oldLikeid);
        setLikeC((prev) => prev + 1);
      });
      likes = likes.filter((like) => like.id != likeId?.id);
      setPosts((prev: { authorId: string; content: string; id: string; likes: { likeId: string; id: string }[] }[]) => {
        let ind: number;
        let old = prev.find((post, index) => {
          if (post.id == id) {
            ind = index;
            return true;
          }
        });
        console.log(old, ind);

        old.likes = old.likes.filter((like) => like.id != likeId?.id);
        console.log(old);

        const filtered = prev.filter((post) => post.id != id);
        filtered.splice(ind, 0, old);

        return filtered;
      });
    } else if (!likeId) {
      setLikeId(true);
      console.log("liking");

      setLikeC((prev) => prev + 1);
      const resp = await axios.put("posts/like/" + id).catch((err) => {
        setLikeId(false);
        setLikeC((prev: number) => prev - 1);
      });

      if (resp && resp.data) {
        console.log(resp.data);
        setLikeId(resp.data.like);
        likes = likes.concat([resp.data.like]);
        setPosts((prev: { authorId: string; content: string; id: string; likes: { likeId: string; id: string }[] }[]) => {
          let ind: number;
          let old = prev.find((post, index) => {
            if (post.id == id) {
              ind = index;
              return true;
            }
          });
          console.log(old, ind);

          old.likes = old.likes.concat([resp.data.like]);
          console.log(old);

          let filtered = prev.filter((post) => post.id != id);
          filtered.splice(ind, 0, old);
          console.log(filtered);

          return filtered;
        });
      }
    }
  };

  return (
    <TouchableHighlight
      style={styles.card}
      onPress={() => {
        navigation.navigate("Story", {
          id,
          likes: likeC || 0,
          likeId: likeId?.id || undefined,
        });
      }}
      underlayColor={"#21262A"}
    >
      <>
        <Text style={styles.text} numberOfLines={3} ellipsizeMode="tail" lineBreakMode="clip">
          {content}
        </Text>
        <View style={styles.bottom}>
          <Text style={styles.time}>By #{authorId.substring(0, 6)}</Text>
          <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", gap: 5 }} onPress={toggleLike}>
            {likeId ? <AntDesign name="star" size={30} color="#fffc5c" /> : <AntDesign name="staro" size={30} color="#fffc5c" />}
            <Text style={styles.time}>{likeC}</Text>
          </TouchableOpacity>
        </View>
      </>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 23,
    fontWeight: "700",
    overflow: "hidden",
  },
  time: {
    color: "#FFFC5C",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "right",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#2F373C",
    width: "100%",
    height: 160,
    borderRadius: 4,
    overflow: "hidden",
    padding: 15,
    justifyContent: "space-between",
  },
  likes: {},
});
