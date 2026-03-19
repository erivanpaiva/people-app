import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  touchArea: {
    width: 44,
    height: 44,
  },

  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 40,
    elevation: 8,
  },

  title: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 17,
    fontFamily: "Nunito-Bold",
    color: "#1A1A1A",
  },

  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  searchShadow: {
    borderRadius: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 40,
    elevation: 8,
  },

  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingHorizontal: 12,
  },

  searchInput: {
    flex: 1,
    marginHorizontal: 8,
    fontFamily: "Nunito-Regular",
    fontSize: 17,
    color: "#000",
  },

  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },

  emptyTitle: {
    fontSize: 22,
    fontFamily: "Nunito-Bold",
    color: "#000",
    marginBottom: 8,
  },

  emptySubtitle: {
    fontSize: 16,
    fontFamily: "Nunito-Regular",
    color: "#8E8E93",
    textAlign: "center",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  overlayBackground: {
    ...StyleSheet.absoluteFillObject,
  },

  modalContainer: {
    width: "100%",
    maxWidth: 402,
    backgroundColor: "#F2F2F7",
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  modalClose: {
    position: "absolute",
    right: 16,
    top: 15,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 17,
    fontFamily: "Nunito-Bold",
    color: "#000",
    marginBottom: 8,
  },

  filtersContent: {
    width: "100%",
    marginTop: 24,
  },

  filterTitle: {
    fontSize: 13,
    fontFamily: "Nunito-Bold",
    color: "rgba(60,60,67,0.6)",
    marginBottom: 10,
  },

  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#E5E5EA",
  },

  chipActive: {
    backgroundColor: "#1A1A1A",
  },

  chipText: {
    fontSize: 13,
    fontFamily: "Nunito-Regular",
    color: "#6B6B6B",
  },

  chipTextActive: {
    color: "#FFFFFF",
  },
});
