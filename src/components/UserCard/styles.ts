import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },

  location: {
    fontSize: 14,
    color: "#A1A1A1",
  },
});
