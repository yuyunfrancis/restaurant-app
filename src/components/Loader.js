import React from "react";
import { ActivityIndicator } from "react-native-paper";

export default function Loader({ size, ...props }) {
  return <ActivityIndicator size={size} {...props} animating={true} />;
}
