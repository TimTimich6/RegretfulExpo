import { View, Text, ScrollView, RefreshControl, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import useAxios from "../misc/useAxios";
import StoryPreview from "../components/StoryPreview";
import useAuth from "../misc/useAuth";

export default function ViewStories({ navigation, route }) {
  const axios = useAxios();
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const { showNotif } = useAuth();
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPosts([]);
    axios
      .get(`posts/filtered?filter=${route.params.filter}`)
      .then((resp) => {
        console.log(resp.data);

        if (resp.data) {
          if (resp.data.length == 0) showNotif("No stories to show!");
          else setPosts(resp.data);
        }
      })
      .catch((err) => {
        console.log("couldnt fetch posts", err);
      });
    setRefreshing(false);
    return () => {
      setPosts([]);
    };
  }, []);

  useEffect(() => {
    onRefresh(); // replace with your function
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text style={styles.title} selectable={false}>
        {route.params.screenname}
      </Text>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.inside}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={"#FFFC5C"} />}
      >
        {!refreshing ? (
          posts.map((post) => (
            <StoryPreview
              authorId={post.authorId}
              content={post.content}
              likes={post.likes}
              createdAt={post.createdAt}
              key={post.id}
              id={post.id}
              setPosts={setPosts}
            />
          ))
        ) : (
          <ActivityIndicator size="large" color="#FFFC5C" />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#121517",
    paddingTop: 15,
    paddingHorizontal: 5,
    justifyContent: "space-between",
    // backgroundColor: "red",
    gap: 10,
  },
  inside: {
    gap: 7,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFC5C",
    width: "100%",
    marginLeft: 20,
  },
  scroll: {
    flex: 1,
    width: "100%",
    gap: 10,
    paddingHorizontal: 5,
  },
});
