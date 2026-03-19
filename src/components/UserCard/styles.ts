import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    height: 84,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    marginBottom: 12,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 26,
    marginRight: 14,
  },

  textContainer: {
    flex: 1,
    justifyContent: "center",
  },

  name: {
    fontSize: 16,
    fontFamily: "Nunito-Regular",
    color: "#1A1A1A",
    marginBottom: 2,
  },

  location: {
    fontSize: 13,
    fontFamily: "Nunito-Regular",
    color: "rgba(60, 60, 67, 0.6)",
  },
});
