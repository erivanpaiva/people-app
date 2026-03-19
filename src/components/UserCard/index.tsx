import { View, Text, Image, TouchableOpacity } from "react-native";
import { RandomUser } from "../../types/randomUser";
import styles from "./styles";
import { useRef } from "react";
import { Animated } from "react-native";

interface UserCardProps {
  user: RandomUser;
  onPress?: () => void;
}

export default function UserCard({ user, onPress }: UserCardProps) {
  const fullName = `${user.name.first} ${user.name.last}`;
  const location = `${user.location.city}, ${user.location.country}`;
  const scale = useRef(new Animated.Value(1)).current;

  function handlePressIn() {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  }

  function handlePressOut() {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <Image source={{ uri: user.picture.medium }} style={styles.avatar} />

        <View style={styles.textContainer}>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.location}>{location}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
