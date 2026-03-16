import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { RandomUser } from "../types/randomUser";

export default function UserProfileScreen() {
  const route = useRoute();
  const navigation: any = useNavigation();

  const { user } = route.params as { user: RandomUser };

  const fullName = `${user.name.first} ${user.name.last}`;
  const location = `${user.location.city}, ${user.location.country}`;

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.picture.large }} style={styles.avatar} />

      <Text style={styles.name}>{fullName}</Text>
      <Text style={styles.location}>{location}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{user.phone}</Text>

        <Text style={styles.label}>Cell</Text>
        <Text style={styles.value}>{user.cell}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal</Text>
        <Text style={styles.label}>Age</Text>
        <Text style={styles.value}>{user.dob.age}</Text>

        <Text style={styles.label}>Birthday</Text>
        <Text style={styles.value}>
          {new Date(user.dob.date).toLocaleDateString()}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => navigation.navigate("Chat", { user })}
      >
        <Text style={styles.chatButtonText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 16,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
  },

  location: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },

  section: {
    width: "100%",
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },

  label: {
    fontSize: 14,
    color: "#888",
  },

  value: {
    fontSize: 16,
    marginBottom: 8,
  },

  chatButton: {
    marginTop: 12,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },

  chatButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
