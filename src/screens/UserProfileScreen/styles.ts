import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },

  scrollContent: {
    paddingBottom: 32,
  },

  headerImageContainer: {
    width: "100%",
    height: 500,
  },

  headerImage: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 230,
    overflow: "hidden",
  },

  mask: {
    ...StyleSheet.absoluteFillObject,
  },

  blur: {
    ...StyleSheet.absoluteFillObject,
  },

  gradient: {
    ...StyleSheet.absoluteFillObject,
  },

  content: {
    position: "absolute",
    bottom: 12,
    width: "100%",
    alignItems: "center",
    zIndex: 2,
  },

  name: {
    fontSize: 26,
    fontFamily: "Nunito-Bold",
    color: "#fff",
  },

  location: {
    fontSize: 15,
    fontFamily: "Nunito-Regular",
    color: "#fff",
    marginBottom: 12,
  },

  actions: {
    flexDirection: "row",
    gap: 12,
  },

  glassButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  backButtonWrapper: {
    position: "absolute",
    top: 62,
    left: 16,
    zIndex: 10,
  },

  glassBackButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  backButtonInner: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  sections: {
    paddingHorizontal: 16,
  },

  sectionTitle: {
    fontSize: 15,
    fontFamily: "Nunito-Bold",
    color: "rgba(60,60,67,0.6)",
    marginTop: 19,
    marginBottom: 6,
    marginLeft: 4,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 26,
    overflow: "hidden",
  },

  row: {
    height: 68,
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  label: {
    fontSize: 13,
    fontFamily: "Nunito-Regular",
    color: "#1A1A1A",
    marginBottom: 4,
  },

  value: {
    fontSize: 15,
    fontFamily: "Nunito-Regular",
    color: "rgba(60, 60, 67, 0.6)",
  },

  separator: {
    height: 1,
    backgroundColor: "rgba(60, 60, 67, 0.15)",
    marginLeft: 16,
  },
});
