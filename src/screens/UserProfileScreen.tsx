import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function UserProfileScreen() {
  const route = useRoute();
  const { user } = route.params as any;

  return (
    <View>
      <Text>
        {user.name.first} {user.name.last}
      </Text>
      <Text>{user.email}</Text>
    </View>
  );
}
