import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 62,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    zIndex: 10,
    elevation: 10,
  },

  headerTitle: {
    fontSize: 17,
    fontFamily: "Nunito-Bold",
    color: "#1A1A1A",
  },

  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.6)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 6,
  },

  avatarWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 6,
  },

  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 22,
  },

  messageRow: {
    flexDirection: "row",
    marginBottom: 6,
  },

  rowRight: {
    justifyContent: "flex-end",
  },

  rowLeft: {
    justifyContent: "flex-start",
  },

  bubble: {
    maxWidth: "75%",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 26,
    minHeight: 40,
    justifyContent: "center",
  },

  myBubble: {
    backgroundColor: "#E5E5EA",
  },

  otherBubble: {
    backgroundColor: "#1A1A1A",
  },

  myText: {
    color: "#1A1A1A",
    fontSize: 15,
    fontFamily: "Nunito-Regular",
  },

  otherText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "Nunito-Regular",
  },

  myTime: {
    fontSize: 11,
    color: "#727272",
    fontFamily: "Nunito-Regular",
  },

  otherTime: {
    fontSize: 11,
    color: "#D9D9D9",
    fontFamily: "Nunito-Regular",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "transparent",
    zIndex: 10,
  },

  input: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    fontSize: 15,
    fontFamily: "Nunito-Light",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },

  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginLeft: 6,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 6,
  },

  fadeOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    zIndex: 5,
  },

  bottomFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 0,
  },
});
