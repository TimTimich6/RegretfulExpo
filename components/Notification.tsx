import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import useAuth from "../misc/useAuth";
export default function Notification({ color }: { content: string; color: string }) {
  const { notifContent, setNotifContent } = useAuth();
  if (notifContent)
    return (
      <TouchableOpacity
        onPress={() => setNotifContent("")}
        style={{
          display: notifContent === "" ? "none" : "flex",
          position: "absolute",
          top: 40,
          minHeight: 60,
          width: "95%",
          alignSelf: "center",
          zIndex: 10,
          borderWidth: 1,
          borderColor: "#FFFC5C",
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2F373C",
        }}
      >
        <Text style={{ color, fontSize: 25, textAlign: "center", fontWeight: "700" }}>{notifContent}</Text>
      </TouchableOpacity>
    );
}
