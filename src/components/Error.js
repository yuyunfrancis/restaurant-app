import React from "react";
import { Text, StyleSheet, View } from "react-native";

const Error = ({ error }) => {
  return (
    <View style={styles.errorBox}>
      <View
        style={{
          backgroundColor: "red",
          borderRadius: "15%",
          width: 20,
          height: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "yellow", fontSize: 18, fontWeight: "bold" }}>
          !
        </Text>
      </View>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  errorBox: {
    backgroundColor: "transparent",
    paddingHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  error: {
    color: "#fff",
    marginHorizontal: 10,
    textAlign: "center",
    fontSize: 18,
  },
});
