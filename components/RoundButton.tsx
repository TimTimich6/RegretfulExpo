import { GestureResponderEvent, Text, TouchableHighlight } from "react-native";
import React from "react";

interface ButtonI {
  bg?: string;
  px?: number;
  py?: number;
  text: string;
  color?: string;
  fz?: number;
  onPress?(e?: GestureResponderEvent): void;
}
export default function RoundButton(props: ButtonI) {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={{
        minHeight: 60,
        paddingVertical: props.py || 10,
        paddingHorizontal: props.px || 20,
        minWidth: 220,

        alignItems: "center",
        justifyContent: "center",
        backgroundColor: props.bg || "dodgerblue",
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          fontSize: props.fz || 30,
          fontWeight: "800",
          color: props.color || "#F7FFF7",
        }}
      >
        {props.text}
      </Text>
    </TouchableHighlight>
  );
}
