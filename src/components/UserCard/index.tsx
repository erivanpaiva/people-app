import { View, Text, Image, TouchableOpacity } from "react-native";
import { RandomUser } from "../../types/randomUser";
import styles from "./styles";

interface UserCardProps {
  user: RandomUser;
  onPress?: () => void;
}

export default function UserCard({ user, onPress }: UserCardProps) {
  const fullName = `${user.name.first} ${user.name.last}`;
  const location = `${user.location.city}, ${user.location.country}`;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: user.picture.medium }} style={styles.avatar} />

      <View style={styles.textContainer}>
        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>
    </TouchableOpacity>
  );
}
